export const presence = (value, form, input, name) => (
  value ? null : `${name[0].toUpperCase() + name.substr(1)} is required`
)

export const minChar = (length) => (value, form, input, name) => (
  value && value.length < length ? `${name[0].toUpperCase() + name.substr(1)} must be ${length} characters or more` : null
)

export const maxChar = (length) => (value, form, input, name) => (
  value && value.length > length ? `${name[0].toUpperCase() + name.substr(1)} cannot be greater than ${length} characters` : null
)

export const email = (value) => {
  const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRe.test(value)) return null
  return 'Please enter a valid email address'
}

export const equality = (inputName) => (value, form) => {
  // equality takes in the name(string) of an input
  if (form[inputName] === value) return null
  return `${inputName[0].toUpperCase() + inputName.substr(1)}s do not match`
}

export const match = (matchValue) => (value, form, input, name) => {
  if (matchValue === value) {
    return null
  }
  return `${name[0].toUpperCase() + name.substr(1)}s do not match`
}

export const minWord = (length) => (value, form, input, name) => {
  const words = value.split(' ')
  if (words.length >= length && words.every(word => word.length)) return null
  return `${name[0].toUpperCase() + name.substr(1)} must be ${length} words or more`
}

export const zipCode = (value) => {
  const usZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  return usZipCode.test(value) ? null : 'Not a valid zip code'
}
