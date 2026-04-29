"use client";

import Image from "next/image";

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setSelectedImage(url);
    }
  };
  return (
    <div
      className={`${selectedImage ? "bg-none animate-none" : "bg-neutral-300/50 animate-pulse"} w-full h-50 rounded-md relative group`}
    >
      {selectedImage && (
        <Image
          src={selectedImage}
          alt="Post-Image"
          fill
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      )}

      <input
        type="file"
        name="image"
        id="image"
        className="hidden"
        onChange={handleImageUpload}
      />

      <label
        htmlFor="image"
        className={
          selectedImage
            ? "absolute top-1/2 left-1/2 -translate-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-neutral-300"
            : "w-full h-50 flex items-center justify-center rounded-md cursor-pointer"
        }
      >
        Upload Image Here
      </label>
    </div>
  );
};

export default UploadImage;
