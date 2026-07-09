import { useEffect, useRef, useState } from 'react'
import styles from './WhatIDo.module.css'

const DIVIDER_LABELS = [
  '© PORTFOLIO 2026',
  'WHAT I DO',
  '04 / 05',
]

const ITEMS = [
  {
    id: 'ui-ux',
    category: 'UX/UI',
    point: '디자인',
    description: '사용자의 행동과 맥락을 고려해 화면의 구조와 흐름을 설계합니다.',
    image: '/do/uxui.jpg',
  },
  {
    id: 'publishing',
    category: 'Publishing',
    point: '퍼블리싱',
    description: '디자인을 코드로 옮겨 실제로 작동하는 화면까지 완성합니다.',
    image: '/do/Publishing.PNG',
  },
  {
    id: 'content',
    category: 'Content',
    point: '콘텐츠 디자인',
    description: '정보를 시각적으로 정리해 이해하기 쉬운 형태로 전달합니다.',
    image: '/do/content.png',
  },
  {
    id: 'collaboration',
    category: 'Collaboration',
    point: '협업',
    description: '기획자·개발자와 소통하며 생각을 하나의 결과물로 모읍니다.',
    image: '/do/Collaboration.PNG',
  },
]

// Matches the CLAUDE.md tablet breakpoint — the cursor-following image is
// desktop-only; below this it's disabled entirely (not just hidden by CSS),
// so touch/tablet never pays for the mousemove work.
const DESKTOP_BREAKPOINT = 1024
const CURSOR_OFFSET_X = 28
const CURSOR_OFFSET_Y = 28

function isDesktopViewport() {
  return typeof window !== 'undefined' && window.innerWidth > DESKTOP_BREAKPOINT
}

function ItemImage({ item }) {
  if (item.image) {
    return <img src={item.image} alt={item.category} />
  }
  return (
    <div className={styles.placeholderImage}>
      <span className={styles.placeholderLabel}>{item.category}</span>
    </div>
  )
}

// Same char-reveal technique as Hero's headline (translateY + opacity 0),
// but slower — "What I Do" is much shorter than Hero's lines, so Hero's own
// ~0.06s/0.7s rhythm read as a blink here. Stretched out so it still feels
// like a deliberate, unhurried cascade despite having only 9 slots to work
// with. Waits for the title to scroll into view (see the titleVisible
// IntersectionObserver below) rather than firing on mount like Hero's does.
const TITLE_TEXT = 'What I Do'
const STAGGER_STEP = 0.11
const CHAR_DURATION = 0.9
// Small continuation gap after the last character lands, before the (04)
// + dot marker starts its own fade-in.
const TITLE_META_GAP = 0.15

const TITLE_CHARS = [...TITLE_TEXT]
const TITLE_LAST_CHAR_DELAY = (TITLE_CHARS.length - 1) * STAGGER_STEP
const TITLE_META_DELAY = TITLE_LAST_CHAR_DELAY + CHAR_DURATION + TITLE_META_GAP

