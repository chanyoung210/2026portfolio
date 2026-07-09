import { useEffect, useState } from 'react'
import { useLenis } from '../../lib/LenisProvider'
import styles from './ScrollTopButton.module.css'

// Below this scroll position the button stays hidden — no point offering
// "back to top" when you're already near it.
const SHOW_THRESHOLD = 400

export default function ScrollTopButton() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = (instance) => {
      setVisible(instance.scroll > SHOW_THRESHOLD)
    }

    lenis.on('scroll', handleScroll)
    return () => lenis.off('scroll', handleScroll)
  }, [lenis])

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1 })
  }

  return (
    <button
      type="button"
      className={`${styles.scrollTop} ${
        visible ? styles.scrollTopVisible : ''
      }`}
      onClick={handleClick}
      aria-label="맨 위로 이동"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <polyline
          points="6 15 12 9 18 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
