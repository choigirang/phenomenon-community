"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    postNumber: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            author: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            commentNumber: {
                type: Number,
                unique: true,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: true,
    },
});
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
