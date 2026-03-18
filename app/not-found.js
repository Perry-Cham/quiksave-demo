import { ArrowRight } from 'lucide-react'

const ErrorPage1 = () => {
  return (
    <div className='mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16'>
      <img
        src='https://ui.shadcn.com/placeholder.svg'
        alt='placeholder image'
        className='aspect-video w-240 rounded-xl object-cover dark:brightness-[0.95] dark:invert'
      />
      <div className='text-center'>
        <h1 className='mb-2 text-3xl font-bold'>Page Not Found</h1>
        <p>Oops! The page you're trying to access doesn't exist.</p>
        <div className='mt-6 flex items-center justify-center gap-4 md:mt-8'>
          <a className='cursor-pointer'>Go Back Home</a>
          <a  className='flex cursor-pointer items-center gap-1'>
            <span>Contact Us</span>
            <ArrowRight className='size-4'></ArrowRight>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage1
