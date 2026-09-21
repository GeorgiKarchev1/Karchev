"""Operate only the user's already-open HighLevel tab in Brave via its DOM."""
import json, subprocess, sys
WINDOW = 7980810
TAB = 7980800
LOCATION = 'G8wr8Jn0FQYxkEmPMle4'
script = sys.stdin.read() if len(sys.argv) < 2 else sys.argv[1]
js = "(()=>{if(location.hostname!=='app.gohighlevel.com'||!location.pathname.includes('/location/"+LOCATION+"/'))throw new Error('Unexpected page; stopped');try{return (()=>{"+script+"})()}catch(e){return JSON.stringify({error:String(e)})}})()"
apple = f'tell application "Brave Browser" to execute tab id {TAB} of window id {WINDOW} javascript '+json.dumps(js,ensure_ascii=False)
r=subprocess.run(['osascript','-e',apple],capture_output=True,text=True,timeout=25)
print(r.stdout if r.returncode==0 else r.stderr)
sys.exit(r.returncode)
