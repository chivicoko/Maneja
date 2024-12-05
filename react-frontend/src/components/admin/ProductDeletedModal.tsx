'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface CampaignDeletedModalProps {
  onClose: () => void;
}

const CampaignDeletedModal: React.FC<CampaignDeletedModalProps> = ({ onClose }) => {
  const router = useRouter();
  
  return (
    <section className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-2 z-50">
      <article className="bg-white py-12 px-8 md:py-20 md:px-32 text-[#333] rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 md:gap-6">
        <h2 className="font-bold mb-4 text-center w-full border-b-2 pb-2 md:pb-4">Product Deleted</h2>
        <p className="mb-4 text-center text-sm">Product has been deleted.</p>
        <button 
          onClick={() => {onClose; router.refresh();}} 
          className='text-white hover:text-[#064f38] bg-[#064f38] hover:bg-transparent border border-transparent hover:border-[#064f38] py-2 px-8 rounded-[4px] text-sm'
        >
          Go Back to product list
        </button>
      </article>
    </section>
  );
};

export default CampaignDeletedModal;
