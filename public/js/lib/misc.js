const pipe = (...funcs) => argument => funcs.reduce((result, func) => func(result), argument)

const roundTo2 = num => Math.round((num + Number.EPSILON) * 100) / 100

const zipByIndexWith = right => (left, index) => ({ left, right: right[index] })
