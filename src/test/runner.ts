import { testRunner } from './state'

const testState = testRunner.state

// mimic the Jest describe function
export const describe = (name: string, callback: () => any) => {
  testState.stack.push(name)
  testState.current = name
  callback()
  testState.stack.pop()
  testState.current = testState.stack[testState.stack.length - 1]
}

export const test = (name: string, callback: () => any) => {
  const stack = testState.stack.join('.')
  const fullName = `${stack}.${name}`

  let passed = false
  let error: any = null
  try {
    callback()
    passed = true
  } catch (e) {
    error = e
  }

  testState.results.push({
    name,
    fullName,
    stack: testState.stack,
    passed,
    error,
  })
}

export const expect = (value: any) => {
  return {
    toBe: (expected: any) => {
      if (!Object.is(value, expected)) {
        throw new Error(`Expected ${value} to be ${expected}`)
      }
    },
  }
}
