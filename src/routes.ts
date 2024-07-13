import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";


const app = express();
app.use(bodyParser.json());
const client = DynamoDBDocument.from(new DynamoDB({ region: 'us-east-1'}));


interface Payment {
  paymentId: string;
  bitsUserID: string;
  paymentTimestamp: string;
  paymentDescription: string;
  currency: string;
  amount: number;
}

app.post('/payments',async (req: Request, res: Response) => {
  const { bitsUserID, paymentDescription, currency, amount } = req.body;

  if (!bitsUserID || !paymentDescription || !currency || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const payment: Payment = {
    paymentId: uuidv4(),
    bitsUserID,
    paymentTimestamp: new Date().toISOString(),
    paymentDescription,
    currency,
    amount,
  };
await client.put({
    TableName: 'Payments',
    Item: payment,
  });
  res.status(201).json(payment);
});

export default app;