"""Compact visible HighLevel accessibility tree (no private browser state)."""
import json, subprocess, pathlib
p=pathlib.Path(__file__).resolve().parent
r=subprocess.run([str(p/'ax'),'dump'],capture_output=True,text=True,check=True)
rows=json.loads(r.stdout)
(p/'current-ui.json').write_text(r.stdout)
for row in rows:
    if '.2.0.1.' in row['path'] and row['role'] != 'AXImage':
        label=row['title'] or row['value'] or row['description']
        if label or row['role'] in ['AXTextField','AXTextArea','AXButton']:print(row['path'],row['role'],label[:900])
