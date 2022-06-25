export const toFunctions = (code: string, fns: string[]) => {
  return fns.map((fnName) => {
    // eslint-disable-next-line no-new-func
    const fn = new Function(code + `\nreturn ${fnName}`)
    return fn()
  })
}

export const tryToFunctions = (code: string, fns: string[]) => {
  try {
    return { error: null, result: toFunctions(code, fns) } as const
  } catch (e: any) {
    return { error: e.message, result: null } as const
  }
}
