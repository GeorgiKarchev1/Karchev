"""Explicit HighLevel setup calls; credentials never printed or committed."""
import json
import pathlib
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parent
LOCATION = 'G8wr8Jn0FQYxkEmPMle4'

def api(method, path, body=None, token_file='private-setup-token'):
    assert path.startswith('/') and '://' not in path
    token = (ROOT / token_file).read_text().strip()
    request = urllib.request.Request(
        'https://services.leadconnectorhq.com' + path,
        data=None if body is None else json.dumps(body).encode(),
        method=method,
        headers={'Authorization': 'Bearer ' + token, 'Version': '2021-07-28',
                 'Content-Type': 'application/json', 'Accept': 'application/json'},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        # API bodies may contain customer data, so save details privately.
        (ROOT / 'private-api-error.json').write_bytes(error.read())
        (ROOT / 'private-api-error.json').chmod(0o600)
        raise RuntimeError(f'HighLevel {method} {path}: HTTP {error.code}; private error saved') from None

def save(name, value):
    (ROOT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
