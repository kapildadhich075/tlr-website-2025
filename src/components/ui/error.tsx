interface ErrorDisplayProps {
  message?: string;
  retry?: () => void;
}

export function ErrorDisplay({ message, retry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center h-32 space-y-4">
      <p className="text-red-500">{message || "Something went wrong"}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
