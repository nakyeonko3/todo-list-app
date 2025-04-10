import { uploadImage } from "@/app/api/api";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export default function useUploadImage(initialImageUrl: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.error("Error uploading image:", error);
      setErrorMessage("이미지 업로드에 실패했습니다.");
    },
    onSuccess: (data) => {
      if (!data.url || typeof data.url !== "string") {
        console.error("Image URL is missing in the response");
        setErrorMessage("서버 응답에 이미지 URL이 누락되었습니다.");
        return;
      }
      setImageUrl(data.url);
      setErrorMessage(null);
      console.log("Image uploaded successfully:", data);
    },
  });

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setErrorMessage("파일을 선택하세요.");
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const validExtensions = ["png", "jpg", "jpeg"];
    if (
      !/^[a-zA-Z]+\.[^.]+$/.test(fileName) ||
      !validExtensions.includes(fileExtension)
    ) {
      setErrorMessage(
        "파일 업로드는 영문 파일이름과 png, jpg, jpeg 확장자만 가능합니다."
      );
      return;
    }
    mutate({ image: file });
  };

  return { handleImageUpload, errorMessage, imageUrl, setImageUrl, isPending };
}
