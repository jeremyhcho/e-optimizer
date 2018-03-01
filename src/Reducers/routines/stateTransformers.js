const mutate = (response, transformAction, stateKey) => {
  switch (transformAction) {
    case 'replace':
      return response

    case 'clear':
      return undefined

    case 'concat':
      return [...stateKey, response]

    case 'remove':
      return null

    case 'removeById':
      return stateKey.filter(data => data.id !== response.id)

    case 'updateByIdAndReplace':
      return stateKey.map(data => {
        if (data.id !== response.id) return data
        return response
      })

    case 'updateByIdAndChange':
      return stateKey.map(data => {
        if (data.id !== response.id) return data
        return { ...data, ...response }
      })

    default: {
      return transformAction(response)
    }
  }
}

const transform = (state, reducerKey, transformAction, loaderKey, response) => {
  if (reducerKey.length === 1) {
    const data = mutate(response, transformAction, state[reducerKey[0]])
    return {
      ...state,
      [reducerKey[0]]: data,
      isLoading: {
        ...state.isLoading,
        [loaderKey]: false
      }
    }
  }
  // Stackedkeys keeps track of the keys in STATE as it loops through the reducerKey array
  let stackedKeys = state
  for (let i = 0; i < reducerKey.length; i++) {
    if (i !== 0) {
      stackedKeys = stackedKeys[reducerKey[i - 1]]
    }

    const currentKey = reducerKey[i]

    if (i === 0) {
      Object.assign(state, {
        ...state,
        [currentKey]: { ...state[currentKey] }
      })
    } else if (i === reducerKey.length - 1) {
      const data = mutate(response, transformAction, stackedKeys[currentKey])

      Object.assign(stackedKeys, {
        ...stackedKeys,
        [currentKey]: data
      })
    } else {
      Object.assign(stackedKeys, {
        ...stackedKeys,
        [currentKey]: { ...stackedKeys[currentKey] }
      })
    }
  }

  if (transformAction === 'clear') {
    return { ...state }
  }

  if (reducerKey[0] === 'error') {
    return { ...state }
  }

  const RETURNSTATE = {
    ...state,
    isLoading: {
      ...state.isLoading,
      [loaderKey]: false
    }
  }

  return RETURNSTATE
}

export default transform
