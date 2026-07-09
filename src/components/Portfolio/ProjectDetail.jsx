import styles from './Portfolio.module.css'
import SolutionCarousel from './SolutionCarousel'

const DETAIL_FIELDS = [
  { key: 'problem', label: 'Problem' },
  { key: 'role', label: 'Role' },
  { key: 'process', label: 'Process' },
  { key: 'result', label: 'Result' },
]

export default function ProjectDetail({ project, onClose, ctaRef }) {
  const { detail } = project
  const visualSrc = detail.visual || project.image
  const hasIntro = detail.subtitle || detail.body || detail.meta

  return (
    <div className={styles.detail}>
      <button type="button" className={styles.detailClose} onClick={onClose}>
        ← 목록으로
      </button>

      {!hasIntro && (
        <div className={styles.detailHead}>
          <span className={styles.category}>{project.category}</span>
          <h2 className={styles.detailTitle}>{project.title}</h2>
        </div>
      )}

      <div className={styles.detailImage}>
        {visualSrc ? (
          <img
            src={visualSrc}
            alt={project.title}
            className={styles.thumbImage}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span className={styles.placeholderLabel}>{project.title}</span>
          </div>
        )}
      </div>

      {hasIntro && (
        <div className={styles.detailIntro}>
          {detail.subtitle && (
            <h3 className={styles.detailIntroSubtitle}>{detail.subtitle}</h3>
          )}
          {detail.body && (
            <p className={styles.detailIntroBody}>{detail.body}</p>
          )}
          {detail.meta && (
            <dl className={styles.detailMeta}>
              {detail.meta.map(({ label, value }) => (
                <div key={label} className={styles.detailMetaRow}>
                  <dt className={styles.detailMetaLabel}>{label}</dt>
                  <dd className={styles.detailMetaValue}>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {detail.sections?.map((section) => {
        const hasText = section.label || section.title || section.body
        // Supports both a plain string (falls back to section/project title
        // as alt — fine when there's only one image) and a {src, alt} object
        // (needed once a section has multiple, visually distinct images that
        // shouldn't all share the same alt text).
        const images = (
          section.images ?? [section.image]
        ).map((img) =>
          typeof img === 'string'
            ? { src: img, alt: section.title || project.title }
            : img,
        )
        return (
          <div key={section.id} className={styles.infoSection}>
            <div
              className={`${styles.infoImage} ${
                hasText ? '' : styles.infoImageOnly
              }`}
            >
              {images.map(({ src, alt }) => (
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  className={
                    section.flat ? styles.infoImgFlat : styles.infoImg
                  }
                />
              ))}
            </div>
            {hasText && (
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>{section.label}</span>
                <h3 className={styles.infoTitle}>{section.title}</h3>
                <p className={styles.infoBody}>{section.body}</p>
              </div>
            )}
          </div>
        )
      })}

      {detail.carousel && <SolutionCarousel carousel={detail.carousel} />}

      {detail.retro && (
        <div className={styles.infoSection}>
          <div className={styles.infoImage}>
            <img
              src={detail.retro.image}
              alt={detail.retro.title}
              className={styles.infoImg}
            />
          </div>
          <div className={styles.infoText}>
            <span className={styles.infoLabel}>{detail.retro.label}</span>
            <h3 className={styles.infoTitle}>{detail.retro.title}</h3>
            <p className={styles.infoBody}>{detail.retro.body}</p>
          </div>
        </div>
      )}

      {detail.cta && (
        <div className={styles.finalCta} ref={ctaRef}>
          <div className={styles.finalCtaButtons}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onClose}
            >
              목록으로 돌아가기
            </button>
            {detail.cta.webHref && (
              <a
                href={detail.cta.webHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                웹 보러가기
              </a>
            )}
          </div>
        </div>
      )}

      {!hasIntro && (
        <div className={styles.detailFields}>
          {DETAIL_FIELDS.map(({ key, label }) => (
            <div key={key} className={styles.detailField}>
              <h3 className={styles.detailFieldLabel}>{label}</h3>
              <p className={styles.detailFieldText}>{project.detail[key]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
