'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineLatest;

require('babel-polyfill');

var _effects = require('redux-saga/effects');

function combineLatest(actionTypes, saga) {
  return regeneratorRuntime.mark(function _callee() {
    var actions, action;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actions = {};

          case 1:
            if (!true) {
              _context.next = 11;
              break;
            }

            _context.next = 4;
            return (0, _effects.take)(actionTypes);

          case 4:
            action = _context.sent;

            actions[action.type] = action;

            if (!(Object.keys(actions).length === actionTypes.length)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return saga(actionTypes.map(function (t) {
              return actions[t];
            }));

          case 9:
            _context.next = 1;
            break;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
}