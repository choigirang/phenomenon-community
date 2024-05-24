'use client';

type ImageProps = {
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
};

/** 2024/05/23 - user profile img(parent: infoPage) in sign page */
export default function Profile({ setSelectedImage }: ImageProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-info w-full p-default text-xs">
      <label htmlFor="img" className="font-bold">
        프로필
      </label>
      <div className="flex flex-col gap-1">
        <input
          id="img"
          name="profileImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-lightGray px-default py-1 outline-none"
        />
        <span className="text-lightGray">선택하지 않을 시 기본 이미지로 설정됩니다.</span>
      </div>
    </div>
  );
}
