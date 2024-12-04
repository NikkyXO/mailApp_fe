export const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="mb-4 bg-red-100 text-center border border-red-400 text-red-700 px-4 py-3 rounded relative w-1/2 mx-auto">
      {message}
    </div>
  );