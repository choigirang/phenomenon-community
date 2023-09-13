"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const shortid_1 = __importDefault(require("shortid"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const upload = (folder) => (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        // https://stackoverflow.com/questions/68264237/how-to-set-credentials-in-aws-sdk-v3-javascript
        // error
        s3: new client_s3_1.S3Client({
            credentials: {
                accessKeyId: s3AccessKey,
                secretAccessKey: s3SecretKey,
            },
            region: 'ap-northeast-2',
        }),
        bucket: 'choigirang-why-community',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            // id 랜덤 생성
            const fileId = shortid_1.default.generate();
            const type = file.mimetype.split('/')[1];
            const fileName = `${folder}/${fileId}.${type}`;
            cb(null, fileName);
        },
        acl: 'public-read-write',
    }),
});
exports.upload = upload;
