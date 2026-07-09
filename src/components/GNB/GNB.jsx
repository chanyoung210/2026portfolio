import { useEffect, useState } from 'react'
import { useLenis } from '../../lib/LenisProvider'
import styles from './GNB.module.css'

const NAV_ITEMS = [
  { id: 'motto', label: 'Motto' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'what-i-do', label: 'What I Do' },
  { id: 'about', label: 'About' },
]

// Below this scroll position the GNB always stays visible, regardless of direction.
const TOP_THRESHOLD = 80

// animate defaults to true, so the entrance fade/slide plays on mount.
export default function GNB({ animate = true }) {
  const lenis = useLenis()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = (instance) => {
      if (instance.scroll <= TOP_THRESHOLD) {
        setHidden(false)
        return
      }
      if (instance.direction === 1) {
        setHidden(true)
      } else if (instance.direction === -1) {
        setHidden(false)
      }
    }

    lenis.on('scroll', handleScroll)
    return () => lenis.off('scroll', handleScroll)
  }, [lenis])

  const handleNavClick = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    const gnbHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--gnb-height',
      ),
    )
    lenis?.scrollTo(target, { offset: -gnbHeight, duration: 1.2 })
  }

  return (
    <header
      className={`${styles.gnb} ${hidden ? styles.hidden : ''} ${
        animate ? '' : styles.entering
      }`}
    >
      <nav className={`container ${styles.inner}`}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.navLink}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
