import React from 'react'
import type { TestResult } from '../test/state'

type Props = {
  testResult: TestResult
}

enum Icon {
  passed = '✅',
  failed = '❌',
}

const TestError = ({ testResult }: Props) => {
  if (testResult.error) {
    return (
      <pre
        style={{
          color: '#CF6679',
        }}
      >
        {testResult.error.message}
      </pre>
    )
  }
  return null
}

export const TestResultRow = ({ testResult }: Props) => {
  const { passed, name } = testResult

  return (
    <div
      style={{
        display: 'flex',
        padding: '8px',
        fontSize: '14px',
      }}
    >
      {passed ? <span>{Icon.passed}</span> : <span>{Icon.failed}</span>}
      <span>{name}</span>
      <TestError testResult={testResult} />
    </div>
  )
}

export default TestResultRow
