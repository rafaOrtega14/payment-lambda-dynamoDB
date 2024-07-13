provider "aws" {
  region = "us-east-1"
}
resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "Payments"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "paymentId"

  attribute {
    name = "paymentId"
    type = "S"
  }

  ttl {
    attribute_name = "paymentTimestamp"
    enabled        = true
  }

  tags = {
    Name        = "payments"
    Environment = "production"
  }
}