import Image from "next/image";

const Add1 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-64 h-64 bg-gray-100 border border-gray-300 rounded-lg p-8">
      <h2 className="text-xl font-bold mb-4">Welcome to Our Bookshop!</h2>
      <p className="text-sm text-gray-600 mb-4">Discover a world of knowledge and imagination.</p>
      {/* <img className="w-3/4 mb-4" src="bookshop-image.jpg" alt="Bookshop" /> */}
      <Image width={120} height={120} src="/image.png" alt="img"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out">Explore Now</button>
    </div>
  );
};

export default Add1;