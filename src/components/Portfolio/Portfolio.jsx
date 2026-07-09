import { useCallback, useEffect, useRef, useState } from 'react'
import { useLenis } from '../../lib/LenisProvider'
import { PROJECTS } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectDetail from './ProjectDetail'
import RelatedProjects from './RelatedProjects'
import styles from './Portfolio.module.css'

const DIVIDER_LABELS = [
  '© PORTFOLIO 2026',
  'PORTFOLIO',
  '03 / 05',
]

export default function Portfolio() {
  const lenis = useLenis()
  const sectionRef = useRef(null)
  const dividerRef = useRef(null)
  const [dividerVisible, setDividerVisible] = useState(false)
  const [activeId, setActiveId] = useState(null)
  // Separate from activeId: stays set to the last opened project through the
  // fade-out transition, so the detail panel keeps rendering its content
  // while it fades to opacity 0 instead of unmounting instantly on close.
  const [displayId, setDisplayId] = useState(null)
  // Related-projects strip: ctaRef points at ProjectDetail's finalCta block
  // (present on every project) so an IntersectionObserver can tell when the
  // reader has scrolled near the end of the detail content.
  const ctaRef = useRef(null)
  const [nearEnd, setNearEnd] = useState(false)

  // Same one-time reveal pattern as Motto's divider.
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

  const isDetailOpen = Boolean(activeId)
  const displayProject = PROJECTS.find((p) => p.id === displayId) ?? null

  const openProject = (id) => {
    setActiveId(id)
    setDisplayId(id)
  }

  // Reused by both the open/close effect below and switchProject (related-
  // strip clicks), which swaps content without an open/close transition and
  // so needs to trigger the same reset manually.
  const scrollToSectionTop = useCallback(
    (duration = 0.8) => {
      if (!lenis || !sectionRef.current) return
      const gnbHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--gnb-height',
        ),
      )
      lenis.resize()
      lenis.scrollTo(sectionRef.current, { offset: -gnbHeight, duration })
    },
    [lenis],
  )

  // Related-strip thumbnail click: keep the overlay open, just swap which
  // project is displayed and jump back to the top of the detail content.
  const switchProject = (id) => {
    setActiveId(id)
    setDisplayId(id)
    setNearEnd(false)
    scrollToSectionTop()
  }

  // Swapping panels changes the page's total height in both directions —
  // grid->detail (the long AIWEB-style detail can be shorter or longer
  // depending on scroll position) and detail->grid (going back from deep in
  // a long detail page lands you at that same pixel offset in the *grid*
  // layout, which can be well past Portfolio into whatever section follows
  // it). Explicitly scrolling to the section top (offset by GNB height,
  // same as GNB's own nav-click scroll) on every open/close keeps the
  // result consistent instead of wherever the browser's scroll-position
  // preservation happens to land. Only real open/close transitions should
  // trigger it — compared against the previous isDetailOpen value (not a
  // "first run" flag) because `lenis` is also a dependency and flips from
  // null to the real instance shortly after mount, which would otherwise
  // re-run this effect and scroll away from the top on every page load.
  const prevIsDetailOpenRef = useRef(isDetailOpen)
  useEffect(() => {
    if (prevIsDetailOpenRef.current === isDetailOpen) return
    prevIsDetailOpenRef.current = isDetailOpen
    scrollToSectionTop()
  }, [isDetailOpen, scrollToSectionTop])

  // Related strip visibility: watch ProjectDetail's finalCta block (always
  // present) and reveal the strip once it scrolls into view, i.e. the
  // reader has reached the end of the detail content. Re-runs on displayId
  // so it re-attaches to the (possibly swapped) content's cta node.
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setNearEnd(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [displayId])

  return (
    <section id="portfolio" className={styles.portfolio} ref={sectionRef}>
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

        <div className={styles.portfolioInner}>
          <div className={styles.stage}>
            <div
              className={`${styles.panel} ${
                isDetailOpen ? styles.panelHidden : styles.panelActive
              }`}
            >
              <div className={styles.grid}>
                {PROJECTS.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={() => openProject(project.id)}
                  />
                ))}
              </div>
            </div>

            <div
              className={`${styles.panel} ${
                isDetailOpen ? styles.panelActive : styles.panelHidden
              }`}
            >
              {displayProject && (
                <ProjectDetail
                  project={displayProject}
                  onClose={() => setActiveId(null)}
                  ctaRef={ctaRef}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <RelatedProjects
        projects={PROJECTS.filter((p) => p.id !== displayId)}
        visible={isDetailOpen && nearEnd}
        onSelect={switchProject}
      />
    </section>
  )
}
