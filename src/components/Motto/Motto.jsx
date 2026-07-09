import { useEffect, useRef, useState } from 'react'
import { useLenis } from '../../lib/LenisProvider'
import styles from './Motto.module.css'

const DIVIDER_LABELS = [
  '© PORTFOLIO 2026',
  'MOTTO',
  '02 / 05',
]

const MOTTO_LINES = [
  '좋은 디자인은 사용자의 일상에',
  '긍정적인 경험 을 주고 나아가서는',
  '지속 가능한 환경 을 만들 수 있다고 믿습니다.',
]

// Mobile-only rewrite (shorter, 4 lines) — not just a re-wrap of
// MOTTO_LINES at a different width, the wording itself changes ("사용자의
// 일상에" / "주고 나아가서는" dropped, particles adjusted), so it needs its
// own char-offset/highlight bookkeeping below rather than reusing the
// desktop numbers.
const MOTTO_LINES_MOBILE = [
  '좋은 디자인은',
  '긍정적인 경험 을',
  '지속 가능한 환경 으로',
  '만들 수 있다고 믿습니다.',
]

// Global character offsets so the reveal progress is one continuous count
// across all lines (not reset per line), while still rendering each line as
// its own visual row.
function buildLineOffsets(lines) {
  const lineChars = lines.map((line) => [...line])
  let running = 0
  const lineStartOffsets = lineChars.map((chars) => {
    const offset = running
    running += chars.length
    return offset
  })
  const totalChars = lineChars.reduce((sum, chars) => sum + chars.length, 0)
  return { lineStartOffsets, totalChars }
}

const { lineStartOffsets: LINE_START_OFFSETS, totalChars: TOTAL_CHARS } =
  buildLineOffsets(MOTTO_LINES)
const {
  lineStartOffsets: LINE_START_OFFSETS_MOBILE,
  totalChars: TOTAL_CHARS_MOBILE,
} = buildLineOffsets(MOTTO_LINES_MOBILE)

// Marker-highlight phrases inside the motto lines above. Each highlight
// turns on once *all of its own characters* have been revealed — not after
// the whole paragraph is done — plus its own extra delay (by HIGHLIGHTS
// order) so the two boxes are always clearly separated in time.
const HIGHLIGHTS = ['긍정적인 경험', '지속 가능한 환경']
const HIGHLIGHT_BASE_DELAY = 0.25
const HIGHLIGHT_STAGGER_STEP = 0.35

function renderLineChars(line, lineStartOffset, revealedCount, styles) {
  const chars = [...line]

  const highlightRanges = HIGHLIGHTS.map((phrase, highlightIndex) => {
    const pos = line.indexOf(phrase)
    if (pos === -1) return null
    return { start: pos, end: pos + [...phrase].length, highlightIndex }
  }).filter(Boolean)

  const nodes = []
  let i = 0
  while (i < chars.length) {
    const range = highlightRanges.find((r) => r.start === i)

    if (range) {
      const lastGlobalIndex = lineStartOffset + range.end - 1
      const highlightRevealed = lastGlobalIndex < revealedCount
      const highlightChars = []

      for (let j = range.start; j < range.end; j++) {
        const charRevealed = lineStartOffset + j < revealedCount
        highlightChars.push(
          <span
            key={j}
            className={`${styles.char} ${
              charRevealed ? styles.charRevealed : ''
            }`}
          >
            {chars[j]}
          </span>,
        )
      }

      nodes.push(
        <span
          key={`highlight-${range.start}`}
          className={`${styles.highlight} ${
            highlightRevealed ? styles.highlightActive : ''
          }`}
          style={{
            transitionDelay: `${
              HIGHLIGHT_BASE_DELAY +
              range.highlightIndex * HIGHLIGHT_STAGGER_STEP
            }s`,
          }}
        >
          {highlightChars}
        </span>,
      )
      i = range.end
    } else {
      const charRevealed = lineStartOffset + i < revealedCount
      nodes.push(
        <span
          key={i}
          className={`${styles.char} ${
            charRevealed ? styles.charRevealed : ''
          }`}
        >
          {chars[i]}
        </span>,
      )
      i += 1
    }
  }

  return nodes
}

const CAPTION_LINES = [
  'Claude Code, Cursor 같은 AI 코딩 도구를 활용해 퍼블리싱하여 팀 협업 효율을 높여왔습니다.',
]

// The reveal window is a band inside the viewport (90% -> 52% from the top)
// rather than the full viewport height, so the characters clearly cascade
// during a normal scroll instead of finishing almost instantly. End ratio
// raised from 0.25 — at 0.25 the paragraph had to scroll almost to the top
// edge before finishing, which both demanded a lot of scroll distance and
// left the fully-revealed text sitting high/cramped in the frame. 0.52 lands
// the finish while the paragraph is still in the upper-middle of the frame.
const REVEAL_START_RATIO = 0.9
const REVEAL_END_RATIO = 0.52

