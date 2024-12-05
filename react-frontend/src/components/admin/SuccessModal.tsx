import { CheckCircle } from '@mui/icons-material'
import React from 'react'

const SuccessModal = () => {
  return (
    <section className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-2">
        <article className="bg-white py-12 px-8 md:py-20 md:px-32 rounded-lg shadow-lg flex flex-col justify-center items-center gap-6 md:gap-10">
            <span className='text-[#064f38]'><CheckCircle style={{width: '90px', height: '90px'}}/></span>
            <p className='text-sm'>Campaign Successfully Created!</p>
            <button className='text-white hover:text-[#064f38] bg-[#064f38] hover:bg-transparent border border-transparent hover:border-[#064f38] py-2 px-8 rounded-[4px] text-sm'> Go Back to campaign list </button>
        </article>
    </section>
  )
}

export default SuccessModal;