"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// verify that sent id is a valid number
// this middleware assumes that a request will have EITHER a body id OR a params id
// NOT BOTH
const verifyValidId = (req, res, next) => {
    const id = req.body.id;
    if (isNaN(id) && isNaN(parseInt(req.params.id))) {
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
};
exports.default = verifyValidId;
