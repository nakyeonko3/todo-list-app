"use client";

import useUploadImage from "@/app/hooks/useUploadImage";
import Image from "next/image";
import { useId, useRef } from "react";

interface ImageUploaderProps {
  initialImageUrl?: string | null;
  onImageUpload: (imageUrl: string) => void;
  name: string;
  label: string;
}

export default function ImageUploadField({
  initialImageUrl = null,
  onImageUpload,
  label,
  name,
}: ImageUploaderProps) {
  const inputId = `${name}-${useId()}`;

  const {
    imageUrl,
    setImageUrl,
    handleImageUpload,
    isPending: isUploading,
  } = useUploadImage(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageDelete = () => {
    setImageUrl(null);
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="relative w-[200px] h-[200px] border-2 border-dashed border-slate-300 rounded-md 
                  flex flex-col justify-center items-center cursor-pointer mb-2"
        onClick={triggerFileInput}
      >
        {isUploading ? (
          <div className="text-slate-500">업로드 중...</div>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt="업로드된 이미지"
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center text-slate-500">
            <Image
              src="/icons/no_img.svg"
              alt="no image"
              width={30}
              height={30}
            />
          </div>
        )}
      </div>
      <label htmlFor={inputId} className="text-gray-500 mb-2 hidden">
        {label}
      </label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="text"
        id={inputId}
        name={name}
        value={imageUrl || ""}
        className="hidden"
        readOnly
      />
      {imageUrl && (
        <button
          type="button"
          className="text-red-500 text-sm mt-2"
          onClick={handleImageDelete}
        >
          이미지 삭제
        </button>
      )}
    </div>
  );
}
