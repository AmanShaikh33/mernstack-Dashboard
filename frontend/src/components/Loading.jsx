export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-cyan-400"></div>
        <span className="absolute text-white font-semibold">Loading...</span>
      </div>
    </div>
  );
};
