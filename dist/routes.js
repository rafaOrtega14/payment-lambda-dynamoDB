"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const body_parser_1 = __importDefault(require("body-parser"));
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const client = lib_dynamodb_1.DynamoDBDocument.from(new client_dynamodb_1.DynamoDB({ region: 'us-east-1' }));
app.post('/payments', async (req, res) => {
    const { bitsUserID, paymentDescription, currency, amount } = req.body;
    if (!bitsUserID || !paymentDescription || !currency || !amount) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const payment = {
        paymentId: (0, uuid_1.v4)(),
        bitsUserID,
        paymentTimestamp: new Date().toISOString(),
        paymentDescription,
        currency,
        amount,
    };
    try {
        await client.put({
            TableName: 'Payments',
            Item: payment,
        });
        res.status(201).json(payment);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
exports.default = app;
