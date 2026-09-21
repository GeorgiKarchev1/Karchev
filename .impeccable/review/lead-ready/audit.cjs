const { chromium } = require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs = require('fs');
(async () => {
 const browser = await chromium.launch({executablePath:'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',headless:true});
 const out = '.impeccable/review/lead-ready';
 const report=[];
 for (const [name,width,path] of [['desktop',1440,'/bg'],['mobile',390,'/bg'],['small',320,'/bg'],['tablet',768,'/bg'],['english',1440,'/en'],['guide-mobile',390,'/bg/checklist']]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('karchev_cookie_consent','declined'));
  await page.goto('http://127.0.0.1:3102'+path,{waitUntil:'networkidle'}); await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
  const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelector('h1')?.textContent,phoneLinks:document.querySelectorAll('a[href="tel:+359895739335"]').length,iframes:document.querySelectorAll('iframe').length,badHashes:[...document.querySelectorAll('a[href*="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.startsWith('#')&&h.length>1&&!document.getElementById(h.slice(1)))}));
  report.push({name,...state,errors});
  if (name==='mobile') {
   await page.getByRole('button',{name:'Отвори менюто'}).click();
   await page.keyboard.press('Escape');
   report.push({menuCloses:await page.getByRole('button',{name:'Отвори менюто'}).getAttribute('aria-expanded')==='false'});
  }
  await page.close();
 }
 const guide=await browser.newPage(); await guide.goto('http://127.0.0.1:3102/bg/checklist',{waitUntil:'networkidle'});await guide.evaluate(()=>document.fonts.ready);
 await guide.pdf({path:'public/resources/karchx-12-proverki.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
 await guide.close(); await browser.close();fs.writeFileSync(`${out}/audit.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
