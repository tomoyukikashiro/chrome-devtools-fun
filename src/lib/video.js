import slugify from "slugify"

export const slug = str => {
  return slugify(str, { lower: true })
}

export const getVideoByHash = hash => {
  const _hash = hash ? hash.substring(1) : ""
  if (!_hash) return null
  const name = slug(_hash)
  if (!name) return null
  return document.querySelector(`[data-name=${name}]`)
}
