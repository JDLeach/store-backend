"use strict";
exports.__esModule = true;
// verify that sent id is a valid number
// this middleware assumes that a request will have EITHER a body id OR a params id
// NOT BOTH
var verifyValidId = function (req, res, next) {
    var id = req.body.id;
    if (isNaN(id) && isNaN(parseInt(req.params.id))) {
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
};
exports["default"] = verifyValidId;
