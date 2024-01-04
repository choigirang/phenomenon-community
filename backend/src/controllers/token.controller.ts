import { Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import User from '../models/users.model';

// 토큰 만료 시 재발급
async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.body.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) return res.status(403).send('유저가 일치하지 않습니다.');
  if (!refreshToken) return res.status(400).send('토큰이 유효하지 않습니다.');

  jwt.verify(refreshToken, 'superrefresh', (err: VerifyErrors | null) => {
    if (err) return res.status(403).send('유효하지 않은 접근입니다.');

    const accessToken = jwt.sign({ id: user.id }, 'super_secret');

    res.cookie('token', accessToken, { httpOnly: true });
  });
}

export { refreshToken };
