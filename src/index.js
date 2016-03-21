export default function createCombineLatest({take}) {
  return function* combineLatest(actionTypes, saga) {
    let actions = {}
    while (true) {
      const action = yield take(actionTypes)
      actions[action.type] = action

      if (allActionsReady(actions, actionTypes))
        yield saga(actionTypes.map(t => actions[t]))
    }
  }
}

function allActionsReady(actions, actionTypes) {
  return Object.keys(actions).length === actionTypes.length
}
