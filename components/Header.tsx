import React from 'react'
import Search from '@/components/Search'
import {CogIcon, LoginIcon} from '@heroicons/react/outline'

function Header() {
  return (
    <div className='mt-5 w-3/4'>
    <div className='flex items-center flex-1 justify-between mx-5 '>
        <div>
            <p className=' font-bold text-3xl text-gray-900'>
                {new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
            <p className='font-extralight text-gray-400'>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        </div>
      <Search />
      <div className='flex items-center space-x-5'>
      <div className='bg-slate-100 text-gray-400 p-2 w-fit rounded-full cursor-pointer active:translate-y-5 hover:bg-slate-200 transition-all duration-300 '>
      <CogIcon className='h-7 w-7' />
      </div>
      <div className='bg-slate-100 text-gray-400 p-2 w-fit rounded-full cursor-pointer  active:translate-y-5 hover:bg-slate-200 transition-all duration-300 '>
      <LoginIcon className='h-7 w-7' />
      </div>    
      </div>
    </div>
    <hr className='mt-10 mb-5  border-2' />
    </div>
  )
}

export default Header
