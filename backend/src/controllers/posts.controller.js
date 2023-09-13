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
exports.searchPost = exports.postAddLikes = exports.deleteComment = exports.editComment = exports.addComment = exports.editPost = exports.deletePost = exports.addPost = exports.categoryPost = exports.showEachPost = exports.showPosts = exports.latestPost = void 0;
const posts_model_1 = __importDefault(require("../models/posts.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const gallery_model_1 = __importDefault(require("../models/gallery.model"));
// 최신 게시글 조회
function latestPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield posts_model_1.default.find().sort({ postNumber: -1 }).limit(10);
        try {
            return res.status(200).json(posts);
        }
        catch (err) {
            return res.status(500).json({ message: '에러 발생' });
        }
    });
}
exports.latestPost = latestPost;
// 페이지네이션 게시글 조회
function showPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, category } = req.query;
        const itemsPerPage = 10;
        const currentPage = parseInt(page, 10) || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        try {
            // 카테고리가 'all'이면 모든 게시글 조회, 그렇지 않으면 해당 카테고리의 게시글 조회
            const totalPosts = yield (category === 'all' ? posts_model_1.default.countDocuments() : posts_model_1.default.countDocuments({ category }));
            const posts = yield (category === 'all'
                ? posts_model_1.default.find().sort({ postNumber: -1 }).skip(startIndex).limit(itemsPerPage)
                : posts_model_1.default.find({ category }).sort({ postNumber: -1 }).skip(startIndex).limit(itemsPerPage));
            return res.status(200).json({ posts, totalPosts });
        }
        catch (err) {
            return res.status(500).json({ message: '에러 발생' });
        }
    });
}
exports.showPosts = showPosts;
// 개별 게시글 조회
function showEachPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id)
            return;
        try {
            // 게시글 조회
            const findPostData = yield posts_model_1.default.findOne({ postNumber: id });
            if (!findPostData) {
                return res.status(404).send('게시글이 존재하지 않습니다.');
            }
            // 게시글의 views를 1 증가
            findPostData.views += 1;
            yield findPostData.save();
            return res.status(200).send(findPostData);
        }
        catch (err) {
            return res.status(404).send('게시글이 존재하지 않습니다.');
        }
    });
}
exports.showEachPost = showEachPost;
// 카테고리 게시글 조회
function categoryPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { category } = req.params;
        try {
            const findPosts = yield posts_model_1.default.find({ category }).sort({ postNumber: -1 });
            const allData = yield posts_model_1.default.find().sort({ postNumber: -1 });
            if (category === 'all')
                return res.status(200).send(allData);
            res.status(200).send(findPosts);
        }
        catch (err) {
            res.status(404).send('일치하는 데이터가 없습니다.');
        }
    });
}
exports.categoryPost = categoryPost;
// 게시글 추가
function addPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, body, date, author, name, category } = req.body;
        try {
            const postNumber = yield posts_model_1.default.countDocuments();
            const createdPost = new posts_model_1.default({
                postNumber: postNumber + 1,
                author,
                name,
                title,
                body,
                date,
                category,
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
exports.addPost = addPost;
// 게시글 삭제
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletePost = yield posts_model_1.default.deleteOne({ postNumber: id });
            if (deletePost.deletedCount === 1)
                return res.status(200).json('삭제되었습니다.');
            else
                return res.status(404).json('게시글을 찾을 수 없습니다.');
        }
        catch (err) {
            console.log(err);
            return res.status(404);
        }
    });
}
exports.deletePost = deletePost;
// 게시글 수정
function editPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { title, body, date, author, category } = req.body;
        try {
            // postNumber가 id와 일치하는 게시물을 찾습니다.
            const existingPost = yield posts_model_1.default.findOne({ postNumber: id });
            if (!existingPost) {
                return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
            }
            // 요청 데이터로 게시물 업데이트
            existingPost.title = title;
            existingPost.body = body;
            existingPost.date = date;
            existingPost.author = author;
            existingPost.category = category;
            // 업데이트를 저장하고 응답
            const updatedPost = yield existingPost.save();
            return res.status(200).json({ message: '게시물이 수정되었습니다.', data: updatedPost });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: '서버 오류 발생' });
        }
    });
}
exports.editPost = editPost;
// 게시글 댓글 추가
function addComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postNumber, author, comment, date } = req.body;
        try {
            const findPost = yield posts_model_1.default.findOne({ postNumber });
            if (!findPost) {
                return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }
            const commentNumber = findPost.comments.length;
            const newComment = { commentNumber: commentNumber + 1, author, comment, date };
            findPost.comments.unshift(newComment);
            yield findPost.save();
            return res.status(200).json({ message: '댓글이 추가되었습니다.', post: findPost });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: '서버 에러' });
        }
    });
}
exports.addComment = addComment;
// 댓글 수정
function editComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postNumber, commentNumber } = req.params;
        const { comment: newComment } = req.body;
        try {
            const findPost = yield posts_model_1.default.findOne({ postNumber });
            if (!findPost) {
                return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }
            const commentFind = findPost.comments.findIndex((comment) => comment.commentNumber === +commentNumber);
            if (commentFind === -1) {
                return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
            }
            // Update the comment
            findPost.comments[commentFind].comment = newComment;
            yield findPost.save();
            return res.status(200).json({ message: '댓글이 수정되었습니다.', post: findPost });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: '서버 에러' });
        }
    });
}
exports.editComment = editComment;
// 댓글 삭제
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postNumber, commentNumber } = req.params;
        try {
            const findPost = yield posts_model_1.default.findOne({ postNumber });
            if (!findPost) {
                return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }
            const commentFind = findPost.comments.findIndex((comment) => comment.commentNumber === +commentNumber);
            if (commentFind === -1) {
                return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
            }
            findPost.comments.splice(commentFind, 1);
            yield findPost.save();
            return res.status(200).json({ message: '댓글이 삭제되었습니다.', post: findPost });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: '서버 에러' });
        }
    });
}
exports.deleteComment = deleteComment;
/** 게시글 좋아요 */
function postAddLikes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, postNumber } = req.body;
        try {
            // 게시글 조회
            const findPostData = yield posts_model_1.default.findOne({ postNumber: postNumber });
            if (!findPostData) {
                return res.status(404).send('게시글이 존재하지 않습니다.');
            }
            const findUserData = yield users_model_1.default.findOne({ id: id });
            if (!findUserData) {
                return res.status(404).send('사용자가 존재하지 않습니다.');
            }
            // find 안 돼서 보류
            // 이미 좋아요 했을 시 삭제
            // const updatedLikes = findUserData.likes.filter(like => like.postNumber !== postNumber);
            // findUserData.likes = updatedLikes;
            const findLikesData = findUserData.postLikes.filter(like => like.postNumber === postNumber);
            // postNumber와 일치하는 데이터 있을 시 삭제
            if (findLikesData.length > 0) {
                findUserData.postLikes = findUserData.postLikes.filter(like => like.postNumber !== postNumber);
                findPostData.likes -= 1;
                yield findPostData.save();
            }
            else {
                // postNumber와 일치하는 데이터 없을 시 추가
                findUserData.postLikes.unshift({
                    author: findPostData.author,
                    title: findPostData.title,
                    body: findPostData.body,
                    postNumber: findPostData.postNumber,
                });
                findPostData.likes += 1;
                yield findPostData.save();
            }
            yield findUserData.save();
            return res.status(200).send(findUserData);
        }
        catch (err) {
            return res.status(404).send('게시글이 존재하지 않습니다.');
        }
    });
}
exports.postAddLikes = postAddLikes;
/** 특정 게시글 검색 */
function searchPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyword = req.query.keyword;
            // 키워드를 포함하는 데이터 검색
            const searchPostResults = yield posts_model_1.default.find({
                $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }],
            }).sort({ postNumber: -1 });
            const searchGalleryResults = yield gallery_model_1.default.find({
                $or: [{ title: { $regex: keyword, $options: 'i' } }],
            }).sort({ galleryNumber: -1 });
            res.status(200).json({ searchPostResults, searchGalleryResults });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.searchPost = searchPost;
