export default function CommentButton() {
  return (
    <button className="ml-2 bg-transparent border-none">
      <svg
        className="h-6 w-6 text-black"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 2H6a2 2 0 00-2 2v14l4-4h10a2 2 0 002-2V4a2 2 0 00-2-2zm-2 9H8v2h8v-2zm0-4H8v2h8V7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
