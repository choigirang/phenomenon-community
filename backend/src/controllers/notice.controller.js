"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotice = exports.eachNotice = exports.showNotice = void 0;
const notice_model_1 = __importDefault(require("../models/notice.model"));
/** 공지사항 목록 */
function showNotice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allNotice = yield notice_model_1.default.find();
        try {
            return res.status(200).send(allNotice);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.showNotice = showNotice;
/** 공지사항 개별 조회 */
function eachNotice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const notice = yield notice_model_1.default.findOne({ noticeNumber: id });
        try {
            return res.status(200).send(notice);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.eachNotice = eachNotice;
/** 권한 계정에 따른 공지사항 추가 */
function addNotice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, content, date } = req.body;
        try {
            const noticeNumber = yield notice_model_1.default.countDocuments();
            const createdPost = new notice_model_1.default({
                noticeNumber: noticeNumber + 1,
                title,
                content,
                date,
            });
            yield createdPost.save();
            return res.status(200).json('성공');
        }
        catch (err) {
            console.log(err);
            return res.status(404);
        }
    });
}
exports.addNotice = addNotice;
