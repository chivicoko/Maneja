'use client';

import { createProduct, updateProduct } from '@/lib/api';
import { categoryList } from '@/utils/data';
import { Product } from '@/utils/types';
import { Add } from '@mui/icons-material';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
  mode: 'view' | 'edit';
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product, mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    category: '',
    description: '',
    image: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: '',
        name: '',
        price: 0,
        category: '',
        description: '',
        image: ''
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    };
    let isValid = true;

    if (formData.name.trim() === '') {
      newErrors.name = 'Product name is required.';
      isValid = false;
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero.';
      isValid = false;
    }
    if (formData.category === '') {
      newErrors.category = 'Category is required.';
      isValid = false;
    }
    if (formData.description.trim() === '') {
      newErrors.description = 'Description is required.';
      isValid = false;
    }
    if (formData.image && !formData.image.startsWith('data:image')) {
      newErrors.image = 'Invalid image format.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        setErrors(prev => ({ ...prev, image: 'Invalid image file type.' }));
      }
    }
  };

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     // if (!formData.id) {
  //     //   formData.id = uuidv4();
  //     // }
  //     onSave(formData);
  //     onClose();
  //   }
  // };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    setIsLoading(true);
    // setError(null);

    try {
      const payload = {
        ...formData,
        id: uuidv4()
        // startDate: formatDateToISO(formData.startDate),
        // endDate: formatDateToISO(formData.endDate),
        // linkedKeywords: keywords,
        // campaignStatus: formData.campaignStatus,
      };

      if (isEditMode) {
        await updateProduct(id!, payload);
      } else {
        await createProduct(payload);
      }

      // console.log(pathname);
      if (pathname === '/admin/products') {
        router.refresh();
      } else {
        router.push('/admin/products');
      }

    } catch (err) {
      // setError('Failed to save the campaign. Please try again.');
      console.error('Error saving campaign:', err);
    } finally {
      
      onSave(formData);
      setIsLoading(false);
      onClose();
    }
  };

  // const handleSaveProduct = (product: Product) => {
  //   if (selectedProduct) {
  //     updateProduct(selectedProduct.id, product);
  //   } else {
  //     addProduct(product);
  //   }
  //   setIsModalOpen(false);
  // };

  return (
    isOpen ? (
      <div className="fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg py-8 px-6 md:px-10">
          <h2 className="text-xl font-bold mb-4">{mode === 'view' ? formData.name : formData.id ? 'Edit Product' : 'Add Product'}</h2>

          {mode === 'view' ? (
            <div className="flex flex-col gap-4">
              <button className="absolute top-1 right-2 text-3xl text-gray-700" onClick={onClose}>
                &times;
              </button>
              <div className="relative w-full h-48 sm:h-56 mb-4 self-start cursor-pointer rounded-lg overflow-hidden">
                <Image
                  src={formData.image || '/images/imagePlaceholder.jpeg'}
                  alt={`${formData.name} preview`}
                  fill
                  className="object-cover rounded-t-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p><strong>Price:</strong> ${formData.price}</p>
              <p><strong>Category:</strong> {formData.category}</p>
              <p><strong>Description:</strong> {formData.description}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="inputContainer flex flex-col gap-2">
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="bg-transparent text-gray-700 border rounded-lg border-[#064f38] focus-within:border-[#064f38] focus-within:ring-1 focus-within:ring-[#064f38] focus-within:shadow-[0_0_10px_0_rgba(142,68,173,0.5),0_0_20px_5px_rgba(142,68,173,0.05)] p-3 shadow-lg w-full text-base leading-tight focus:outline-0 focus:ring-0"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="bg-transparent text-gray-700 border rounded-lg border-[#064f38] focus-within:border-[#064f38] focus-within:ring-1 focus-within:ring-[#064f38] focus-within:shadow-[0_0_10px_0_rgba(142,68,173,0.5),0_0_20px_5px_rgba(142,68,173,0.05)] p-3 shadow-lg w-full text-base leading-tight focus:outline-0 focus:ring-0"
              >
                <option value="">Select Category</option>
                {categoryList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="bg-transparent text-gray-700 border rounded-lg border-[#064f38] focus-within:border-[#064f38] focus-within:ring-1 focus-within:ring-[#064f38] focus-within:shadow-[0_0_10px_0_rgba(142,68,173,0.5),0_0_20px_5px_rgba(142,68,173,0.05)] p-3 shadow-lg w-full text-base leading-tight focus:outline-0 focus:ring-0"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="bg-transparent w-full text-gray-700 border rounded-lg border-[#064f38] focus-within:border-[#064f38] focus-within:ring-1 focus-within:ring-[#064f38] focus-within:shadow-[0_0_10px_0_rgba(142,68,173,0.5),0_0_20px_5px_rgba(142,68,173,0.05)] p-3 shadow-lg text-base leading-tight focus:outline-0 focus:ring-0"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              
              {formData.image && (
                <label
                  htmlFor="imageFile" 
                  className='cursor-pointer flex-1 flex items-center gap-1 p-2 border rounded-lg border-[#064f38] focus-within:border-[#064f38] focus-within:ring-1 focus-within:ring-[#064f38] focus-within:shadow-[0_0_10px_0_rgba(142,68,173,0.5),0_0_20px_5px_rgba(142,68,173,0.05)]'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('imageFile')?.click();
                    }
                  }}
                >
                  <div className='w-1/2 text-lg font-semibold text-center underline hover:text-theme'>
                    {/* Image File */}
                    <span className='flex flex-col gap-2 text-gray-800 text-sm'>
                      Image selected
                      <span className='text-red-500 text-xs hover:text-red-700 border-0 ring-0 transition-all duration-300'>Change Image</span>
                    </span>
                  </div>
                  <div className="relative w-full h-24 sm:h-28 self-start rounded-lg overflow-hidden p-4">
                    <span className='text-[#064f38a6] z-50 absolute top-4 md:top-5 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ease-in-out hover:scale-125'> <Add className='text-7xl'/> </span>
                    <Image
                      src={formData.image}
                      alt={`${formData.name} preview`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </label>
              )}

              {!formData.image && (
                <label 
                  htmlFor="imageFile" 
                  className='cursor-pointer flex-1 flex items-center gap-1 p-2 border rounded-lg border-[#064f38] focus-within:border-[#064f38] focus-within:ring-1 focus-within:ring-[#064f38] focus-within:shadow-[0_0_10px_0_rgba(142,68,173,0.5),0_0_20px_5px_rgba(142,68,173,0.05)]'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('imageFile')?.click();
                    }
                  }}
                >
                  <div className='w-1/2 text-lg font-semibold text-center underline hover:text-theme'>
                    <span className='flex flex-col gap-2 text-gray-800 text-sm'>
                      Select Image
                    </span>
                  </div>
                  <div className="relative w-full h-24 sm:h-28 self-start border-2 border-[#064f38] rounded-lg overflow-hidden p-4">
                    <span className='text-[#064f38a6] z-50 absolute top-4 md:top-5 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ease-in-out hover:scale-125'> <Add className='text-7xl'/> </span>
                    <Image
                      src='/images/imagePlaceholder.jpeg'
                      alt={`${formData.name} preview`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </label>
              )}

              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                name="image"
                className="hidden"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              
              <div className="flex item-center justify-center gap-4">
                <button
                  // onClick={handleSubmit}
                  disabled={isLoading}
                  type='submit'
                  className="bg-[#064f38] hover:bg-transparent border border-transparent hover:border-[#064f38] w-full text-white hover:text-[#064f38] rounded-lg px-4 py-3 mt-6 focus:ring-2 focus:ring-[#064f38]"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={onClose}
                  className="border border-[#064f38] text-[#064f38] hover:border-transparent bg-transparent hover:bg-[#064f38] w-full hover:text-white transition-all duration-300 ease-in-out rounded-lg px-4 py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-[#064f38]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    ) : null
  );

  
  // {isModalOpen && (
  //   <ProductModal
  //     isOpen={isModalOpen}
  //     onClose={() => setIsModalOpen(false)}
  //     product={selectedProduct}
  //     // onSave={handleSaveProduct}
  //     mode={modalMode}
  //   />
  // )}

};

export default ProductModal;