// Parallax: the image column moves an extra 0.25px for every 1px scrolled
// (so ~100px of scroll -> ~125px of image movement, on top of the normal
// scroll it already gets from sitting in the page flow), while the text
// column is untouched. Only active while the columns are still side-by-side
// (now down through tablet — see the 1024px query in Motto.module.css,
// columns only stack at the 768px mobile breakpoint). Applied via direct
// ref mutation (not React state) so it doesn't trigger a re-render on every
// scroll tick.
//
// Tuned so the extra travel stays noticeable but doesn't take the image
// out of frame by the time the text color-reveal finishes (paragraph top
// hits REVEAL_END_RATIO). 0.4 pushed it up by close to its full height by
// then (too far out of frame); 0.15 barely read as parallax at all (too
// subtle). This is the middle point between those two.
const PARALLAX_EXTRA_FACTOR = 0.25
const PARALLAX_BREAKPOINT = 768

export default function Motto() {
  const lenis = useLenis()
  const sectionRef = useRef(null)
  // On .textColumn rather than either <p> directly — its top edge is
  // identical to the desktop paragraph's own (no padding/border in
  // between), so REVEAL_START_RATIO/END_RATIO's tuning is unaffected, but
  // this way one measurement drives both the desktop and mobile reveal
  // progress below instead of needing a second scroll listener.
  const paragraphRef = useRef(null)
  const imageCardRef = useRef(null)
  const dividerRef = useRef(null)
  const [revealedCount, setRevealedCount] = useState(0)
  const [mobileRevealedCount, setMobileRevealedCount] = useState(0)
  const [dividerVisible, setDividerVisible] = useState(false)

  // One-time reveal for the top divider row (labels + line) — plays once
  // when it first scrolls into view, independent of the char-by-char
  // color reveal below.
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
    if (!lenis) return

    const handleScroll = () => {
      const el = paragraphRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * REVEAL_START_RATIO
      const end = vh * REVEAL_END_RATIO
      const raw = (start - rect.top) / (start - end)
      const progress = Math.min(1, Math.max(0, raw))

      setRevealedCount(Math.round(progress * TOTAL_CHARS))
      setMobileRevealedCount(Math.round(progress * TOTAL_CHARS_MOBILE))
    }

    handleScroll()
    lenis.on('scroll', handleScroll)
    return () => lenis.off('scroll', handleScroll)
  }, [lenis])

  useEffect(() => {
    if (!lenis) return

    const handleParallax = () => {
      const section = sectionRef.current
      const card = imageCardRef.current
      if (!section || !card) return

      if (window.innerWidth <= PARALLAX_BREAKPOINT) {
        card.style.transform = ''
        return
      }

      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight

      // Skip while nowhere near the viewport — cheap, and avoids the
      // offset drifting further once the section is long gone.
      if (rect.bottom < 0 || rect.top > vh) return

      // Capped at `vh` — uncapped, this kept growing for as long as any
      // part of the section was still in the viewport, so a tall section
      // (e.g. tablet, where the text column wraps to more lines) let the
      // image drift far past its intended travel by the time you scrolled
      // through the whole thing, leaving an oversized gap where it used to
      // sit. Capping bounds max travel to `-vh * PARALLAX_EXTRA_FACTOR`
      // regardless of how long the section itself ends up being.
      const scrolledPast = Math.min(vh, Math.max(0, vh - rect.top))
      const offset = -scrolledPast * PARALLAX_EXTRA_FACTOR
      card.style.transform = `translateY(${offset}px)`
    }

    handleParallax()
    lenis.on('scroll', handleParallax)
    window.addEventListener('resize', handleParallax)
    return () => {
      lenis.off('scroll', handleParallax)
      window.removeEventListener('resize', handleParallax)
    }
  }, [lenis])

  return (
    <section id="motto" className={styles.motto} ref={sectionRef}>
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

        <div className={styles.mottoInner}>
          <div className={styles.grid}>
            <div className={styles.textColumn} ref={paragraphRef}>
              <p
                className={`${styles.mottoText} ${styles.mottoTextDesktop}`}
              >
                {MOTTO_LINES.map((line, i) => (
                  <span key={i} className={styles.line}>
                    {renderLineChars(
                      line,
                      LINE_START_OFFSETS[i],
                      revealedCount,
                      styles,
                    )}
                  </span>
                ))}
              </p>
              {/* Different wording, not just a re-wrap — see the comment on
                  MOTTO_LINES_MOBILE. Both paragraphs render always; CSS
                  toggles which is shown per breakpoint (same pattern as
                  Hero's headlineLineDesktop/Mobile). */}
              <p className={`${styles.mottoText} ${styles.mottoTextMobile}`}>
                {MOTTO_LINES_MOBILE.map((line, i) => (
                  <span key={i} className={styles.line}>
                    {renderLineChars(
                      line,
                      LINE_START_OFFSETS_MOBILE[i],
                      mobileRevealedCount,
                      styles,
                    )}
                  </span>
                ))}
              </p>
              <p className={styles.caption}>
                {CAPTION_LINES.map((line, i) => (
                  <span key={i} className={styles.captionLine}>
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className={styles.imageColumn}>
              <div ref={imageCardRef} className={styles.imageCard}>
                <img src="/me.png" alt="안찬영" className={styles.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
