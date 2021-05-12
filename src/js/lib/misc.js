export const pipe = (...funcs) => argument => funcs.reduce((result, func) => func(result), argument)

export const roundTo2 = num => Math.round((num + Number.EPSILON) * 100) / 100

export const zipByIndexWith = right => (left, index) => ({ left, right: right[index] })
