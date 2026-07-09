import styles from './Portfolio.module.css'

function ProjectImage({ image, label }) {
  if (image) {
    return <img src={image} alt={label} className={styles.thumbImage} />
  }
  return (
    <div className={styles.placeholderImage}>
      <span className={styles.placeholderLabel}>{label}</span>
    </div>
  )
}

function MainCard({ project, onOpen }) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.thumb}>
        <ProjectImage image={project.image} label={project.title} />
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
      </div>
    </button>
  )
}

function SubCard({ project, onOpen }) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.subThumb}>
        <ProjectImage image={project.image} label={project.title} />
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
      </div>
    </button>
  )
}

export default function ProjectCard({ project, onOpen }) {
  if (project.type === 'main') {
    return <MainCard project={project} onOpen={onOpen} />
  }
  return <SubCard project={project} onOpen={onOpen} />
}
