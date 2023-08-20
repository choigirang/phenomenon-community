import { Request, Response } from 'express';

export async function userAllData(req: Request, res: Response) {
  const user = req.params.user;
  // Post와 Comment에서 찾기
  // user의 likes 저장하기
  //   const

  try {
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(404).send(err);
  }
}
