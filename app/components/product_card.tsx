interface Props {
  name?: string;
  price?: string | number;
  imagesrc?: string;
}

function Card({ name, price, imagesrc }: Props) {
  // Convert price to number if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  const formattedPrice = numPrice ? `K${numPrice.toFixed(2)}` : 'N/A';

  return (
    <div className="group flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 border-2 hover:border-red-400 max-h-[250px] md:max-h-[380px]">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={imagesrc}
          alt={name || 'Product'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        {/* Product Name */}
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors duration-200">
          {name || 'Product'}
        </h3>

        {/* Price Badge */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Price</span>
          <span className="text-lg sm:text-xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;