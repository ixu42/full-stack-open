const updateCache = (cache, queryDetails, fieldName, newItem) => {
  cache.updateQuery(queryDetails, (data) => {
    const items = data[fieldName]

    const exists = items.some((item) => item['id'] === newItem['id'])
    if (exists) return data

    return {
      [fieldName]: items.concat(newItem)
    }
  })
}

export default updateCache
