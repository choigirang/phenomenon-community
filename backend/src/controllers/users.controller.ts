import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from '../models/users.model';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { UserType } from '../../type/type';

// 로그인
async function loginUser(req: Request, res: Response) {
  try {
    const { id, password } = req.body;
    const user: UserType | null = await User.findOne({ id });

    if (!user) {
      return res.status(401).send('일치하는 아이디가 없습니다.');
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).send('비밀번호가 일치하지 않습니다.');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login!' });
  }
}

// 보안 코드 생성
function generateRandomCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

// 보안 코드 전송
async function sendSecurityCode(req: Request, res: Response) {
  const { email, domain } = req.body;
  const securityCode = generateRandomCode();
  try {
    // 메일 전송 트랜스포터 설정
    const transporter = nodemailer.createTransport({
      service: 'Gamail',
      auth: {
        user: 'chlrlfkd@gmail.com',
        pass: 'zkkxyurtvdafbjww',
      },
    });

    // 메일 옵션
    const mailOpt = {
      from: 'chlrlfkd@gmail.com',
      to: `${email}@${domain}`,
      subject: 'phenomeno 보안 코드를 입력해주세요.',
      text: `보안코드 : ${securityCode}`,
    };

    // 메일 전송
    const result = await transporter.sendMail(mailOpt);
    return res.send(result);
  } catch (err) {
    return res.send(`메일 전송에 실패하였습니다. ${err}`);
  }
}

// 회원가입
async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const createUser = await User.create(req.body);
    res.status(200).json(createUser);
  } catch (err) {
    next(err);
  }
}

export { loginUser, sendSecurityCode, createUser };
