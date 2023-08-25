import { useRouter } from 'next/router';

export default function useLink(link: string) {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return {
    handleClick,
  };
}
