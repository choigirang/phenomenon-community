import axios from 'axios';

function useApi(search: string[]) {
  const [url, keyword] = search;
  const resData = axios(`/${url}/${keyword}`).then(res => res.json());

  return [resData];
}
