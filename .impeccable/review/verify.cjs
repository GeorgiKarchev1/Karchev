const { chromium } = require('/Users/Apple/.npm/_npx/9833c18b2d85bc59/node_modules/playwright')
const assert = require('node:assert/strict')

async function settleImages(page) {
  await page.evaluate(async () => {
    const images = [...document.querySelectorAll('main img')]
    images.forEach(image => { image.loading = 'eager' })
    await Promise.all(images.map(image => image.decode().catch(() => {})))
    await document.fonts.ready
    window.scrollTo(0, 0)
  })
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  try {
    for (const locale of ['en', 'bg']) {
      for (const width of [1440, 768, 390]) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
        await page.addInitScript(() => localStorage.setItem('karchev_cookie_consent', 'declined'))
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        await page.goto('http://localhost:3000/' + locale, { waitUntil: 'networkidle' })
        await settleImages(page)
        assert.equal(await page.locator('h1').count(), 1)
        assert.deepEqual(errors, [])
        const layout = await page.evaluate(() => ({
          overflowing: [...document.querySelectorAll('main *, footer *')].filter(element => {
            const box = element.getBoundingClientRect()
            return box.width > 0 && (box.right > innerWidth + 2 || box.left < -2)
          }).map(element => element.className),
          brokenImages: [...document.querySelectorAll('main img')].filter(image => !image.complete || !image.naturalWidth).map(image => image.currentSrc),
        }))
        assert.deepEqual(layout.overflowing, [])
        assert.deepEqual(layout.brokenImages, [])
        await page.screenshot({ path: '.impeccable/review/' + locale + '-' + width + '.png', fullPage: true })
        await page.screenshot({ path: '.impeccable/review/' + locale + '-' + width + '-hero.png' })
        if (width === 390) {
          const menu = page.locator('.studio-menu-toggle')
          await menu.click()
          await page.locator('.studio-mobile-menu a').first().waitFor({ state: 'visible' })
          await page.keyboard.press('Escape')
          assert.equal(await menu.getAttribute('aria-expanded'), 'false')
          assert.equal(await menu.evaluate(element => document.activeElement === element), true)
          await menu.click()
          await page.locator('.studio-mobile-menu a').nth(2).click()
          await page.waitForURL('**#how-it-works')
          assert.equal(await menu.getAttribute('aria-expanded'), 'false')
          assert.equal(new URL(page.url()).hash, '#how-it-works')
        }
        await page.locator('.studio-more-work summary').click()
        assert.equal(await page.locator('.studio-more-work[open] > div > a').count(), 4)
        await page.locator('.studio-questions summary').first().click()
        assert.equal(await page.locator('.studio-questions details[open]').count(), 1)
        await page.locator('.studio-language').click()
        await page.waitForURL('**/' + (locale === 'en' ? 'bg' : 'en'))
        assert.equal(await page.locator('html').getAttribute('lang'), locale === 'en' ? 'bg' : 'en')
        console.log('PASS ' + locale + ' ' + width + ': images, overflow, headings, links, disclosures, locale' + (width === 390 ? ', mobile menu and keyboard' : ''))
        await page.close()
      }
    }
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    await page.addInitScript(() => localStorage.setItem('karchev_cookie_consent', 'declined'))
    await page.goto('http://localhost:3000/en')
    await page.fill('#contact-name', 'Design verification')
    await page.fill('#contact-email', 'verification@example.com')
    let requestBody
    await page.route('https://formsubmit.co/ajax/**', async route => {
      requestBody = route.request().postDataJSON()
      await route.fulfill({ status: 500, contentType: 'application/json', body: '{"success":false}' })
    })
    await page.locator('.studio-submit').click()
    await page.locator('.studio-form-error').waitFor()
    assert.equal(await page.inputValue('#contact-name'), 'Design verification')
    assert.equal(requestBody.email, 'verification@example.com')
    await page.unroute('https://formsubmit.co/ajax/**')
    await page.route('https://formsubmit.co/ajax/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }))
    await page.locator('.studio-submit').click()
    await page.locator('.studio-success').waitFor()
    console.log('PASS simulated form failure, retained input, retry, success; no email sent')
    await page.close()

    const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
    await noJS.goto('http://localhost:3000/en')
    assert.equal(await noJS.locator('h1').isVisible(), true)
    assert.equal(await noJS.locator('#portfolio').isVisible(), true)
    assert.equal(await noJS.locator('.studio-hero .studio-button').isVisible(), true)
    console.log('PASS no-JavaScript content and booking fallback')
    await noJS.close()

    const cookie = await browser.newPage({ viewport: { width: 390, height: 844 } })
    await cookie.goto('http://localhost:3000/en')
    await cookie.locator('.studio-cookie').waitFor()
    assert.match(await cookie.locator('.studio-cookie').innerText(), /Cookies on this site/)
    await cookie.getByRole('button', { name: 'Decline', exact: true }).click()
    await cookie.reload()
    assert.equal(await cookie.locator('.studio-cookie').count(), 0)
    console.log('PASS translated cookie notice and stored dismissal')
    await cookie.close()
  } finally { await browser.close() }
}
run().catch(error => { console.error(error); process.exitCode = 1 })
