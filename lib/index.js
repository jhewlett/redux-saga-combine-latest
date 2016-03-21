"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCombineLatest;
function createCombineLatest(_ref) {
  var take = _ref.take;

  return regeneratorRuntime.mark(function combineLatest(actionTypes, saga) {
    var actions, action;
    return regeneratorRuntime.wrap(function combineLatest$(_context) {
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
            return take(actionTypes);

          case 4:
            action = _context.sent;

            actions[action.type] = action;

            if (!allActionsReady(actions, actionTypes)) {
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
          case "end":
            return _context.stop();
        }
      }
    }, combineLatest, this);
  });
}

function allActionsReady(actions, actionTypes) {
  return Object.keys(actions).length === actionTypes.length;
}