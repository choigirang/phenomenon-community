"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        require: true,
    },
    refreshToken: {
        type: String,
    },
    super: {
        type: Boolean,
    },
    postLikes: [
        {
            author: {
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
            postNumber: {
                type: Number,
                required: true,
            },
        },
    ],
    galleryLikes: [
        {
            author: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            galleryNumber: {
                type: Number,
                required: true,
            },
        },
    ],
});
userSchema.methods.comparePassword = function (password) {
    return password === this.password;
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
