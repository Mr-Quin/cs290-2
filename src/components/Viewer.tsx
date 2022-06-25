import React from 'react'
import TestResultRow from './TestResultRow'
import { useDeepEqual } from '../hooks/useDeepEqual'
import { testRunner } from '../test/state'
import { runTests } from '../test/tests'

const Viewer = () => {
  const [err, deepEqual, recursionContext] = useDeepEqual()

  const [, startTransition] = React.useTransition()
  const [testResults, setTestResults] = React.useState<any[]>([])

  React.useEffect(() => {
    if (err) return
    startTransition(() => {
      testRunner.reset()
      runTests(deepEqual, 'deepEqual', recursionContext)
      setTestResults(testRunner.state.results)
    })
  }, [deepEqual])

  if (err) {
    return <pre>{err}</pre>
  }

  return (
    <>
      {testResults.map((testResult) => (
        <TestResultRow testResult={testResult} key={testResult.name} />
      ))}
    </>
  )

  // return <pre>{JSON.stringify(testRunner.state, null, 2)}</pre>
}

export default Viewer
