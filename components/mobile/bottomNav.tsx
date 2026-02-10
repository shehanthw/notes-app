import React from 'react'
import SelectCustomer from './sales/NewSalesWizard'

const bottomNav = () => {
  return (
    <div className='fixed bottom-0 text-sm h-14 border-t bg-white w-full flex items-center justify-between px-4 lg:hidden shadow shadow-slate-700/10'>
        <div className='w-[20%]'>Home</div>
        <div className='w-[20%]'>Dashboard</div>
        <div className='w-[20%] flex justify-center'>
            <button className='cursor-pointer h-10 w-10 bg-blue-600 text-xl rounded-full flex items-center justify-center text-white'>
                +
            </button>
        </div>
        <div className='w-[20%]'>Sales</div>
        <div className='w-[20%]'>Profile</div>
    </div>
  )
}

export default bottomNav