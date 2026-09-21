const {chromium}=require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',headless:true});const out='.impeccable/review/hero-options';const reports=[];
for(const variant of [1,2,3,4,5]) for(const width of [390,768,1440]) {
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>localStorage.setItem('karchev_cookie_consent','declined'));
 const response=await page.goto(`http://127.0.0.1:3103/bg/hero-varianti/${variant}`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);if(variant===5)await page.locator('.kx-hero-person img').evaluate(img=>img.decode());
 const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector('h1').textContent,h1Count:document.querySelectorAll('h1').length,masks:document.querySelectorAll('.agent-title-mask').length,titleOverflow:getComputedStyle(document.querySelector('h1')).overflow,priceSize:getComputedStyle(document.querySelector('.kx-hero-amount')).fontSize,noindex:document.querySelector('meta[name="robots"]')?.content}));
 await page.screenshot({path:`${out}/variant-${variant}-${width}.png`,fullPage:true});reports.push({variant,width,status:response.status(),...metrics,errors});assert.equal(metrics.overflow,false);assert.equal(metrics.h1Count,1);assert.equal(errors.length,0);assert(metrics.noindex.includes('noindex'));await page.close();
}
for(const [path,width] of [['/bg',320],['/bg',390],['/bg',1440],['/en',390],['/en',1440]]) {
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});await page.addInitScript(()=>localStorage.setItem('karchev_cookie_consent','declined'));await page.goto('http://127.0.0.1:3103'+path,{waitUntil:'networkidle'});
 const body=await page.locator('body').innerText();assert(!body.includes('390 €'));assert(!body.includes('195 €'));assert(!body.includes('Стартов проект за първите 3 бизнеса'));assert(body.includes('250'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:`${out}/home-${path.slice(1)}-${width}.png`});await page.locator('.kx-hero-action').click();assert(page.url().endsWith('#contact'));assert(await page.locator('#contact-name').count());reports.push({path,width,price250:true,oldOfferRemoved:true,ctaWorks:true});await page.close();
}
fs.writeFileSync(`${out}/checks.json`,JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
