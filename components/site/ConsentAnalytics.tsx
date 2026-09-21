'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function ConsentAnalytics() {
  const [accepted, setAccepted] = useState(false)
  useEffect(() => {
    const sync = () => {
      try { setAccepted(localStorage.getItem('karchev_cookie_consent') === 'accepted') } catch { setAccepted(false) }
    }
    sync()
    window.addEventListener('karchx-cookie-consent', sync)
    return () => window.removeEventListener('karchx-cookie-consent', sync)
  }, [])
  if (!accepted) return null
  return <>
    <Script id="microsoft-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wh7c0g9u2q");`}</Script>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-HYR74PQ33D" strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HYR74PQ33D');`}</Script>
  </>
}
