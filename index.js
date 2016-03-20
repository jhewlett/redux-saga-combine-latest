import 'babel-polyfill'
import { take } from 'redux-saga/effects'

export default function combineLatest(actionTypes, saga) {
  return function* () {
    let actions = {}
    while (true) {
      const action = yield take(actionTypes)
      actions[action.type] = action

      if (Object.keys(actions).length === actionTypes.length)
        yield saga(actionTypes.map(t => actions[t]))
    }
  }
}
