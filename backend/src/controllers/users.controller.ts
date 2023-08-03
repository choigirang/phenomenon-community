import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { User } from '../models/users.model';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// 보안 메일
function generateRandomCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

const showUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id, password } = req.params;
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

async function sendSecurityCode(req: Request, res: Response) {
  const { email, domain } = req.body;
  const securityCode = generateRandomCode();
  try {
    // 메일 전송 트랜스포터 설정
    const transporter = nodemailer.createTransport({
      service: 'Gamil',
      auth: {
        user: 'chlrlfkd@gmail.com',
        pass: 'chlrlfkd',
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

// 비동기 요청
async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const createUser = await User.create(req.body);
    res.status(200).json(createUser);
  } catch (err) {
    next(err);
  }
}

export { showUser, sendSecurityCode, createUser };
