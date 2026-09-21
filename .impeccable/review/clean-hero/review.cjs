const {chromium}=require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs=require('fs'); const assert=require('node:assert/strict');
(async()=>{
 const origin=process.env.HERO_TEST_ORIGIN||'http://127.0.0.1:3103';
 const b=await chromium.launch({executablePath:'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',headless:true});
 const results=[];
 for(const [lang,width] of [['bg',1440],['bg',390],['bg',768],['bg',883],['bg',320],['en',1440],['en',390]]){
  const p=await b.newPage({viewport:{width,height:960},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(()=>localStorage.setItem('karchev_cookie_consent','declined'));
  const r=await p.goto(origin+'/'+lang,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  assert.equal(r.status(),200);assert.equal(await p.locator('h1').count(),1);
  const layout=await p.evaluate(()=>{
    const hero=document.querySelector('.kx-hero');const title=hero.querySelector('h1');
    const off=[...hero.querySelectorAll('*')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>innerWidth+.5)}).map(el=>el.className);
    return {overflow:off,title:getComputedStyle(title).fontSize,heroHeight:hero.offsetHeight,cta:hero.querySelector('.kx-hero-action').getBoundingClientRect().toJSON()};
  });
  assert.equal(layout.overflow.length,0,lang+width+JSON.stringify(layout.overflow));assert.equal(errors.length,0,errors.join());
  assert.equal(await p.locator('.kx-hero-phone').getAttribute('href'),'tel:+359895739335');
  assert((await p.locator('.kx-hero-offer').innerText()).includes('250'));
  await p.screenshot({path:'.impeccable/review/clean-hero/'+lang+'-'+width+'.png'});
  if(lang==='bg'&&width===1440)await p.screenshot({path:'.impeccable/review/clean-hero/bg-desktop-full.png',fullPage:true});
  await p.locator('.kx-hero-details').click();assert(p.url().endsWith('#pricing'));assert(await p.locator('#pricing').isVisible());
  await p.locator('.kx-hero-action').click();assert(p.url().endsWith('#contact'));assert(await p.locator('#contact-name').isVisible());
  results.push({lang,width,layout,errors});await p.close();
 }
 const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(origin+'/bg');await p.getByRole('button',{name:'Отказвам',exact:true}).click();await p.getByRole('button',{name:'Отвори менюто'}).click();assert(await p.locator('#studio-mobile-menu').isVisible());await p.keyboard.press('Escape');assert.equal(await p.locator('#studio-mobile-menu').count(),0);
 await p.route('**/api/contact',r=>r.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'}));await p.locator('#contact-name').fill('UI проверка');await p.locator('#contact-email').fill('qa@example.com');await p.locator('.studio-submit').click();await p.getByText('Благодаря за запитването!',{exact:true}).waitFor();results.push({contact:'mocked pass',emailSent:false,mobileMenu:'pass'});
 await p.close();
 for(let i=1;i<=5;i++){const p=await b.newPage();await p.goto(origin+'/bg/hero-varianti/'+i);await p.waitForURL(origin+'/bg');await p.close();}results.push({oldVariantRedirects:5});
 const n=await b.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await n.goto(origin+'/bg');assert(await n.locator('.kx-hero h1').isVisible());assert(await n.locator('.kx-hero-action').isVisible());results.push({noJs:'visible'});await n.close();
 await b.close();fs.writeFileSync('.impeccable/review/clean-hero/checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
