import PrePosts from './(community)/(preData)/prePosts';
import PreGallery from './(gallery)/(preData)/preGallery';

export default function Page() {
  return (
    <div className="grid grid-cols-home p-container py-5">
      <div className="flex flex-col gap-2">
        <PreGallery />
        <PrePosts />
      </div>
      <div></div>
    </div>
  );
}
