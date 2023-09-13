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
exports.refreshToken = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 토큰 만료 시 재발급
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.refreshToken;
        const user = yield users_model_1.default.findOne({ refreshToken });
        if (!user)
            return res.status(403).send('유저가 일치하지 않습니다.');
        if (!refreshToken)
            return res.status(400).send('토큰이 유효하지 않습니다.');
        jsonwebtoken_1.default.verify(refreshToken, 'superrefresh', (err) => {
            if (err)
                return res.status(403).send('유효하지 않은 접근입니다.');
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, 'super_secret');
            res.cookie('token', accessToken, { httpOnly: true });
        });
    });
}
exports.refreshToken = refreshToken;
