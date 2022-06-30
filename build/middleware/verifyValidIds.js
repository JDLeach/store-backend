"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyValidParamId = exports.verifyValidBodyId = void 0;
// verify that sent id is a valid number
// this middleware assumes that a request will have EITHER a body id OR a params id
// NOT BOTH
const verifyValidBodyId = (req, res, next) => {
    const id = req.body.id;
    if (isNaN(id)) {
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
};
exports.verifyValidBodyId = verifyValidBodyId;
const verifyValidParamId = (req, res, next) => {
    const id = req.params.id;
    if (isNaN(parseInt(id))) {
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
};
exports.verifyValidParamId = verifyValidParamId;
