const parse = (body) => {
  let parsed = undefined

  try {
    parsed = JSON.parse(body)
  } catch (error) {}

  if (parsed) {
    return parsed
  }

  try {
    parsed = JSON.parse(
      '{"' +
        decodeURI(body)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
  } catch (error) {}

  if (parsed) {
    return parsed
  }

  return body
}

const formatURL = (url) => {
  return url
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
}

module.exports = { parse, formatURL }
