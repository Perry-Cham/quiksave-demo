"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModelKeys = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.default.Schema({
    name: String,
    price: Number,
    image: String,
    imageId: String,
    subcategory: String
});
var Beef = mongoose_1.default.models.Beef || mongoose_1.default.model("Beef", schema, "Beef");
var Chicken = mongoose_1.default.models.Chicken || mongoose_1.default.model("Chicken", schema, "Chicken");
var Pork = mongoose_1.default.models.Pork || mongoose_1.default.model("Pork", schema, "Pork");
var Processed = mongoose_1.default.models.Processed || mongoose_1.default.model("Processed", schema, "Processed");
var Products = {
    beef: Beef,
    chicken: Chicken,
    pork: Pork,
    processed: Processed
};
exports.ProductModelKeys = Object.keys(Products);
exports.default = Products;
