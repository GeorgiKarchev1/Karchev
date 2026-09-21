const { chromium } = require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs = require('fs');
const assert = require('node:assert/strict');
const root = '.impeccable/review/growth-systems';
(async () => {
 const browser = await chromium.launch({channel:'chrome'});
 const context = await browser.newContext({reducedMotion:'reduce'});
 await context.addInitScript(() => localStorage.setItem('karchev_cookie_consent','declined'));
 await context.route('**/*', route => {
  const host = new URL(route.request().url()).hostname;
  return host === '127.0.0.1' || host === 'localhost' ? route.continue() : route.abort();
 });
 const results=[]; const errors=[];
 for (const lang of ['bg','en']) {
  const page = await context.newPage();
  page.on('pageerror', e=>errors.push(e.message));
  for (const width of [1440,768,390,320]) {
   await page.setViewportSize({width,height:1000});
   await page.goto(`http://127.0.0.1:3101/${lang}`,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>({
    title:document.title,lang:document.documentElement.lang,
    h1:document.querySelector('h1').getAttribute('aria-label'),
    description:document.querySelector('meta[name="description"]').content,
    twitter:document.querySelector('meta[name="twitter:title"]').content,
    og:document.querySelector('meta[property="og:title"]').content,
    canonical:document.querySelector('link[rel="canonical"]').href,
    overflow:document.documentElement.scrollWidth>innerWidth,
    outside:[...document.querySelectorAll('main h1,main h2,main h3,main p,main input,main textarea,main button')].filter(e=>{const r=e.getBoundingClientRect();return !e.closest('[aria-hidden="true"]')&&r.width&&r.height&&(r.right>innerWidth+2||r.left< -2)}).map(e=>e.tagName+': '+e.textContent.slice(0,60)),
    brokenAnchors:[...document.querySelectorAll('a[href*="#"]')].map(a=>new URL(a.href)).filter(u=>u.pathname===location.pathname&&u.hash&&u.hash!=='#'&&!document.getElementById(u.hash.slice(1))).map(u=>u.href),
   }));
   assert.equal(result.overflow,false);assert.deepEqual(result.outside,[]);assert.deepEqual(result.brokenAnchors,[]);
   assert.equal(result.lang,lang);assert.match(result.title,/Growth Systems/);assert.match(result.twitter,/Growth Systems/);assert.match(result.og,/Growth Systems/);
   assert(!/AI агент|AI agent|Free AI Audit|безплатен AI одит/i.test(await page.locator('body').innerText()));
   if(width===1440||width===390){await page.screenshot({path:`${root}/${lang}-${width}-hero.png`});await page.locator('.agent-about-photo').scrollIntoViewIfNeeded();await page.locator('.agent-about-photo img').evaluate(e=>e.decode());await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${root}/${lang}-${width}.png`,fullPage:true});}
   results.push({lang,width,...result});
   if(width===390){
    const toggle=page.locator('.studio-menu-toggle');await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    await toggle.click();await page.locator('#studio-mobile-menu a').nth(1).click();assert.equal(await toggle.getAttribute('aria-expanded'),'false');
   }
  }
  await page.setViewportSize({width:1440,height:1000});
  const faq=page.locator('details').first();await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),'');
  await faq.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await faq.getAttribute('open'),null);
  const form=page.locator('#contact form');await form.locator('button[type="submit"]').click();assert.equal(await page.locator('#contact-name').getAttribute('aria-invalid'),'true');
  await page.locator('#contact-name').fill('Тест / demo');await page.locator('#contact-email').fill('bad-email');await page.locator('#contact-email').blur();assert.equal(await page.locator('#contact-email').getAttribute('aria-invalid'),'true');
  await page.locator('#contact-email').fill('demo@example.com');await page.locator('#contact-service').fill('Demo workflow');
  let submitted=0;
  await page.route('**/api/contact', async route=>{submitted++;const payload=route.request().postDataJSON();assert.equal(payload.lang,lang.toUpperCase());assert.equal(payload.service,'Demo workflow');await route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({ok:false})});});
  await form.locator('button[type="submit"]').click();await page.locator('[role="alert"]').waitFor();assert.equal(await page.locator('#contact-name').inputValue(),'Тест / demo');
  await page.unroute('**/api/contact');
  await page.route('**/api/contact',async route=>{submitted++;await new Promise(r=>setTimeout(r,500));await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true})});});
  await form.locator('button[type="submit"]').click();assert.equal(await form.getAttribute('aria-busy'),'true');await page.locator('.studio-success').waitFor();assert.equal(submitted,2);
  await page.locator('.studio-success button').click();assert.equal(await page.locator('#contact-name').inputValue(),'');
  await page.locator('.studio-language').click();await page.waitForURL(`**/${lang==='bg'?'en':'bg'}`);assert.equal(await page.locator('html').getAttribute('lang'),lang==='bg'?'en':'bg');
  results.push({lang,interactions:'mobile menu, Escape, anchor, keyboard FAQ, validation, mock error/loading/success/reset, language switch passed',mockContactRequests:submitted});
  await page.close();
 }
 const zoom=await context.newPage({viewport:{width:1440,height:1000}});await zoom.goto('http://127.0.0.1:3101/bg',{waitUntil:'networkidle'});await zoom.evaluate(()=>{document.body.style.zoom='2'});assert.equal(await zoom.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);results.push({zoom:'CSS 200% reflow simulation passed'});
 assert.deepEqual(errors,[]);fs.writeFileSync(`${root}/checks.json`,JSON.stringify({results,errors,externalRequests:'blocked; contact API fully mocked'},null,2));
 await browser.close();console.log(JSON.stringify({passed:true,viewports:8,languages:2,errors,contact:'mocked only'}));
})().catch(e=>{console.error(e);process.exit(1)});
