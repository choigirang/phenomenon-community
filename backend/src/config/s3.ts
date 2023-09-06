import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;

const storage: AWS.S3 = new AWS.S3({
  accessKeyId: s3AccessKey,
  secretAccessKey: s3SecretKey,
  region: 'ap-northeast-2',
});

export default storage;
