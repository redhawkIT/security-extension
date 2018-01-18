import cuid from 'cuid'
/*
CORE SCRIPTS
These are scripts built into the extension that can be automatically executed
*/
import { findComments, getBoundFunctions, getGlobalState, getInlineValues, revealHiddenElements } from '../core/scripts'

/*
CONSTANTS
*/
const ADD_SCRIPT = 'ADD_SCRIPT'
const DELETE_SCRIPT = 'DELETE_SCRIPT'
const EDIT_SCRIPT = 'EDIT_SCRIPT'
const EXECUTE_SCRIPT = 'EXECUTE_SCRIPT'
const EXECUTE_GROUP = 'EXECUTE_GROUP'
const CLEAR_EXECUTED = 'CLEAR_EXECUTED'
//  Legacy
export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_EXECUTED = 'SHOW_EXECUTED'
export const SHOW_ACTIVE = 'SHOW_ACTIVE'

/*
ACTIONS
*/
export const addScript = (title) => ({ type: ADD_SCRIPT, title })
export const deleteScript = (id) => ({ type: DELETE_SCRIPT, id })
export const editScript = (id, title) => ({ type: EDIT_SCRIPT, id, title })
export const executeScript = (id) => ({ type: EXECUTE_SCRIPT, id })
export const executeGroup = (group) => ({ type: EXECUTE_GROUP, group })
export const clearExecuted = (id) => ({ type: CLEAR_EXECUTED, id })
//  clearAllExecuted

/*
Middlewares
*/
//  https://stackoverflow.com/questions/4532236/how-to-access-the-webpage-dom-rather-than-the-extension-page-dom
//  TODO: Turn this into a thunk
function EXECUTE (code) {
  let results = []
  chrome.tabs.executeScript(
    { code: `(function(params) { ${code} })();` },
    (output) => {
      // console.warn('SECURITY EXTENSION OUTPUT:', output)
      results.push(output[0] || output || null)
      return output
    }
  )
  return results
}

/*
REDUCER
*/
const initialState = [
  {
    id: cuid(),
    group: 'Inspection',
    title: 'Get Global State',
    description: 'Description Here',
    body: eval(getGlobalState),
    executed: false,
    output: ''
  }, {
    id: cuid(),
    group: 'Inspection',
    title: 'Get Inline Form Values',
    description: 'Description Here',
    body: eval(getInlineValues),
    executed: false,
    output: ''
  }, {
    id: cuid(),
    group: 'Inspection',
    title: 'Get Bound Functions',
    description: 'Description Here',
    body: eval(getBoundFunctions),
    executed: false,
    output: ''
  }, {
    id: cuid(),
    group: 'Static Analysis',
    title: 'Find Inline Comments',
    description: 'Description Here',
    body: eval(findComments),
    executed: false,
    output: ''
  }, {
    id: cuid(),
    group: 'Document Manipulation',
    title: 'Reveal Hidden Elements',
    description: 'Description Here',
    body: eval(revealHiddenElements),
    executed: false,
    output: ''
  }
]

const actionsMap = {
  [ADD_SCRIPT] (state, action) {
    return [{
      id: cuid(),
      group: 'Uncategorized',
      title: action.title,
      description: action.description,
      body: eval(action.body),
      executed: false,
      output: ''
    }, ...state]
  },
  [DELETE_SCRIPT] (state, action) {
    return state.filter(script => script.id !== action.id)
  },
  [EDIT_SCRIPT] (state, action) {
    return state.map(script =>
      (script.id === action.id
        ? Object.assign({}, script, { title: action.title })
        : script
      )
    )
  },
  [EXECUTE_SCRIPT] (state, action) {
    return state.map(script => {
      if (script.id === action.id) {
        console.warn('EXECUTE_SCRIPT in', script.title, script.id)
        const output = EXECUTE('return document.body.innerHTML;')
        console.log('EXECUTE_SCRIPT out', output)
        return Object.assign({}, script, { executed: true, output })
      } else {
        return script
      }
    })
  },
  //  TODO: Refactor to include queries.
  [EXECUTE_GROUP] (state, action) {
    return state.map(script =>
      (script.group === action.group)
        ? Object.assign({}, script, { executed: !script.executed })
        : script
    )
  },
  [CLEAR_EXECUTED] (state/*, action */) {
    return state.map(script =>
      Object.assign({}, script, { executed: false })
    )
  }
}

export default function scripts (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
