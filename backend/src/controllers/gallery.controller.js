'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.galleryDeleteComment =
  exports.galleryEditComment =
  exports.galleryAddComment =
  exports.likesGallery =
  exports.deleteGallery =
  exports.detailGallery =
  exports.addImageToGallery =
  exports.galleryList =
  exports.latestGallery =
    void 0;
const gallery_model_1 = __importDefault(require('../models/gallery.model'));
const users_model_1 = __importDefault(require('../models/users.model'));
// 갤러리 최근 조회
function latestGallery(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const latestGallery = (yield gallery_model_1.default.find().sort({ galleryNumber: -1 })).splice(0, 5);
      if (!latestGallery) res.status(200).json('데이터가 없습니다.');
      res.status(200).json(latestGallery);
    } catch (err) {
      res.status(500).json('서버 에러입니다.');
    }
  });
}
exports.latestGallery = latestGallery;
// 갤러리 조회
function galleryList(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const findGallery = yield gallery_model_1.default.find().sort({ galleryNumber: -1 });
      res.status(200).json(findGallery);
    } catch (err) {
      res.status(500).json('server err');
    }
  });
}
exports.galleryList = galleryList;
// 갤러리 추가
function addImageToGallery(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      // 클라이언트로부터 받은 정보
      const { title, author, date } = req.body;
      console.log(title, author, date);
      const files = req.files;
      console.log(files);
      const baseUrl = 'https://choigirang-why-community.s3.ap-northeast-2.amazonaws.com/gallery/';
      const galleryNumber = yield gallery_model_1.default.find();
      // MongoDB에 이미지 정보 저장
      const gallery = new gallery_model_1.default({
        title,
        author,
        date,
        views: 0,
        likes: 0,
        galleryNumber: galleryNumber.length + 1,
        images: files.map(file => ({ src: file.location.replace(baseUrl, '') })),
      });
      console.log(gallery);
      yield gallery.save();
      res.status(200).json({ message: '갤러리 이미지 추가 성공', files });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '갤러리 이미지 추가 실패' });
    }
  });
}
exports.addImageToGallery = addImageToGallery;
// 개별 갤러리 조회
function detailGallery(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const findGallery = yield gallery_model_1.default.findOne({ galleryNumber: id });
      if (!findGallery) return res.status(404).json('데이터가 존재하지 않습니다.');
      findGallery.views += 1;
      yield findGallery.save();
      res.status(200).json(findGallery);
    } catch (err) {
      res.status(500).json(err);
    }
  });
}
exports.detailGallery = detailGallery;
// 게시글 삭제
function deleteGallery(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const deleteGallery = yield gallery_model_1.default.deleteOne({ galleryNumber: id });
      if (!deleteGallery) res.status(404).json('데이터가 존재하지 않습니다.');
      res.status(200).json(deleteGallery);
    } catch (err) {
      res.status(500).json(err);
    }
  });
}
exports.deleteGallery = deleteGallery;
// 게시글 좋아요
function likesGallery(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id, galleryNumber } = req.body;
    try {
      const findGalleryData = yield gallery_model_1.default.findOne({ galleryNumber });
      if (!findGalleryData) return res.status(404).json('게시글이 존재하지 않습니다.');
      const findUserData = yield users_model_1.default.findOne({ id });
      if (!findUserData) {
        return res.status(404).send('사용자가 존재하지 않습니다.');
      }
      const findLikesData = findUserData.galleryLikes.filter(like => like.galleryNumber === galleryNumber);
      // galleryNumber와 일치하는 데이터 있을 시 삭제
      if (findLikesData.length > 0) {
        findUserData.galleryLikes = findUserData.galleryLikes.filter(like => like.galleryNumber !== galleryNumber);
        findGalleryData.likes -= 1;
        yield galleryNumber.save();
      } else {
        // galleryNumber와 일치하는 데이터 없을 시 추가
        findUserData.galleryLikes.unshift({
          author: findGalleryData.author,
          title: findGalleryData.title,
          galleryNumber: findGalleryData.galleryNumber,
        });
        findGalleryData.likes += 1;
        yield galleryNumber.save();
      }
      yield findUserData.save();
      return res.status(200).send(findUserData);
    } catch (err) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
  });
}
exports.likesGallery = likesGallery;
// 갤러리 댓글
function galleryAddComment(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { galleryNumber, author, comment, date } = req.body;
    try {
      const findGallery = yield gallery_model_1.default.findOne({ galleryNumber });
      if (!findGallery) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }
      const commentNumber = findGallery.comments.length;
      const newComment = { commentNumber: commentNumber + 1, author, comment, date };
      findGallery.comments.unshift(newComment);
      yield findGallery.save();
      return res.status(200).json({ message: '댓글이 추가되었습니다.', gallery: findGallery });
    } catch (err) {}
  });
}
exports.galleryAddComment = galleryAddComment;
// 갤러리 댓글 수정
function galleryEditComment(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { galleryNumber, commentNumber } = req.params;
    const { comment: newComment } = req.body;
    try {
      const findGallery = yield gallery_model_1.default.findOne({ galleryNumber });
      if (!findGallery) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }
      const commentFind = findGallery.comments.findIndex(comment => comment.commentNumber === +commentNumber);
      if (commentFind === -1) {
        return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
      }
      // Update the comment
      findGallery.comments[commentFind].comment = newComment;
      yield findGallery.save();
      return res.status(200).json({ message: '댓글이 수정되었습니다.', gallery: findGallery });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '서버 에러' });
    }
  });
}
exports.galleryEditComment = galleryEditComment;
// 갤러리 댓글 삭제
function galleryDeleteComment(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { galleryNumber, commentNumber } = req.params;
    try {
      const findGallery = yield gallery_model_1.default.findOne({ galleryNumber });
      if (!findGallery) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }
      const commentFind = findGallery.comments.findIndex(comment => comment.commentNumber === +commentNumber);
      if (commentFind === -1) {
        return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
      }
      findGallery.comments.splice(commentFind, 1);
      yield findGallery.save();
      return res.status(200).json({ message: '댓글이 삭제되었습니다.', gallery: findGallery });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 에러' });
    }
  });
}
exports.galleryDeleteComment = galleryDeleteComment;
