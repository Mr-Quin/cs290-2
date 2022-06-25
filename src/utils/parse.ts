import * as acorn from 'acorn'

export const mustParse = (code: string) => {
  try {
    return acorn.parse(code, { ecmaVersion: 2020 })
  } catch (e) {
    try {
      return acorn.parse(code, {
        ecmaVersion: 2020,
        sourceType: 'module',
      })
    } catch (e2) {
      throw e
    }
  }
}

export const tryParse = (code: string) => {
  try {
    return { error: null, ast: mustParse(code) } as const
  } catch (e: any) {
    return { error: e.message, ast: null } as const
  }
}
