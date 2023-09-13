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
exports.showUserComments = exports.showUserPosts = void 0;
const posts_model_1 = __importDefault(require("../models/posts.model"));
/** 유저가 작성한 데이터 res */
// export async function userAllData(req: Request, res: Response) {
//   const user = req.params.user;
//   try {
//     const userPosts = await Post.find({ author: user });
//     // 해당 user가 작성한 모든 포스트의 comments에서 해당 user의 데이터 가져오기
//     const userComments = await Post.find({ 'comments.author': user });
//     const userAllComments: CommentData[] = [];
//     // 유저가 작성한 댓글 데이터
//     const allPosts = await Post.find();
//     allPosts.forEach(post => {
//       post.comments.forEach(comment => {
//         if (comment.author === user) {
//           userAllComments.unshift({
//             postNumber: post.postNumber,
//             author: post.author,
//             comment: comment.comment,
//             date: comment.date,
//           });
//         }
//       });
//     });
//     return res.status(200).send({ userPosts, userAllComments });
//   } catch (err) {
//     return res.status(404).send(err);
//   }
// }
// 페이지네이션 게시글 조회
function showUserPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, user } = req.query;
        const itemsPerPage = 3; // 한 페이지에 표시될 아이템 수
        const currentPage = parseInt(page, 10) || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        try {
            const userPosts = yield posts_model_1.default.find({ author: user }).sort({ postNumber: -1 }).skip(startIndex).limit(itemsPerPage);
            const totalPosts = yield posts_model_1.default.countDocuments({ author: user });
            return res.status(200).json({ userPosts, totalPosts });
        }
        catch (err) {
            return res.status(500).json({ message: '에러 발생' });
        }
    });
}
exports.showUserPosts = showUserPosts;
// 페이지네이션 유저가 작성한 댓글 조회
function showUserComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, user } = req.query;
        const itemsPerPage = 3; // 한 페이지에 표시될 아이템 수
        const currentPage = parseInt(page, 10) || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        try {
            const userAllComments = yield posts_model_1.default.find({ 'comments.author': user })
                .sort({ 'comments.date': -1 })
                .skip(startIndex)
                .limit(itemsPerPage);
            const totalComments = yield posts_model_1.default.countDocuments({ 'comments.author': user });
            return res.status(200).json({ userAllComments, totalComments });
        }
        catch (err) {
            return res.status(500).json({ message: '에러 발생' });
        }
    });
}
exports.showUserComments = showUserComments;
