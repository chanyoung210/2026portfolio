import { useEffect, useRef } from 'react'
import { useLenis } from '../../lib/LenisProvider'
import { CURSOR_COPY_FEEDBACK_EVENT } from '../CustomCursor/CustomCursor'
import styles from './Footer.module.css'

const EMAIL = 'chanyoung210@gmail.com'
const PHONE = '010-2961-5770'
const COPY_FEEDBACK_TEXT = 'COPIED!'

// "Arrival" parallax band, keyed off how far the footer itself has scrolled
// into view — NOT a fixed fraction of total page scroll. This site's page is
// long (portfolio sections etc.), so a page-wide fraction like "last 15%"
// mostly elapses while the footer is still below the viewport; only a sliver
// of it is left for the part you can actually see, which is why the rise
// read as barely-there. Anchoring to the footer's own entry means the full
// animation plays out exactly while it's visibly scrolling into view,
// regardless of how long the rest of the page is.
//
// The end of the band is still real max scroll (scrollHeight - clientHeight)
// so it lands exactly on the last frame — footer is the final section, so
// max scroll and "footer fully in view" are the same moment.
//
// The title's *landed* position is a separate thing from that progress
// value, though: translateY(0) always resolves to the element's normal,
// untransformed document position — increasing the *start* offset only
// changes how far it travels to get there, not where "there" is. To
// actually land the title higher than its natural resting spot, the *end*
// of the lerp has to overshoot past 0 (a negative translateY), not just 0.
// Big enough travel distance to read as a real rise, not a nudge.
const TITLE_START_OFFSET_PX = 130
// Negative = lands 30px above the title's natural static position.
// Unchanged — this is the "final position is correct" resting state,
// only the *distance traveled* to get there is being made more dramatic.
const TITLE_END_OFFSET_PX = -30
const TITLE_START_OPACITY = 0.05
const TITLE_END_OPACITY = 1

// Ease-out cubic — fast at first, settling in gently rather than a
// constant-speed (linear) rise. Applied to `progress` before it drives
// either the transform or the opacity, so both share the same curve.
function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export default function Footer() {
  const lenis = useLenis()
  const footerRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const el = titleRef.current
      const footerEl = footerRef.current
      if (!el || !footerEl) return

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const viewportHeight = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - viewportHeight

      // getBoundingClientRect() + scrollTop, not offsetTop — stays correct
      // even if some ancestor ends up transformed (offsetTop would instead
      // resolve relative to that ancestor).
      const footerDocTop = footerEl.getBoundingClientRect().top + scrollTop
      // scrollTop at the instant the footer's top edge touches the
      // viewport's bottom edge — i.e. the very first frame any part of the
      // footer is visible. That's progress 0.
      const entryScrollTop = footerDocTop - viewportHeight

      const raw =
        maxScroll > entryScrollTop
          ? (scrollTop - entryScrollTop) / (maxScroll - entryScrollTop)
          : 1
      const linearProgress = Math.min(1, Math.max(0, raw))
      const progress = easeOutCubic(linearProgress)

      const offset =
        TITLE_START_OFFSET_PX +
        (TITLE_END_OFFSET_PX - TITLE_START_OFFSET_PX) * progress
      const opacity =
        TITLE_START_OPACITY + (TITLE_END_OPACITY - TITLE_START_OPACITY) * progress

      el.style.transform = `translateY(${offset}px)`
      el.style.opacity = `${opacity}`
    }

    handleScroll()
    lenis.on('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [lenis])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      window.dispatchEvent(
        new CustomEvent(CURSOR_COPY_FEEDBACK_EVENT, {
          detail: { text: COPY_FEEDBACK_TEXT },
        }),
      )
    } catch {
      // Clipboard permission denied/unavailable — silently no-op, there's
      // no good fallback UI for a cursor-driven affordance like this one.
    }
  }

  return (
    <footer id="footer" ref={footerRef} className={styles.footer}>
      <div className="container">
        <p className={styles.tagline}>
          Portfolio Site | Designer An Chanyoung. Delivering Positive
          Experience Through Design.
        </p>

        <div className={styles.contact}>
          <button
            type="button"
            className={styles.emailButton}
            data-cursor-text="COPY"
            onClick={handleCopyEmail}
          >
            {`{ Email: ${EMAIL} }`}
          </button>
          <p>{`{ Tel: ${PHONE} }`}</p>
        </div>

        <h2 ref={titleRef} className={styles.title}>
          <span className={styles.titleLine}>LET&apos;S WORK</span>
          <span className={styles.titleLine}>TOGETHER.</span>
        </h2>

        <p className={styles.copyright}>
          © 2026 An Chanyoung. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
