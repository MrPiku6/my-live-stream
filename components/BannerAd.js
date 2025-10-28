export default function BannerAd() {
  return (
    <div style={{ width: '100%', maxWidth: '320px', margin: '10px auto' }}>
      <script 
        type="text/javascript"
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
      <div id="banner-ad-container"></div>
    </div>
  )
    }
