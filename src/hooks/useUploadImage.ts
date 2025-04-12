import { uploadImage } from "@/api/api";
import { showToast } from "@/utils/showToast";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

/**
 * 이미지 업로드를 처리하는 커스텀 훅
 *
 * 이 훅은 이미지 업로드 프로세스의 상태를 관리하며 다음을 포함합니다:
 * - 현재 이미지 URL 추적
 * - 파일 선택 및 유효성 검사 처리
 * - 업로드 상태 및 오류 관리
 * - mutation을 통한 업로드 처리
 *
 * @param initialImageUrl - 표시할 초기 이미지 URL (null일 수 있음)
 *
 * @returns 다음을 포함하는 객체:
 *   - handleImageUpload - 파일 입력 변경 이벤트를 처리하는 함수
 *   - errorMessage - 업로드 유효성 검사나 프로세스 실패 시 오류 메시지
 *   - imageUrl - 현재 이미지 URL (초기값 또는 새로 업로드된 값)
 *   - setImageUrl - 이미지 URL을 수동으로 업데이트하는 함수
 *   - isPending - 업로드가 진행 중인지 나타내는 불리언 값
 *
 * @example
 * ```tsx
 * function ProfileForm() {
 *   const { imageUrl, handleImageUpload, errorMessage, isPending } = useUploadImage(null);
 *
 *   return (
 *     <form>
 *       <input type="file" onChange={handleImageUpload} disabled={isPending} />
 *       {errorMessage && <p className="error">{errorMessage}</p>}
 *       {imageUrl && <img src={imageUrl} alt="Preview" />}
 *       {isPending && <p>업로드 중...</p>}
 *     </form>
 *   );
 * }
 * ```
 */
export default function useUploadImage(initialImageUrl: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.error("Error uploading image:", error);
      showToast("이미지 업로드에 실패했습니다", "failed");
    },
    onSuccess: (data) => {
      if (!data.url || typeof data.url !== "string") {
        console.error("Image URL is missing in the response");
        showToast("이미지 업로드에 실패했습니다", "failed");
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
        "이미지 업로드는 영문 파일이름과 png, jpg, jpeg 확장자만 가능합니다."
      );
      showToast("이미지 형식을 확인해주세요", "failed");
      return;
    }
    mutate({ image: file });
  };

  return { handleImageUpload, errorMessage, imageUrl, setImageUrl, isPending };
}
