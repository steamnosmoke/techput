export default function PricingCard() {
  return (
    <div className="relative w-full max-w-sm h-100">
      <div className="absolute bottom-0 right-0 w-90 h-80 bg-[#ffb85b] rounded-2xl flex items-start justify-center pt-4">
        <span className="text-white text-3xl font-medium">GO!</span>
        <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-gray-800 text-2xl rotate-270">ᗧ:</span>
        </div>
      </div>

      <div className="absolute bottom-0 right-8 w-90 h-60 bg-[#ffa126] rounded-2xl flex items-start justify-center pt-4">
        <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-gray-800 text-2xl  rotate-270">(:</span>
        </div>
        <span className="text-gray-900 text-2xl font-medium ml-8">STEADY</span>
      </div>

      <div className="absolute bottom-0 right-16 w-90 h-40 bg-[#ff8800] rounded-2xl flex flex-col items-center justify-center">
        <span className="text-gray-900 text-3xl font-medium mb-4">READY</span>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <span className="text-gray-800 text-2xl rotate-270">/:</span>
        </div>
      </div>
    </div>
  );
}
