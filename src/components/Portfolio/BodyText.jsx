import styles from './Portfolio.module.css'

// `text` is either a plain string (renders as-is, wraps naturally at every
// breakpoint) or an array of line strings — joined with a <br> that's only
// visible above 1024px (see .pcBreak), so PC gets the manually chosen break
// points while tablet/mobile fall back to natural wrapping.
export default function BodyText({ text, className }) {
  if (Array.isArray(text)) {
    return (
      <p className={className}>
        {text.map((line, i) => (
          <span key={i}>
            {line}
            {i < text.length - 1 && <br className={styles.pcBreak} />}
          </span>
        ))}
      </p>
    )
  }
  return <p className={className}>{text}</p>
}
