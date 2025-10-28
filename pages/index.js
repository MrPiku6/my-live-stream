import Head from 'next/head'
import Layout from '../components/Layout'
import VideoPlayer from '../components/VideoPlayer'
import BannerAd from '../components/BannerAd'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>My Live Stream Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="referrer" content="no-referrer" />
      </Head>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {/* Top Banner Ad */}
        <BannerAd />
        
        {/* Video Player */}
        <VideoPlayer />
        
        {/* Bottom Banner Ad */}
        <BannerAd />
        
        {/* Telegram Channel Link */}
        <div style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
          <b>🔥 JOIN TELEGRAM CHANNEL FOR MORE LINKS AND UPDATE</b> 🔥
          <div style={{ marginTop: '10px' }}>
            <a href="https://t.me/cricketmemesverse873" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXEokhW3x2CmtCW0RpLxWGicRcTLcSE702jB78hFiY2JLM3hxePbFhSc8HAtWJruarMofaoO5EhQ1zmrx3T_rBBJVnvQiMdBHQaSzt7Sz77QDcXwyaFDN9xK9HgkdmUGD8h3xlH14I2XG4IXXt_k0Id4tdZGgAIDfwk0QkV1KBG24b0AMmt3jRk9RtYxI/s320/1000073674.jpg" 
                alt="Telegram Channel"
                style={{ width: '320px', maxWidth: '100%', height: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
