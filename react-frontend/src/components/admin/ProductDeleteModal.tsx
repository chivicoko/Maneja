'use client';

import React from 'react';

interface CampaignDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CampaignDeleteModal: React.FC<CampaignDeleteModalProps> = ({ onConfirm, onCancel }) => {

  return (
    <section className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-2 z-50">
      <article className="bg-white py-12 md:py-16 px-4 text-[#333] rounded-lg shadow-lg flex flex-col justify-center items-center gap-6 md:gap-10">
        <h2 className="font-bold mb-4 text-center w-2/3 border-b-2 pb-2 md:pb-4">Delete Product</h2>
        <p className="mb-4 text-center text-sm md:w-2/3">Are You sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={onCancel} className='text-gray-700 hover:text-white bg-transparent hover:bg-gray-700 border border-gray-700 hover:border-transparent py-2 px-6 rounded-[4px] text-xs'> Cancel </button>
          <button onClick={onConfirm} className='text-white border border-red-800 hover:border-red-700 bg-red-800 hover:bg-red-700 py-2 px-6 rounded-[4px] text-xs'> Delete Product </button>
        </div>
      </article>
    </section>
  );
};

export default CampaignDeleteModal;
