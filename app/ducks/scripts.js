/*
CONSTANTS
*/
const ADD_SCRIPT = 'ADD_SCRIPT'
const DELETE_SCRIPT = 'DELETE_SCRIPT'
const EDIT_SCRIPT = 'EDIT_SCRIPT'
const EXECUTE_SCRIPT = 'EXECUTE_SCRIPT'
const EXECUTE_LABEL = 'EXECUTE_LABEL'
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
export const executeLabel = (label) => ({ type: EXECUTE_LABEL, label })
export const clearExecuted = (id) => ({ type: CLEAR_EXECUTED, id })
//  clearAllExecuted

/*
REDUCER
*/
const initialState = [{
  id: 0,
  title: 'Basic Script',
  description: 'Description Here',
  target: 'https://rykeller.com',
  executed: false
}]

//  TODO: Create an atomic function that can run stringified JS

const actionsMap = {
  [ADD_SCRIPT] (state, action) {
    return [{
      id: state.reduce((maxId, script) => Math.max(script.id, maxId), -1) + 1,
      executed: false,
      title: action.title
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
    return state.map(script =>
      (script.id === action.id
        ? Object.assign({}, script, { executed: !script.executed })
        : script
      )
    )
  },
  //  TODO: Refactor to include queries.
  [EXECUTE_LABEL] (state, action) {
    return state.map(script =>
      (script.label === action.label)
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
