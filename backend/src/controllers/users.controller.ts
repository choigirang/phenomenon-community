import { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import brcypt from 'bcrypt';

import User from '../models/users.model';
import { UserType } from '../../type/type';
import Post from '../models/posts.model';
import { Multer } from 'multer';

// 로그인
async function loginUser(req: Request, res: Response) {
  try {
    const { id, password } = req.body;
    const user: UserType | null = await User.findOne({ id });

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
    const accessToken = jwt.sign({ id: user.id }, 'super_secret', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, 'super_refresh');

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('access', accessToken, { httpOnly: true });
    res.cookie('refresh', refreshToken);
    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).send('서버 오류입니다.');
  }
}

// 유저 확인
async function checkUser(req: Request, res: Response) {
  try {
    const cookie = req.cookies.refresh;

    if (!cookie) return res.status(401).send('유효하지 않은 유저입니다.');

    // 토큰 확인
    jwt.verify(cookie, 'super_refresh', (err: VerifyErrors | null) => {
      if (err) {
        return res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
      }

      const decodedToken = jwt.decode(cookie) as JwtPayload;
      if (!decodedToken || !decodedToken.id) return res.status(401);

      const userId = decodedToken.id;

      User.findOne({ id: userId }).then(user => {
        if (!user) return res.status(404).send('사용자를 찾을 수 없습니다.');

        return res.status(200).json(user);
      });
    });
  } catch (err) {
    return res.status(500).send('서버 오류입니다.');
  }
}

// 전체 유저
async function allUser(req: Request, res: Response) {
  try {
    const findAllUser = await User.find();

    res.status(200).json({ findAllUser });
  } catch (err) {
    res.status(500).json({ error: '서버오류' });
  }
}

// 개별 유저 검색
async function searchUser(req: Request, res: Response) {
  try {
    const id = req.query.id;

    const findUser = await User.find({ id: { $regex: id, $options: 'i' } });
    const allUser = await User.find();

    // const userData = findUser.map(user => user.id);
    // const allUserData = allUser.map(user => user.id);

    if (id === 'all') return res.status(200).json({ allUser });
    if (findUser.length === 0) return res.status(200).send('검색된 유저가 없습니다.');

    res.status(200).json({ findUser });
  } catch (err) {
    res.status(500).json({ error: '서버오류' });
  }
}

// 개별 유저 작성 게시글
async function searchUserData(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const findPost = await Post.find({ author: id });
    const findUser = await User.findOne({ id });

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
}

// 회원가입
async function createUser(req: Request, res: Response, next: NextFunction) {
  // 비밀번호 해싱 추후 예정
  // let hashedPassword;
  // hashedPassword = await brcypt.hash(password, 12);
  const { id, password, name, mail } = req.body;

  try {
    const data = (req.file as Express.MulterS3.File)?.location;
    const baseUrl = 'https://choigirang-why-community.s3.ap-northeast-2.amazonaws.com/profile/';
    let img = data?.replace(baseUrl, '');

    if (!data) img = 'default.jpg';

    const createUser = new User({
      id,
      password,
      name,
      mail,
      super: false,
      img,
    });

    await createUser.save();

    let token;
    token = jwt.sign({ id: createUser.id }, 'supersecret', { expiresIn: '1h' });
    return res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}

// 보안 코드 생성
function generateRandomCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

// 보안 코드 전송
async function sendSecurityCode(req: Request, res: Response) {
  const { mail, domain } = req.body;
  const securityCode = generateRandomCode();
  try {
    // 메일 전송 트랜스포터 설정
    const transporter = nodemailer.createTransport({
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
    const result = await transporter.sendMail(mailOpt);
    return res.send(securityCode);
  } catch (err) {
    return res.send(`메일 전송에 실패하였습니다. ${err}`);
  }
}

export { loginUser, allUser, searchUser, searchUserData, sendSecurityCode, createUser, checkUser };
