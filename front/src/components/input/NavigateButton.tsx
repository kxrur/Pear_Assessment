import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  text: string;
  path: string;
}

export function NavigateButton({ text, path }: NavigateButtonProps) {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(path)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {text}
      </button>
    </div>
  );
}
