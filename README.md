# PAYMENTS SERVICE
This is a microservice designed to recieved and store new payment orders in a dynamoDB database using AWS lambda as a serverless execution environment

## UP TO 100K USER
The application will work thanks to 5 key pieces:
1. BFF = This service is going to be responsible to feed frontend (what user sees)
2. Cognito = This aws service is going to handle authorization in a secure way
3. SQS New Payments = This Queue is going to handle events for new payments this service is going to be trigger every new subscription request
4. Payment Service Lambda = Here is where new subscriptions are going to be insert
5. DynamoBD Payments = In this database is where payments are going to be store
6. AWS Renew Payments = This lambda is going to be run every 120 seconds seeking for some expiring payments to renew
![image](https://github.com/user-attachments/assets/f5d19404-94da-42ab-b391-c8962d9ea80c)

