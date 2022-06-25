import * as walk from 'acorn-walk'
import * as acorn from 'acorn'

const isVariableDeclarationFunction = (node: any) => {
  const initType = node?.declarations[0]?.init?.type
  return (
    initType === 'ArrowFunctionExpression' || initType === 'FunctionExpression'
  )
}

export type CheckRecursionResult = {
  fns: Set<string>
  recursiveFns: Set<string>
}

// check if code contains a recursive call
export const checkRecursion = (ast: acorn.Node): CheckRecursionResult => {
  const state = {
    recursiveFns: new Set<string>(),
    fns: new Set<string>(),
  }

  walk.fullAncestor(
    ast,
    (node: any, state: any, ancestors) => {
      // console.log(node, ancestors)
      switch (node.type) {
        case 'FunctionDeclaration':
          state.fns.add(node.id.name)
          break
        case 'VariableDeclaration':
          if (isVariableDeclarationFunction(node)) {
            state.fns.add(node.declarations[0].id.name)
          }
          break
        case 'CallExpression':
          if (node.callee.type === 'Identifier') {
            ancestors.forEach((ancestor: any) => {
              switch (ancestor.type) {
                case 'FunctionDeclaration':
                  if (ancestor.id.name === node.callee.name) {
                    state.recursiveFns.add(state.currentFunction)
                  }
                  break
                case 'VariableDeclaration':
                  if (
                    isVariableDeclarationFunction(ancestor) &&
                    ancestor.declarations[0].id.name === node.callee.name
                  ) {
                    state.recursiveFns.add(state.currentFunction)
                  }
                  break
                default:
                  break
              }
            })
          }
          break
        default:
          break
      }
    },
    undefined,
    state
  )

  return state
}
