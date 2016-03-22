###Install

`npm install --save redux-saga-combine-latest`

###Usage

```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as effects from 'redux-saga/effects'
import 'babel-polyfill'

import createCombineLatest from 'redux-saga-combine-latest'

const combineLatest = createCombineLatest(effects)

function* handleActions(actions) {
  console.log(actions)
}

function* saga() {
  yield combineLatest(['type1', 'type2'], handleActions)
}

const sagaMiddleware = createSagaMiddleware(saga)

const store = createStore(
  (state) => state,
  applyMiddleware(sagaMiddleware)
)

store.dispatch({ type: 'type1', some: 'payload' })  //nothing logged
store.dispatch({ type: 'type2', some: 'payload' })  //logs out "[{ type: 'type1', some: 'payload' }, { type: 'type2', some: 'payload' }]"
store.dispatch({ type: 'type2', other: 'payload' })  //logs out "[{ type: 'type1', some: 'payload' }, { type: 'type2', other: 'payload' }]"
```

Notice that the handler saga does not get invoked until at least one action of each type as been received. From that point on, each time a new action is received that we care about, the handler is invoked with the latest action of each type.
