import { SearchParams } from '@/type/common';
import Process from '../process';
import Agree from '../agree';
import Info from '../(info)/info';

export default function Page(props: SearchParams) {
  const path = props.searchParams.page;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Process path={path} />
      {path === 'agree' && <Agree />}
      {path === 'info' && <Info />}
    </div>
  );
}
