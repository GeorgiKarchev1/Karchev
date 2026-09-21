from pathlib import Path
import subprocess, tempfile, shutil, json, os
root=Path.cwd()
stage=Path(tempfile.mkdtemp(prefix='karchx-lead-ready-'))
archive=subprocess.Popen(['git','archive','HEAD'],stdout=subprocess.PIPE)
subprocess.run(['tar','-x','-C',str(stage)],stdin=archive.stdout,check=True);archive.wait()
files=['app/api/contact/route.ts','app/bg/page.tsx','app/en/page.tsx','app/layout.tsx','app/studio.css','app/sitemap.ts','middleware.ts','next.config.js','app/policies/privacy-policy/page.tsx','app/politiki/poveritelnost/page.tsx','app/policies/cookies/page.tsx','app/politiki/biskvitki/page.tsx','app/bg/kak-da-polzvam-ai-ako-nishto-ne-razbiram/page.tsx','components/Contact.tsx','components/Footer.tsx','components/Navbar.tsx','components/Hero.tsx','components/Header.tsx','components/FinalCTA.tsx','components/CookieBanner.tsx','components/funnel/BgFunnelWizard.tsx','components/funnel/EnFunnelWizard.tsx','components/site/MarketingHome.tsx','components/site/ConsentAnalytics.tsx','lib/contact-info.ts','lib/growth-content.ts','lib/checklist.ts','lib/editorial-content.ts','lib/seo-content.ts','lib/translations.ts','app/bg/checklist/page.tsx']
for f in files:
 (stage/f).parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/f,stage/f)
(stage/'node_modules').symlink_to(root/'node_modules',target_is_directory=True)
if (root/'.env.local').exists():
 shutil.copy2(root/'.env.local',stage/'.env.local');os.chmod(stage/'.env.local',0o600)
(stage/'.vercel').mkdir(exist_ok=True);shutil.copy2(root/'.vercel/project.json',stage/'.vercel/project.json')
(stage/'.vercelignore').write_text('.env*\nnode_modules\n.next\n.impeccable\n.agents\noutput\n')
(root/'.impeccable/review/lead-ready/stage.json').write_text(json.dumps({'stage':str(stage),'files':files,'base':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()},indent=2))
print(stage)
