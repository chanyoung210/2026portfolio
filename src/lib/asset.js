export function asset(path) {
  if (!path || /^(https?:)?\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
