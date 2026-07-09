import { useEffect, useRef, useState } from 'react'
import styles from './AboutMe.module.css'

const DIVIDER_LABELS = ['© PORTFOLIO 2026', 'ABOUT ME', '05 / 05']

// `height` varies per item on purpose (rhythm, not a uniform row) — width
// follows automatically from the aspect-ratio (defaults to the CSS's 3:4;
// landscape shots override it here so object-fit:cover doesn't crop them
// down to an unrecognizable sliver).
const MARQUEE_IMAGES = [
  {
    id: 'about-1',
    image: '/about/me01.png',
    alt: '한강에서 반려견과 함께 찍은 사진',
    height: 320,
  },
  {
    id: 'about-2',
    image: '/about/gangang.jpg',
    alt: '한강과 다리가 보이는 풍경 사진',
    height: 300,
    aspectRatio: '4 / 3',
  },
  {
    id: 'about-3',
    image: '/about/dog01.png',
    alt: '노란 옷을 입은 반려견 사진',
    height: 380,
  },
  {
    id: 'about-4',
    image: '/about/book.png',
    alt: '도널드 노먼의 디자인과 인간 심리',
    height: 340,
    // Matches book.png's actual pixel dimensions (333x453, portrait) —
    // the old '3 / 2' was a landscape ratio left over from before the
    // file was renamed/replaced, badly mismatched with the real image.
    aspectRatio: '333 / 453',
  },
  {
    id: 'about-5',
    image: '/about/me02.jpg',
    alt: '공원에서 찍은 인물 사진',
    height: 360,
  },
  {
    id: 'about-6',
    image: '/about/rightparty.jpg',
    alt: '야간 행사장에서 촬영한 사진',
    height: 300,
    aspectRatio: '4 / 3',
  },
]

// Constant px/sec, not a fixed keyframe duration — so resizing changes how
// long one loop takes, not how fast it visually scrolls.
const MARQUEE_SPEED_PX_PER_SEC = 60

function MarqueeImage({ item }) {
  if (item.image) {
    return <img src={item.image} alt={item.alt} />
  }
  return (
    <div className={styles.placeholderImage}>
      <span className={styles.placeholderLabel}>{item.label}</span>
    </div>
  )
}

function MarqueeSet({ setRef, hidden }) {
  return (
    <div
      ref={setRef}
      className={styles.marqueeSet}
      aria-hidden={hidden ? 'true' : undefined}
    >
      {MARQUEE_IMAGES.map((item) => (
        <div
          key={item.id}
          className={styles.marqueeItem}
          style={{
            height: `clamp(140px, 24vw, ${item.height}px)`,
            aspectRatio: item.aspectRatio,
          }}
        >
          <MarqueeImage item={item} />
        </div>
      ))}
    </div>
  )
}

export default function AboutMe() {
  const dividerRef = useRef(null)
  const [dividerVisible, setDividerVisible] = useState(false)

  const trackRef = useRef(null)
  const firstSetRef = useRef(null)
  // Measured in px: one full set's width + the seam gap between it and the
  // next set — i.e. exactly the distance the track has to travel before
  // the second (identical) set lines up where the first one started.
  const shiftRef = useRef(0)
  const offsetRef = useRef(0)

  useEffect(() => {
    const el = dividerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDividerVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const setEl = firstSetRef.current
    const trackEl = trackRef.current
    if (!setEl || !trackEl) return

    // Same convention as GNB's --gnb-height read: pull the real px value
    // straight from the token instead of hardcoding it, so the seam gap
    // (the gap between the two sets, via .marqueeTrack's own `gap`) always
    // matches the per-image gap inside each set exactly.
    const measure = () => {
      const gapPx = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--space-4',
        ),
      )
      shiftRef.current = setEl.getBoundingClientRect().width + gapPx
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(setEl)
    window.addEventListener('resize', measure)

    let frameId
    let lastTime = performance.now()

    const tick = (now) => {
      const deltaSeconds = (now - lastTime) / 1000
      lastTime = now

      if (shiftRef.current > 0) {
        offsetRef.current =
          (offsetRef.current + MARQUEE_SPEED_PX_PER_SEC * deltaSeconds) %
          shiftRef.current

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
        }
      }

      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section id="about" className={styles.aboutMe}>
      <div className="container">
        <div
          ref={dividerRef}
          className={`${styles.divider} ${
            dividerVisible ? styles.dividerVisible : ''
          }`}
        >
          <span className={styles.dividerLabel}>{DIVIDER_LABELS[0]}</span>
          <span className={styles.dividerLabel}>{DIVIDER_LABELS[1]}</span>
          <span className={styles.dividerLabel}>{DIVIDER_LABELS[2]}</span>
        </div>
      </div>

      <div className={styles.marqueeViewport}>
        <div ref={trackRef} className={styles.marqueeTrack}>
          <MarqueeSet setRef={firstSetRef} />
          <MarqueeSet hidden />
        </div>
      </div>

      <div className="container">
        <div className={styles.caption}>
          <p className={styles.captionEn}>
            <span className={styles.captionLine}>
              A block-shaped designer —
            </span>
            <span className={styles.captionLine}>
              across design, prototyping, and deployment.
            </span>
          </p>
          <p className={styles.captionKo}>
            경계를 넘나들며, 두루 해낼 수 있는 사람이 되고자 합니다.
          </p>
        </div>
      </div>
    </section>
  )
}
