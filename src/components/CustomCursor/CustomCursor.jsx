import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

const HOVER_TARGET_SELECTOR = 'a, button, [role="button"]'
const HIDE_TARGET_SELECTOR = '[data-cursor="hide"]'
// Elements that want a text label inside the cursor circle (e.g. "COPY")
// set data-cursor-text="..." — read on mouseover, same delegation as the
// hide/hover checks above.
const TEXT_TARGET_SELECTOR = '[data-cursor-text]'

// Any component can trigger a temporary text override (e.g. "COPIED!"
// after a clipboard write) by dispatching this event on window — decouples
// CustomCursor (a global singleton) from whichever section actually
// triggers the feedback, without a shared state/context layer.
export const CURSOR_COPY_FEEDBACK_EVENT = 'cursor-copy-feedback'
const COPY_FEEDBACK_DURATION = 1800

export default function CustomCursor() {
  const outerRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [hiddenOverride, setHiddenOverride] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const feedbackTimeoutRef = useRef(null)

  useEffect(() => {
    // Touch-primary devices never show this — skip attaching listeners.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (event) => {
      const el = outerRef.current
      if (!el) return
      // Direct style mutation, no React state — updating every mousemove
      // through setState would add a render/commit cycle of lag, which
      // defeats the "no delay, 1:1 with the cursor" requirement.
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }

    const handleMouseOver = (event) => {
      setHiddenOverride(Boolean(event.target.closest(HIDE_TARGET_SELECTOR)))
      setHovering(Boolean(event.target.closest(HOVER_TARGET_SELECTOR)))
      const textTarget = event.target.closest(TEXT_TARGET_SELECTOR)
      setHoverText(textTarget?.dataset.cursorText ?? '')
    }

    const handleCopyFeedback = (event) => {
      setFeedbackText(event.detail?.text || 'COPIED!')
      clearTimeout(feedbackTimeoutRef.current)
      feedbackTimeoutRef.current = setTimeout(() => {
        setFeedbackText('')
      }, COPY_FEEDBACK_DURATION)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    window.addEventListener(CURSOR_COPY_FEEDBACK_EVENT, handleCopyFeedback)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener(
        CURSOR_COPY_FEEDBACK_EVENT,
        handleCopyFeedback,
      )
      clearTimeout(feedbackTimeoutRef.current)
    }
  }, [])

  // Feedback (e.g. "COPIED!") always wins over whatever's currently
  // hovered — once its timeout clears, this just falls back to the live
  // hoverText, which by then already reflects the real hover target.
  const displayText = feedbackText || hoverText

  return (
    <div
      ref={outerRef}
      className={`${styles.cursorOuter} ${
        hiddenOverride ? styles.cursorOuterHidden : ''
      } ${displayText ? styles.cursorOuterText : ''}`}
      aria-hidden="true"
    >
      <div
        className={`${styles.cursorInner} ${
          hovering ? styles.cursorHover : ''
        } ${displayText ? styles.cursorTextMode : ''}`}
      >
        {displayText && (
          <span key={displayText} className={styles.cursorLabel}>
            {displayText}
          </span>
        )}
      </div>
    </div>
  )
}
