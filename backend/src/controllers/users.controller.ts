import { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import brcypt from 'bcrypt';

import User from '../models/users.model';
import { UserType } from '../../type/type';

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

// 회원가입
async function createUser(req: Request, res: Response, next: NextFunction) {
  const { id, password, name, mail } = req.body;
  try {
    // 비밀번호 해싱 추후 예정
    // let hashedPassword;
    // hashedPassword = await brcypt.hash(password, 12);

    const createUser = new User({
      id,
      password,
      name,
      mail,
      super: false,
    });

    await createUser.save();

    let token;
    token = jwt.sign({ id: createUser.id }, 'supersecret', { expiresIn: '1h' });
    return res.status(200).json({ token });
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

export { loginUser, sendSecurityCode, createUser, checkUser };
