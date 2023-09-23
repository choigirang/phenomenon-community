"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_router_1 = require("./routes/users.router");
const post_router_1 = require("./routes/post.router");
const my_router_1 = require("./routes/my.router");
const notice_router_1 = require("./routes/notice.router");
const gallery_router_1 = require("./routes/gallery.router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = process.env.SERVER_NAME;
const password = process.env.SERVER_PASS;
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(users_router_1.usersRouter, post_router_1.postRouter, my_router_1.myRouter, notice_router_1.noticeRouter, gallery_router_1.galleryRouter);
app.listen(port);
// mongoDB 연결
mongoose_1.default
    .connect(`mongodb+srv://${server}:${password}@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('connected successfully'))
    .catch((err) => console.log(err));
