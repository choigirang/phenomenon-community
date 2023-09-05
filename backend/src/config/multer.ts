import multer from 'multer';
import multerS3 from 'multer-s3';
import shortId from 'shortid';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;

export const upload = multer({
  storage: multerS3({
    // https://stackoverflow.com/questions/68264237/how-to-set-credentials-in-aws-sdk-v3-javascript
    // error
    s3: new S3Client({
      credentials: {
        accessKeyId: s3AccessKey as string,
        secretAccessKey: s3SecretKey as string,
      },
      region: 'ap-northeast-2',
    }),
    bucket: 'choigirang-why-community', // 객체를 업로드할 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file: Express.MulterS3.File, cb) {
      // id 랜덤 생성
      const fileId = shortId.generate();
      const type = file.mimetype.split('/')[1];
      const fileName = `${fileId}.${type}`;
      cb(null, fileName);
    },
    acl: 'public-read-write',
  }),
});
