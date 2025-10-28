import { useEffect } from 'react'
import Script from 'next/script'

export default function Layout({ children }) {
  useEffect(() => {
    // Popunder ads script
    const popunderScript = document.createElement('script')
    popunderScript.src = '//cockpitadministration.com/53/6c/d1/536cd1f2928f51fc4b8d7416662a9e7e.js'
    popunderScript.async = true
    document.body.appendChild(popunderScript)
  }, [])

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      {children}
      
      {/* Banner Ads Script */}
      <Script
        id="banner-ad-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : 'a167e33a4125da8ed5562e8190a4f350',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `
        }}
      />
      <Script 
        src="//cockpitadministration.com/a167e33a4125da8ed5562e8190a4f350/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
