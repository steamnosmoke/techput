export default function WhiteCertificate() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-52 transform -rotate-6 max-sm:scale-80 max-sm:p-4 z-10">
      <div className="text-center">
        <div className="text-xs font-semibold text-gray-700 mb-1 tracking-wide">
          ДИПЛОМ
        </div>

        <div className="text-[10px] text-gray-500 leading-tight mb-3">
          о профессиональной
          <br />
          переподготовке
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="h-1.5 bg-gray-100 rounded w-full"></div>
          <div className="h-1.5 bg-gray-100 rounded w-11/12"></div>
          <div className="h-1.5 bg-gray-100 rounded w-full"></div>
          <div className="h-1.5 bg-gray-100 rounded w-4/5"></div>
          <div className="h-1.5 bg-gray-100 rounded w-full"></div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-4">
          <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-gray-200"></div>
          </div>

          <div className="text-left">
            <div className="h-1 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-1 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
