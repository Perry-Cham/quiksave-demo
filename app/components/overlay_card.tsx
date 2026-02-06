import {useState} from 'react'
interface Props {
  bgUrl?: string,
  title?:string,
  link?:string
}
function Overlay_Card({bgUrl,title,link}: Props) {
  const [clicked, setClicked] = useState(false)
  return (
    <div 
      data-purpose="product-display" 
      className="w-[300px] h-[300px] relative bg-center bg-cover rounded-lg"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <p className="text-white font-bold text-2xl">{title}</p>
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <a 
          href={link} 
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300 font-bold"
        >
          View Products
        </a>
      </div>
    </div>
  )
}
export default Overlay_Card;