"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gallerySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    galleryNumber: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    images: [
        {
            src: {
                type: String,
            },
        },
    ],
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
});
const Gallery = mongoose_1.default.model('Gallery', gallerySchema);
exports.default = Gallery;
