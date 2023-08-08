import { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import brcypt from 'bcrypt';

import User from '../models/users.model';
import { UserType } from '../../type/type';

// 로그인
async function loginUser(req: Request, res: Response) {
  try {
    const { id, pass } = req.body;
    const user: UserType | null = await User.findOne({ id });

    if (!user) {
      return res.status(401).send('일치하는 아이디가 없습니다.');
    }

    if (pass !== user.password) {
      return res.status(401).send('비밀번호가 일치하지 않습니다.');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json(user);
  } catch (err) {
    res.send('1234');
  }
}

// 회원가입
async function createUser(req: Request, res: Response, next: NextFunction) {
  const { id, password, name, mail } = req.body;
  try {
    let hashedPassword;
    hashedPassword = await brcypt.hash(password, 12);

    const createUser = await User.create({
      id,
      password: hashedPassword,
      name,
      mail,
    });

    let token;
    token = jwt.sign({ userId: createUser.id, email: createUser.mail }, 'supersecret', { expiresIn: '1h' });
    res.status(200).json({});
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

export { loginUser, sendSecurityCode, createUser };
