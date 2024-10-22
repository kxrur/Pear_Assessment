interface TeamNameProps {
  teamName: string;
}

export default function TeamName({ teamName }: TeamNameProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{teamName}</h2>
    </div>
  );
}
