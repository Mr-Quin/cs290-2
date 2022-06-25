import { useSandpack } from '@codesandbox/sandpack-react'
import { checkRecursion } from '../utils/checkRecursion'
import React from 'react'
import { tryToFunctions } from '../utils/toFunction'
import { useParse } from './useParse'

export const useDeepEqual = () => {
  const { sandpack } = useSandpack()
  const { files, activeFile } = sandpack
  const code = files[activeFile].code

  const parseResult = useParse(code)

  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<any>(null)
  const [recursionContext, setRecursionContext] = React.useState<any>({})

  React.useEffect(() => {
    if (parseResult.error) {
      setError(parseResult.error)
      return
    }

    const { ast } = parseResult

    const recursionResult = checkRecursion(ast!)

    setRecursionContext(recursionResult)

    const functionResults = tryToFunctions(code, ['deepEqual'])

    if (functionResults.error) {
      setError(functionResults.error)
      return
    }

    const [deepEqual] = functionResults.result!

    if (typeof deepEqual !== 'function') {
      setError('not a function')
      return
    }

    setError(null)
    setResult(() => deepEqual)
  }, [parseResult])

  return [error, result, recursionContext] as const
}
