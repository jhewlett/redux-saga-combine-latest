import chai, { expect } from 'chai'
import combineLatest from '../src/index.js'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { put } from 'redux-saga/effects'

chai.use(sinonChai);

const spy = sinon.spy()
function* handleActions(actions) {
  spy(actions)
}

function* saga() {
  yield* combineLatest(['type1', 'type2'], handleActions)
}

const sagaMiddleware = createSagaMiddleware(saga)

const store = createStore(
  (state) => state,
  applyMiddleware(sagaMiddleware)
)

describe('combineLatest', () => {
  const action1 = { type: 'type1', some: 'payload' }
  const action2 = { type: 'type2', some: 'payload' }
  const action3 = { type: 'type2', other: 'payload' }

  describe('when only one action type has been dispatched', () => {
    it('should not yield saga yet', () => {
      store.dispatch(action1)
      expect(spy).not.to.be.called
    })
  })

  describe('when all action types have been dispatched', () => {
    it('should yield saga with all actions', () => {
      store.dispatch(action2)
      expect(spy).to.be.calledWith([action1, action2])
    })
  })

  describe('when a third action is dispatched', () => {
    it('should yield saga with latest actions of each type', () => {
      store.dispatch(action3)
      expect(spy).to.be.calledWith([action1, action3])
    })
  })
})
