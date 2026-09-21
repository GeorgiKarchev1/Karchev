const {chromium}=require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');const assert=require('node:assert/strict');const fs=require('fs');
(async()=>{
 const origin='https://www.karchx.com';const b=await chromium.launch({executablePath:'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',headless:true});const report=[];
 for(const [path,width] of [['/bg',1440],['/en',390],['/bg/checklist',390]]){
  const p=await b.newPage({viewport:{width,height:900},reducedMotion:'reduce'});const errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));await p.addInitScript(()=>localStorage.setItem('karchev_cookie_consent','declined'));
  const r=await p.goto(origin+path,{waitUntil:'networkidle'});assert.equal(r.status(),200);assert.equal(await p.locator('iframe').count(),0);assert.equal(requests.some(u=>/leadconnector|msgsndr|cal\.com/.test(u)),false);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.equal(errors.length,0);
  if(path==='/bg'){
   assert(await p.getByText('390',{exact:false}).count()>0);assert.equal(await p.locator('#work').count(),0);await p.locator('.agent-hero-button').first().click();await p.locator('#contact-name').fill('KARCHX LIVE технически тест — не е клиент');await p.locator('#contact-email').fill('qa@example.com');await p.locator('#contact-phone').fill('0895739335');await p.locator('#contact-message').fill('Проверка от публикувания karchx.com. Не е нужна среща или отговор. Това е тест на обновената форма, независима от GHL.');await p.locator('#contact-preferredTime').fill('Само технически тест — без час');
   const response=p.waitForResponse(r=>r.url().endsWith('/api/contact')&&r.request().method()==='POST');await p.locator('.studio-submit').click();const sent=await response;const data=await sent.json();assert.equal(sent.status(),200);assert.equal(data.ok,true);await p.getByText('Благодаря за запитването!',{exact:true}).waitFor();await p.screenshot({path:'.impeccable/review/lead-ready/live-success.png'});report.push({liveForm:{status:sent.status(),ok:data.ok,personalConfirmationCopy:await p.getByText(/часът още не е потвърден/).isVisible()}});
  }
  report.push({path,status:r.status(),width,errors,ghlRequests:0});await p.close();
 }
 const pdf=await fetch(origin+'/resources/karchx-12-proverki.pdf');const bytes=Buffer.from(await pdf.arrayBuffer());assert.equal(pdf.status,200);assert.equal(bytes.subarray(0,4).toString(),'%PDF');assert.equal(bytes.length,fs.statSync('public/resources/karchx-12-proverki.pdf').size);report.push({pdf:{status:pdf.status,bytes:bytes.length,contentType:pdf.headers.get('content-type')}});
 await b.close();fs.writeFileSync('.impeccable/review/lead-ready/production.json',JSON.stringify(report,null,2));console.log(report);
})().catch(e=>{console.error(e);process.exit(1)});
