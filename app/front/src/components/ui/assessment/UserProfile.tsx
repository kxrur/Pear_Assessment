export interface UserProfileProps {
  firstName: string;
  lastName: string;
}

export default function UserProfile({ firstName, lastName }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-accent rounded-lg shadow-md">
      <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
        {/* You can replace this with an actual image */}
        <svg
          className="w-10 h-10 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A3.001 3.001 0 014 15.25v-.225a4.5 4.5 0 019 0v.225c0 1.21-.535 2.295-1.354 3.035m-5.525-5.572a3.001 3.001 0 015.708 0M15 11a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          {firstName} {lastName}
        </h3>
      </div>
    </div>
  );
}

