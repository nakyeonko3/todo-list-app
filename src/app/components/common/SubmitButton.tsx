export default function SubmitButton({ label }: { label: string }) {
  return (
    <button className="ml-2 p-1 rounded-full hover:bg-gray-200">{label}</button>
  );
}
