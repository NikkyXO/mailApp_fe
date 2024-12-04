export const SuccessDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="mb-4 w-1/2 mx-auto p-2 bg-green-400 text-white  border border-red-400 px-4 py-3 rounded relative text-center">
      {message}
    </div>
  );