import styles from './Portfolio.module.css'
import { asset } from '../../lib/asset'

// Abbreviated labels for this strip only — the canonical project.title
// (used everywhere else: cards, detail headers) stays full-length. Pokemon
// and NPS both collapse to "프로모션" on purpose, per design direction —
// their thumbnails disambiguate them.
const SHORT_LABELS = {
  'aiweb-redesign': '웹 리뉴얼',
  'tourbus-service': 'UX/UI디자인',
  'chaeknamu-ai-guide': '플랫폼 디자인',
  'receipt-process': '프로세스 효율화',
  'promotion-pokemon-megaweek': '프로모션',
  'promotion-nps-proposal': '프로모션',
  'songdo-beer-festival': '웹 디자인',
  'gpt-korea-design': '웹 디자인',
}

export default function RelatedProjects({ projects, visible, onSelect }) {
  return (
    <div
      className={`${styles.relatedStrip} ${
        visible ? styles.relatedStripVisible : ''
      }`}
    >
      <div className={styles.relatedStripInner}>
        <ul className={styles.relatedList}>
          {projects.map((project) => (
            <li key={project.id} className={styles.relatedListItem}>
              <button
                type="button"
                className={styles.relatedItem}
                onClick={() => onSelect(project.id)}
              >
                <span className={styles.relatedThumb}>
                  {project.image ? (
                    <img
                      src={asset(project.image)}
                      alt={project.title}
                      className={styles.relatedThumbImg}
                    />
                  ) : (
                    <span className={styles.relatedThumbPlaceholder}>
                      {project.title}
                    </span>
                  )}
                </span>
                <span className={styles.relatedTitle}>
                  {SHORT_LABELS[project.id] ?? project.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
