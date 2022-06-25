export type TestResult = {
  name: string
  fullName: string
  stack: string[]
  passed: boolean
  error: any
}

export type TestState = {
  stack: string[]
  current: string | null
  results: TestResult[]
}

export type TestRunner = {
  state: TestState
  reset: () => void
}

const makeTestState = (): TestRunner => {
  const state = {
    stack: [],
    current: null,
    results: [],
  }
  return {
    state,
    reset: () => {
      state.stack = []
      state.current = null
      state.results = []
    },
  }
}

export const testRunner = makeTestState()
