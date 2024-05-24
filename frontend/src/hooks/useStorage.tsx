'use client';

export default function useStorage() {
  if (typeof window !== 'undefined') {
    // saved user data
    const user = window.localStorage.getItem('user');
    const parseUser = user !== null && JSON.parse(user);
    const storageId = parseUser.id;

    return { storageId, parseUser };
  } else {
    // when server
    return { storageId: null, parseUser: null };
  }
}
