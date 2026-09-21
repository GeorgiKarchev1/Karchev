const {chromium}=require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('fs');
(async()=>{
 const b=await chromium.launch({channel:'chrome'});const checks=[];
 for(const [lang,width] of [['bg',1440],['en',390]]){
  const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'no-preference'});const errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const response=await p.goto(`http://127.0.0.1:3101/${lang}`,{waitUntil:'networkidle'});
  assert.equal(response.status(),200);assert.match(await p.title(),/Growth Systems/);
  assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('details').count(),7);
  await p.waitForFunction(()=>getComputedStyle(document.querySelector('.agent-hero-copy > p')).opacity==='1',{},{timeout:5000});
  await p.locator('.agent-hero-button').focus();assert(await p.locator('.agent-hero-button').evaluate(e=>e===document.activeElement));
  assert.equal(await p.locator('.agent-hero-button').getAttribute('href'),'https://cal.com/georgi-karchev-3r9puz/30min');
  assert.deepEqual(errors,[]);
  const schema=await p.locator('script[type="application/ld+json"]').first().textContent();
  assert(schema.includes('Growth sprint implementation'));assert(!schema.includes('Custom AI agents'));
  checks.push({lang,width,status:200,normalMotion:true,consoleErrors:errors,metadata:true,schema:true,booking:true});await p.close();
 }
 await b.close();fs.writeFileSync('.impeccable/review/growth-systems/production-smoke.json',JSON.stringify(checks,null,2));
 console.log('Production BG/EN smoke checks passed. No contact submission.');
})().catch(e=>{console.error(e);process.exit(1)});
