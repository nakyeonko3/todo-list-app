import { uploadImage } from "@/app/api/api";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export default function useUploadImage(initialImageUrl: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.error("Error uploading image:", error);
    },
    onSuccess: (data) => {
      if (!data.url || typeof data.url !== "string") {
        console.error("Image URL is missing in the response");
        return;
      }
      setImageUrl(data.url);
      console.log("Image uploaded successfully:", data);
    },
  });

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("파일을 선택하세요.");
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const validExtensions = ["png", "jpg", "jpeg"];
    if (
      !/^[a-zA-Z]+\.[^.]+$/.test(fileName) ||
      !validExtensions.includes(fileExtension)
    ) {
      console.error("Invalid file name or extension");
      return;
    }
    mutate({ image: file });
  };

  return { handleImageUpload, isPending, isError, imageUrl, setImageUrl };
}
