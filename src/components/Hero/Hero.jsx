import styles from './Hero.module.css'

// Stagger interval between each character's entrance (seconds).
const STAGGER_STEP = 0.06
// How long a single character's own translateY/opacity transition takes.
const CHAR_DURATION = 0.7
// Gap between the headline finishing and the subtext starting (reduced by
// 0.5s from the original 0.2s per explicit request, so it can go negative —
// i.e. the subline now starts slightly before the headline cascade ends).
const SUBLINE_GAP = -0.3
// Mobile-only: small deliberate beat between the headline (all 3 lines)
// finishing and the logo's slide-up starting — see mobileLogoDelay below.
const MOBILE_LOGO_GAP = 0.15

function CharStagger({ text, baseDelay, animate }) {
  const chars = [...text]

  return (
    <span aria-label={text}>
      {chars.map((char, i) => {
        // Rendering a bare space inside an inline-block span can collapse
        // to zero width in some browsers — keep it as a plain, unanimated
        // non-breaking space instead of an animated inline-block char.
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
            style={
              animate
                ? { animationDelay: `${baseDelay + i * STAGGER_STEP}s` }
                : undefined
            }
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

// animate defaults to true, so the entrance (headline chars, logo, subline)
// plays on mount as normal.
export default function Hero({ companyName = 'Aladin', animate = true }) {
  const line1Text = `Hello, ${companyName}`
  const line2Text = 'Designer Portfolio.'

  const line1Length = [...line1Text].length
  const line2Length = [...line2Text].length

  // The logo occupies one extra "slot" right after line 1, riding the exact
  // same stagger rhythm as a character — that's what makes it feel like a
  // natural continuation instead of a separate, disjointed pop-in.
  const logoSlot = line1Length
  const line2StartSlot = logoSlot + 1
  const lastSlot = line2StartSlot + line2Length - 1

  const logoDelay = logoSlot * STAGGER_STEP
  const line2BaseDelay = line2StartSlot * STAGGER_STEP
  // Moment the very last character of the headline (line 1 through the end
  // of line 2/3, mobile or desktop — same index either way, see the mobile
  // split note below) finishes its own char-in transition.
  const textFinishTime = lastSlot * STAGGER_STEP + CHAR_DURATION
  const sublineDelay = textFinishTime + SUBLINE_GAP
  // Mobile logo: waits for the full 3-line headline to finish (not just
  // line 1, like the desktop trailing-icon timing does) before it starts
  // sliding up. Same single .logo element as desktop — see the two
  // --logo-delay* custom properties below and their media-query-scoped
  // animation-delay in Hero.module.css.
  const mobileLogoDelay = textFinishTime + MOBILE_LOGO_GAP

  // Mobile splits line2 ("Designer Portfolio.") across two lines instead of
  // one — both variants render in the DOM at all times and CSS toggles
  // which is shown per breakpoint (see .headlineLineDesktop/Mobile in
  // Hero.module.css), so there's no JS viewport branching here. The mobile
  // half's baseDelay is derived from the exact character position it would
  // have had inside the single desktop string (the space between "Designer"
  // and "Portfolio." included), so the stagger rhythm lands identically
  // either way — it's the same sequence, just wrapped differently. That's
  // also why textFinishTime above (built from lastSlot) is correct for
  // both layouts without needing a separate mobile calculation: lastSlot is
  // already the shared final character position.
  const mobileSplitAt = line2Text.indexOf(' ')
  const mobileLine2a = line2Text.slice(0, mobileSplitAt)
  const mobileLine2b = line2Text.slice(mobileSplitAt + 1)
  const mobileLine2bDelay = (line2StartSlot + mobileSplitAt + 1) * STAGGER_STEP

  return (
    <section id="visual" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.headline}>
          <span className={styles.headlineLine}>
            <CharStagger text={line1Text} baseDelay={0} animate={animate} />
            {/* One element, two very different treatments: desktop/tablet
                keeps it inline right here (small, tilted, trailing the
                text — see .logo's base rules in Hero.module.css) while the
                ≤768px media query switches it to position:absolute,
                anchored below .subline instead (its containing block
                becomes .inner, the nearest positioned ancestor — .headline
                and .headlineLine in between are never given a position, so
                they're skipped). Two different animation-delays are needed
                because desktop starts it right after line 1, but mobile
                needs to wait for the full 3-line headline — passed as
                custom properties so the one CSS `animation-delay` can pick
                the right one per breakpoint (see .logo.logoAnimate). */}
            <img
              src="/logo.png"
              alt=""
              className={`${styles.logo} ${animate ? styles.logoAnimate : ''}`}
              style={
                animate
                  ? {
                      '--logo-delay': `${logoDelay}s`,
                      '--logo-delay-mobile': `${mobileLogoDelay}s`,
                    }
                  : undefined
              }
              data-cursor="hide"
            />
          </span>
          <span
            className={`${styles.headlineLine} ${styles.headlineLineDesktop}`}
          >
            <CharStagger
              text={line2Text}
              baseDelay={line2BaseDelay}
              animate={animate}
            />
          </span>
          <span
            className={`${styles.headlineLine} ${styles.headlineLineMobile}`}
          >
            <CharStagger
              text={mobileLine2a}
              baseDelay={line2BaseDelay}
              animate={animate}
            />
          </span>
          <span
            className={`${styles.headlineLine} ${styles.headlineLineMobile}`}
          >
            <CharStagger
              text={mobileLine2b}
              baseDelay={mobileLine2bDelay}
              animate={animate}
            />
          </span>
        </h1>
        <p
          className={`${styles.subline} ${
            animate ? styles.sublineAnimate : ''
          }`}
          style={animate ? { animationDelay: `${sublineDelay}s` } : undefined}
        >
          <span className={styles.accent}>기획부터 퍼블리싱까지 완성</span>
          {'하는 '}
          <br className={styles.sublineMobileBreak} />
          {'디자이너 안찬영입니다.'}
        </p>
      </div>
    </section>
  )
}
