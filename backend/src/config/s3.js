"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const storage = new aws_sdk_1.default.S3({
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretKey,
    region: 'ap-northeast-2',
});
exports.default = storage;
