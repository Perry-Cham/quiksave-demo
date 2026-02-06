import {isValidElement} from 'react'
interface Props {
  title : string;
  message : React.ReactNode;
}
function Intro({title,message}: Props){
  const isValid = isValidElement(message)
  return(
    <section className='px-32 py-20 '>
      <h2 className="text-3xl font-bold mb-4 uppercase">{title}</h2>
      { !isValid ? <p className='text-lg'>{message}</p> : message}
    </section>
    )
}
export default Intro