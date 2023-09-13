"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRouter = void 0;
const express_1 = __importDefault(require("express"));
const notice_controller_1 = require("../controllers/notice.controller");
exports.noticeRouter = express_1.default.Router();
/** 공지사항 전체 조회 */
exports.noticeRouter.get('/notice', notice_controller_1.showNotice);
/** 공지사항 개별 조회*/
exports.noticeRouter.get('/notice/:id', notice_controller_1.eachNotice);
/** 공지사항 추가 */
exports.noticeRouter.post('/notice', notice_controller_1.addNotice);
