'use client';

export default function useStorage() {
  if (typeof window !== 'undefined') {
    // window 객체에 접근 가능한 클라이언트 환경
    const user = window.localStorage.getItem('user');
    const parseUser = user !== null && JSON.parse(user);
    const storageId = parseUser.id;

    return { storageId, parseUser };
  } else {
    // 서버 환경에서 실행되는 경우 처리
    return { storageId: null, parseUser: null };
  }
}
