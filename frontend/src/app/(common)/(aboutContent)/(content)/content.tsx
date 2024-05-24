/** 2024/05/21 - each post content body */
export default function Content({ body }: { body: string }) {
  return <div className="py-default" dangerouslySetInnerHTML={{ __html: body }} />;
}
