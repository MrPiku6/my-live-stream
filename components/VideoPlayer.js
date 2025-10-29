import { useEffect, useRef } from 'react'
import Script from 'next/script'

export default function VideoPlayer() {
  const videoRef = useRef(null)

  useEffect(() => {
    // Load external scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    const initializePlayer = async () => {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js')
        await loadScript('https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.min.js')

        const video = videoRef.current
        const source = "https://live-bpk.cdn.hotstar.com/hls/live/2024725/inallow-ausvsind-odi-2025/hin/1540055446/15mindvrm01e180f73dc2da4bd58f29d18a30b8bfc329october2025/master_ap.m3u8?a=ns&hdnea=exp=1761730545~acl=/hls/live/2024725/inallow-ausvsind-odi-2025/hin/1540055446/15mindvrm01e180f73dc2da4bd58f29d18a30b8bfc329october2025/master_ap~ttl=1800~type=paid~data=ip=tU7EIwgCRXvWpwtUZtXCwM7nFnr61tMpgfeQ4mhCky5r-userid=aAOAWDscah7hJBUCDiFIao6XHlWHBtW0dqVIVTwUE4m3-did=v9zk75tvT0dSumgP8EtpbV0uKTAJoUCFOJmBgyQVaif7-cc=in-de=1-pl=web-ap=25.10.03.0-ut=free-fpassv2-~hmac=dbeab759758232570ce1a2b071ce2eaf43fcbbe537deb032ecc643b779e3976b"

        if (window.Hls && window.Hls.isSupported()) {
          const hls = new window.Hls()
          hls.loadSource(source)
          hls.attachMedia(video)
          
          hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
            const availableQualities = hls.levels.map((level) => level.height)
            availableQualities.unshift(-1)

            new window.Plyr(video, {
              controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
              quality: {
                default: -1,
                options: availableQualities,
                forced: true,
                onChange: (newQuality) => {
                  hls.currentLevel = availableQualities.indexOf(newQuality) - 1
                },
              },
              i18n: {
                qualityLabel: {
                  '-1': 'Auto',
                },
              },
            })
          })
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source
          new window.Plyr(video)
        }
      } catch (error) {
        console.error('Error initializing player:', error)
      }
    }

    initializePlayer()
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.css" />
      
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <video 
          ref={videoRef}
          id="player"
          autoPlay 
          muted 
          controls 
          crossOrigin="anonymous"
          playsInline
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </>
  )
}
