"use strict";
exports.__esModule = true;
exports.verifyValidParamId = exports.verifyValidBodyId = void 0;
// verify that sent id is a valid number
// this middleware assumes that a request will have EITHER a body id OR a params id
// NOT BOTH
var verifyValidBodyId = function (req, res, next) {
    var id = req.body.id;
    if (isNaN(id)) {
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
};
exports.verifyValidBodyId = verifyValidBodyId;
var verifyValidParamId = function (req, res, next) {
    var id = req.params.id;
    if (isNaN(parseInt(id))) {
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
};
exports.verifyValidParamId = verifyValidParamId;
