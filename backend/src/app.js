"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var dotenv_1 = require("dotenv");
var users_router_1 = require("./routes/users.router");
var post_router_1 = require("./routes/post.router");
var my_router_1 = require("./routes/my.router");
var notice_router_1 = require("./routes/notice.router");
var gallery_router_1 = require("./routes/gallery.router");
dotenv_1.default.config();
var server = process.env.SERVER_NAME;
var password = process.env.SERVER_PASS;
var app = (0, express_1.default)();
var port = 8080;
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(users_router_1.usersRouter, post_router_1.postRouter, my_router_1.myRouter, notice_router_1.noticeRouter, gallery_router_1.galleryRouter);
app.listen(port);
// mongoDB 연결
mongoose_1.default
    .connect("mongodb+srv://".concat(server, ":").concat(password, "@phenomenon-community.zyo8dzo.mongodb.net/?retryWrites=true&w=majority"))
    .then(function () { return console.log('connected successfully'); })
    .catch(function (err) { return console.log(err); });
