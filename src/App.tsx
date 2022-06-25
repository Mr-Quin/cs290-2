import React from 'react'
import './App.css'
import Viewer from './components/Viewer'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
  SandpackStack,
} from '@codesandbox/sandpack-react'

const DEEP_EQUAL_CODE = `// paste your deepEqual code here
// exclude use-strict and export statements
function deepEqual(val1, val2) {
    return true
}`

function App() {
  return (
    <div className="App">
      <SandpackProvider
        theme={'dark'}
        files={{
          '/deepEqual.js': {
            code: DEEP_EQUAL_CODE,
          },
        }}
        customSetup={{
          entry: '/deepEqual.js',
          dependencies: {},
        }}
        options={{
          classes: {
            'sp-layout': 'custom-layout',
            'sp-stack': 'custom-stack',
          },
        }}
      >
        <SandpackLayout>
          <SandpackStack>
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              showInlineErrors
              wrapContent
              showReadOnly
            />
          </SandpackStack>
          <SandpackStack>
            <Viewer />
          </SandpackStack>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}

export default App
