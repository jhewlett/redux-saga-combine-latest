import chai, { expect } from 'chai'
import combineLatest from '../src/index.js'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { put } from 'redux-saga/effects'

chai.use(sinonChai);

const spy = sinon.spy()

function cb(actions) {
  spy(actions)
}

const saga = combineLatest(['type1', 'type2'], cb)
const sagaMiddleware = createSagaMiddleware(saga)

const store = createStore(
  (state) => state,
  applyMiddleware(sagaMiddleware)
)

describe('combineLatest', () => {
  it('should yield callback with latest action of each type', () => {
    const action1 = { type: 'type1', some: 'payload' }
    const action2 = { type: 'type2', some: 'payload'}

    store.dispatch(action1)
    expect(spy).not.to.be.called

    store.dispatch(action2)
    expect(spy).to.be.calledWith([action1, action2])

    const action3 = { type: 'type2', other: 'payload' }
    store.dispatch(action3)
    expect(spy).to.be.calledWith([action1, action3])
  })
})
