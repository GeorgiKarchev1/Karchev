const assert=require('node:assert/strict');
(async()=>{
 const url='http://127.0.0.1:3102/api/contact';
 const post=body=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-real-ip':'127.0.0.27'},body:JSON.stringify(body)});
 let r=await post({name:'',email:'not-an-email'});assert.equal(r.status,400);
 r=await post({name:'Validation only',email:'qa@example.com',preferredTime:'x'.repeat(201)});assert.equal(r.status,400);
 r=await post({name:'Validation only',email:'qa@example.com',website:'spam-filled-hidden-field'});assert.equal(r.status,200);assert.equal((await r.json()).ok,true);
 await post({});await post({});r=await post({});assert.equal(r.status,429);assert(Number(r.headers.get('retry-after'))>0);
 console.log('PASS: server validation, preferred-time size limit, honeypot and rate limit; no mail sent.');
})().catch(e=>{console.error(e);process.exit(1)});
