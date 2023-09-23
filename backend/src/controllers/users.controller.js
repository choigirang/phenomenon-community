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
exports.checkUser =
  exports.createUser =
  exports.sendSecurityCode =
  exports.searchUserData =
  exports.searchUser =
  exports.allUser =
  exports.loginUser =
    void 0;
const crypto_1 = __importDefault(require('crypto'));
const nodemailer_1 = __importDefault(require('nodemailer'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const users_model_1 = __importDefault(require('../models/users.model'));
const posts_model_1 = __importDefault(require('../models/posts.model'));
// 로그인
function loginUser(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const { id, password } = req.body;
      const user = yield users_model_1.default.findOne({ id });
      if (!user) {
        return res.status(401).send('일치하는 유저가 없습니다.');
      }
      // 비밀번호 해싱 추후 예정
      // let isValidPass = false;
      // isValidPass = await brcypt.compare(password, user.password);
      if (password !== user.password) {
        return res.status(401).send('비밀번호가 일치하지 않습니다.');
      }
      // 토큰
      const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, 'super_secret', { expiresIn: '1h' });
      const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, 'super_refresh');
      user.refreshToken = refreshToken;
      yield user.save();
      res.cookie('access', accessToken, { httpOnly: true });
      res.cookie('refresh', refreshToken);
      return res.status(200).json({ user, accessToken, refreshToken });
    } catch (err) {
      res.status(500).send('서버 오류입니다.');
    }
  });
}
exports.loginUser = loginUser;
// 유저 확인
function checkUser(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const cookie = req.cookies.refresh;
      if (!cookie) return res.status(401).send('유효하지 않은 유저입니다.');
      // 토큰 확인
      jsonwebtoken_1.default.verify(cookie, 'super_refresh', err => {
        if (err) {
          return res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
        }
        const decodedToken = jsonwebtoken_1.default.decode(cookie);
        if (!decodedToken || !decodedToken.id) return res.status(401);
        const userId = decodedToken.id;
        users_model_1.default.findOne({ id: userId }).then(user => {
          if (!user) return res.status(404).send('사용자를 찾을 수 없습니다.');
          return res.status(200).json(user);
        });
      });
    } catch (err) {
      return res.status(500).send('서버 오류입니다.');
    }
  });
}
exports.checkUser = checkUser;
// 전체 유저
function allUser(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const findAllUser = yield users_model_1.default.find();
      res.status(200).json({ findAllUser });
    } catch (err) {
      res.status(500).json({ error: '서버오류' });
    }
  });
}
exports.allUser = allUser;
// 개별 유저 검색
function searchUser(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const id = req.query.id;
      const findUser = yield users_model_1.default.find({ id: { $regex: id, $options: 'i' } });
      const allUser = yield users_model_1.default.find();
      // const userData = findUser.map(user => user.id);
      // const allUserData = allUser.map(user => user.id);
      if (id === 'all') return res.status(200).json({ allUser });
      if (findUser.length === 0) return res.status(200).send('검색된 유저가 없습니다.');
      res.status(200).json({ findUser });
    } catch (err) {
      res.status(500).json({ error: '서버오류' });
    }
  });
}
exports.searchUser = searchUser;
// 개별 유저 작성 게시글
function searchUserData(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const findPost = yield posts_model_1.default.find({ author: id });
      const findUser = yield users_model_1.default.findOne({ id });
      if (!findUser) return res.status(404).json('일치하는 유저가 존재하지 않습니다.');
      const userData = {
        id: findUser.id,
        name: findUser.name,
        img: findUser.img,
        posts: findPost,
      };
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ error: '데이터가 존재하지 않습니다.' });
    }
  });
}
exports.searchUserData = searchUserData;
// 회원가입
function createUser(req, res, next) {
  var _a;
  return __awaiter(this, void 0, void 0, function* () {
    // 비밀번호 해싱 추후 예정
    // let hashedPassword;
    // hashedPassword = await brcypt.hash(password, 12);
    const { id, password, name, mail } = req.body;
    try {
      const data = (_a = req.file) === null || _a === void 0 ? void 0 : _a.location;
      const baseUrl = 'https://choigirang-why-community.s3.ap-northeast-2.amazonaws.com/profile/';
      let img = data === null || data === void 0 ? void 0 : data.replace(baseUrl, '');
      if (!data) img = 'default.jpg';
      const createUser = new users_model_1.default({
        id,
        password,
        name,
        mail,
        super: false,
        img,
      });
      yield createUser.save();
      let token;
      token = jsonwebtoken_1.default.sign({ id: createUser.id }, 'supersecret', { expiresIn: '1h' });
      return res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  });
}
exports.createUser = createUser;
// 보안 코드 생성
function generateRandomCode() {
  return crypto_1.default.randomBytes(3).toString('hex').toUpperCase();
}
// 보안 코드 전송
function sendSecurityCode(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const { mail, domain } = req.body;
    const securityCode = generateRandomCode();
    try {
      // 메일 전송 트랜스포터 설정
      const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
          user: 'chlrlfkd@gmail.com',
          pass: 'zkkxyurtvdafbjww',
        },
      });
      // 메일 옵션
      const mailOpt = {
        from: 'chlrlfkd@gmail.com',
        to: `${mail}@${domain}`,
        subject: 'phenomeno 보안 코드를 입력해주세요.',
        text: `보안코드 : ${securityCode}`,
      };
      // 메일 전송
      const result = yield transporter.sendMail(mailOpt);
      return res.send(securityCode);
    } catch (err) {
      return res.send(`메일 전송에 실패하였습니다. ${err}`);
    }
  });
}
exports.sendSecurityCode = sendSecurityCode;
