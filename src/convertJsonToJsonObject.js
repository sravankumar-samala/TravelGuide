function convertKeysToCamelCase(key) {
  if (key.includes('_')) {
    return key.replace(/_./g, match => match.charAt(1).toUpperCase())
  }
  return key
}

export default function convertJsonToJSObj(data) {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  if (Array.isArray(data)) {
    return data.map(item => convertJsonToJSObj(item))
  }

  const newObject = {}

  Object.entries(data).forEach(([key, value]) => {
    const newKey = convertKeysToCamelCase(key)
    newObject[newKey] = convertJsonToJSObj(value)
  })

  return newObject
}
