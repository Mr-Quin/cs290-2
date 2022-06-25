import React from 'react'
import { tryParse } from '../utils/parse'

export const useParse = (code: string) => {
  const [result, setResult] = React.useState<ReturnType<typeof tryParse>>(
    tryParse(code)
  )

  React.useEffect(() => {
    setResult(tryParse(code))
  }, [code])

  return result
}
