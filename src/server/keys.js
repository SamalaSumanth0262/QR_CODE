var config = require("config");
//app configs
const HTTP_PORT = process.env.HTTP_PORT || config.get("app.port");

// mongoDBurl defines here..
const MONGODB_URL = process.env.MONGODB_URL || config.get("mongo_db_url");

//Cognito User
const USER_POOL_ID =
  process.env.COGNITO_USERPOOLID || config.get("aws.cognito.userPoolId");
const POOL_REGION =
  process.env.COGNITO_POOLREGION || config.get("aws.cognito.poolRegion");
const CLIENT_ID =
  process.env.COGNITO_CLIENTID || config.get("aws.cognito.clientId");
const COGNITO_DOMAIN =
  process.env.COGNITO_DOMAIN || config.get("aws.cognito.domain");

//IAM
const IAM_CONFIG = {
  secretAccessKey:
    process.env.IAM_SECRETACCESSKEY || config.get("aws.iam.secretAccessKey"),
  accessKeyId: process.env.IAM_ACCESSKEYID || config.get("aws.iam.accessKeyId"),
  region: process.env.IAM_REGION || config.get("aws.iam.region")
};
const SES_IAM_CONFIG = {
  secretAccessKey:
    process.env.SES_IAM_SECRETACCESSKEY ||
    config.get("aws.ses_iam.secretAccessKey"),
  accessKeyId:
    process.env.SES_IAM_ACCESSKEYID || config.get("aws.ses_iam.accessKeyId"),
  region: process.env.SES_IAM_REGION || config.get("aws.ses_iam.region")
};

//SES IAM

// s3
const S3_BUCKETNAME =
  process.env.S3_BUCKETNAME || config.get("aws.s3.bucketName");

// ses
const FROM_ADDRESS_EMAIL =
  process.env.FROM_ADDRESS_EMAIL || "contact@letsxchange.com";
const FROM_ADDRESS = `Suamnth<${FROM_ADDRESS_EMAIL}>`;

//new relic key
const NEW_RELIC_KEY = config.get("new_relic_key") || process.env.NEW_RELIC_KEY;

const TWILIO_ACCOUNT_SID =
  process.env.TWILIO_ACCOUNT_SID || config.get("twilio_account_sid");

const TWILIO_API_KEY =
  process.env.TWILIO_API_KEY || config.get("twilio_api_key");

const TWILIO_API_SECRET =
  process.env.TWILIO_API_SECRET || config.get("twilio_api_secret");

const NODE_ENV = "DEV"; //TO_DO : Hard Coded..

module.exports = {
  MONGODB_URL,
  HTTP_PORT,
  USER_POOL_ID,
  POOL_REGION,
  CLIENT_ID,
  COGNITO_DOMAIN,
  IAM_CONFIG,
  S3_BUCKETNAME,
  SES_IAM_CONFIG,
  FROM_ADDRESS,
  NEW_RELIC_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  NODE_ENV
};
