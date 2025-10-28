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
        const source = "http://103.244.145.15/live/565trail724/6655447788/151.ts?token=ShJcU0BbQQNHDABcUgBTCAlSVQAEVwBVBlNQUlRdBQsAUlUAAlZbWl0bGBpEF0dcWF1vWQIXXlAEU04VEBdWQG5ZUBAJEVILUQ4ADA9BGRtNWV1VRA9VVgdTVARXVAEKHRJEW1cRWRtWDgUKDlUDGxUSVUgSUBYPUA49UwASWlFUEg5cRl8PFUdWWmdTBlhYV1QSCkQFRk0TCxFHR15dR11cGBBRWhdLBE1RGg1BBwAJABIcRFYLFF8WEE5HXhF7fxIYEFZLF1wLSl1XWUEPG01DEhxEXBc+QwcRQxcBUl9UQhYIEQNBFUdUVUBoAFpXV1VTRA9aChITWEAGR0gRX15eXUZcQTxJDF0WAhVVBw0IEk0="

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
