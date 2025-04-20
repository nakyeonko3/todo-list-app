import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center max-w-md text-center">
        <div className="mb-8">
          <Image
            src="/images/empty_todo.svg"
            alt="404 Page Not Found"
            width={200}
            height={200}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          404 - 페이지를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link href="/" passHref>
          <button type="button" className="px-6 py-3">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}