function TitleChars({ animate }) {
  return (
    <span aria-label={TITLE_TEXT}>
      {TITLE_CHARS.map((char, i) => {
        if (char === ' ') {
          return (
            <span key={i} aria-hidden="true">
              {' '}
            </span>
          )
        }
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`${styles.char} ${animate ? styles.charAnimate : ''}`}
            style={animate ? { animationDelay: `${i * STAGGER_STEP}s` } : undefined}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

export default function WhatIDo() {
  const dividerRef = useRef(null)
  const [dividerVisible, setDividerVisible] = useState(false)

  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  const tableRef = useRef(null)
  const boxRef = useRef(null)
  const [boxVisible, setBoxVisible] = useState(false)

  // Two alternating "slots" cross-slide the outgoing/incoming image inside
  // the masked box. Each slot's position is one of below/front/above —
  // the slot that just finished animating to "above" (fully exited) snaps
  // back to "below" with transitions disabled (see handleSlotTransitionEnd),
  // so it's always ready to re-enter from the bottom next time, regardless
  // of hover order.
  const [slots, setSlots] = useState([
    { itemIndex: null, pos: 'below' },
    { itemIndex: null, pos: 'below' },
  ])
  const [instantSlot, setInstantSlot] = useState(null)
  const activeSlotRef = useRef(0)
  const currentItemRef = useRef(null)

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
    const el = titleRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const activateItem = (index) => {
    if (!isDesktopViewport()) return
    if (currentItemRef.current === index) return
    currentItemRef.current = index

    const prevActive = activeSlotRef.current
    const nextActive = prevActive === 0 ? 1 : 0
    activeSlotRef.current = nextActive

    setSlots((prev) => {
      const copy = [{ ...prev[0] }, { ...prev[1] }]
      copy[prevActive].pos = 'above'
      copy[nextActive] = { itemIndex: index, pos: 'front' }
      return copy
    })
  }

  const handleSlotTransitionEnd = (slotIndex, event) => {
    if (event.propertyName !== 'transform') return
    setSlots((prev) => {
      if (prev[slotIndex].pos !== 'above') return prev
      const copy = [{ ...prev[0] }, { ...prev[1] }]
      copy[slotIndex] = { itemIndex: null, pos: 'below' }
      return copy
    })
    setInstantSlot(slotIndex)
    requestAnimationFrame(() => setInstantSlot(null))
  }

  const handleTableMouseEnter = () => {
    if (!isDesktopViewport()) return
    setBoxVisible(true)
  }

  const handleTableMouseLeave = () => {
    currentItemRef.current = null
    setBoxVisible(false)
  }

  const handleTableMouseMove = (event) => {
    if (!isDesktopViewport()) return
    const box = boxRef.current
    if (!box) return
    // Direct style mutation, no React state — same reasoning as
    // CustomCursor's tracking: going through setState on every mousemove
    // would add a render/commit cycle of lag.
    box.style.transform = `translate3d(${event.clientX + CURSOR_OFFSET_X}px, ${
      event.clientY + CURSOR_OFFSET_Y
    }px, 0)`
  }

  return (
    <section id="what-i-do" className={styles.whatIDo}>
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

        <div className={styles.titleRow} ref={titleRef}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>
              <TitleChars animate={titleVisible} />
            </h2>
            <div
              className={`${styles.titleMeta} ${
                titleVisible ? styles.titleMetaAnimate : ''
              }`}
              style={
                titleVisible
                  ? { animationDelay: `${TITLE_META_DELAY}s` }
                  : undefined
              }
            >
              <span className={styles.titleIndex}>(04)</span>
              <span className={styles.titleDot} aria-hidden="true" />
            </div>
          </div>
        </div>

        <ul
          ref={tableRef}
          className={styles.table}
          onMouseEnter={handleTableMouseEnter}
          onMouseLeave={handleTableMouseLeave}
          onMouseMove={handleTableMouseMove}
        >
          {ITEMS.map((item, i) => (
            <li
              key={item.id}
              className={styles.row}
              onMouseEnter={() => activateItem(i)}
            >
              <span className={styles.category}>{item.category}</span>
              <span className={styles.point}>{item.point}</span>
              <span className={styles.description}>{item.description}</span>
              <span className={styles.number}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={boxRef}
        className={`${styles.cursorBox} ${
          boxVisible ? styles.cursorBoxVisible : ''
        }`}
        aria-hidden="true"
      >
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`${styles.slot} ${styles[`slot${capitalize(slot.pos)}`]} ${
              instantSlot === i ? styles.slotInstant : ''
            }`}
            onTransitionEnd={(event) => handleSlotTransitionEnd(i, event)}
          >
            {slot.itemIndex !== null && (
              <ItemImage item={ITEMS[slot.itemIndex]} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
