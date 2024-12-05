// 'use client';

// import React, { useEffect, useState } from 'react';
// import { VisibilityOutlined, DeleteOutline, EditNote } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';
// import ProductDeleteModal from '@/components/admin/ProductDeleteModal';
// import ProductDeletedModal from '@/components/admin/ProductDeletedModal';
// import BasicPagination from '../Pagination';
// import Image from 'next/image';
// import { deleteProduct, getProducts } from '@/lib/api';
// import { Product } from '@/utils/types';
// import Loading from '@/app/loading';

// // Define the Product interface
// // interface Product {
// //   _id: number;
// //   name: string;
// //   image: string;
// //   price: number;
// //   description: string;
// // }

// interface CampaignTableProps {
//   // onEdit: (product: Product) => void;
//   error: string | null;
// }

// // const ProductTable: React.FC<CampaignTableProps> = ({ onEdit, error }) => {
// const ProductTable: React.FC<CampaignTableProps> = ({ error }) => {
//   const router = useRouter();
//   const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
//   const [showDeletedModal, setShowDeletedModal] = useState<boolean>(false);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   // const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
//   console.log(isModalOpen, selectedProduct, modalMode);

//   // ============== pagination =================
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [productsPerPage, setProductsPerPage] = useState<number>(5);
//   const [totalProducts, setTotalProducts] = useState<number>(0);

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);

//       try {
//         const products = await getProducts();
//         setProducts(products);
//         setTotalProducts(products.length);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         // setError('Failed to fetch products.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(totalProducts / productsPerPage);
  
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//   // ============== pagination =================


//   if (error) return <p className='text-red-500'>{error}</p>;

//   const handleAddEditProduct = (product?: Product) => {
//     setSelectedProduct(product || null);
//     setModalMode(product ? 'edit' : 'edit');
//     setIsModalOpen(true);
//   };

//   const handleView = (id: string) => {
//     router.push(`/admin/products/${id}`);
//   };

//   const handleDeleteClick = (id: string) => {
//     setDeletingId(id);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (deletingId) {
//       try {
//         await deleteProduct(deletingId);
//         setShowDeleteModal(false);
//         setShowDeletedModal(true);
//       } catch (err) {
//         console.log('Failed to delete product');
//       } finally {
//         setDeletingId(null);
//       }
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteModal(false);
//     setDeletingId(null);
//   };

//   const handleCloseDeletedModal = () => {
//     setShowDeletedModal(false);
//   };

  
//   // ============== pagination =================
//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setProductsPerPage(Number(event.target.value));
//     // setProductsPerPage(products.length < Number(event.target.value) ? products.length : Number(event.target.value));
//     setCurrentPage(1);
//   };
//   // ============== pagination =================

//   if (loading) return <Loading />;


//   return (
//     <>
//       {
//         loading ? <Loading/> : 
      
//         products && products.length > 0 ? (
//           <>
//             <div className='custom-scrollbar overflow-x-scroll'>
//               <table className='min-w-full divide-y divide-gray-200'>
//                 <thead className='bg-gray-50'>
//                   <tr className='border-0 rounded-[4px]'>
//                     <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>S/N</th>
//                     <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Product</th>
//                     <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Product Name</th>
//                     <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Price</th>
//                     <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Status</th>
//                     <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className='bg-white divide-y divide-gray-200'>
//                   {/* {products.slice(0, 10).map((product, index) => ( */}
//                   {currentProducts.slice(0, 10).map((product, index) => (
//                     <tr key={product._id} className='border-b'>
//                       <td className='px-6 py-2 text-xs whitespace-nowrap'>{index + 1}.</td>
//                       <td className='px-6 py-2 text-xs whitespace-nowrap'>
//                         <div className="relative w-10 h-10 flex justify-center rounded-full">
//                           <Image
//                             src={product.image}
//                             alt={`${product.name} preview`}
//                             fill
//                             className="object-cover rounded-full"
//                             sizes="(max-width: 768px) 100vw, 50vw"
//                           />
//                         </div>
//                       </td>
//                       <td className='px-6 py-2 text-xs whitespace-nowrap'>{product.name}</td>
//                       <td className='px-6 py-2 text-xs whitespace-nowrap'>{product.price}</td>
//                       <td className={`${product.description === 'active' ? 'text-green-500' : 'text-red-700'} px-6 py-2 text-xs whitespace-nowrap`}>
//                         {product.description === 'active' ? "Active" : "Inactive"}
//                       </td>
//                       <td className='px-6 py-5 text-xs whitespace-nowrap flex items-center space-x-2'>
//                         <button onClick={() => handleView(product._id)} className='text-[#666666] hover:text-green-700'>
//                           <VisibilityOutlined style={{ width: '17px', height: '17px' }} />
//                         </button>
//                         <button onClick={() => handleAddEditProduct(product)} className='text-[#666666] hover:text-blue-700'>
//                           <EditNote style={{ width: '19px', height: '19px' }} />
//                         </button>
//                         <button onClick={() => handleDeleteClick(product._id)} className='text-[#666666] hover:text-red-700'>
//                           <DeleteOutline style={{ width: '17px', height: '17px' }} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className='pagination mt-6 flex flex-col md:flex-row items-center justify-between'>
//               <div className='pages flex items-center justify-between gap-3'>
//                 <span>Showing</span>

//                 <div className="select-container">
//                   <select
//                     value={productsPerPage}
//                     onChange={handleRowsPerPageChange}
//                     className="span"
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                     <option value={50}>50</option>
//                     <option value={100}>100</option>
//                   </select>
//                 </div>

//                 <span>out of {totalProducts}</span>
//               </div>
//               <BasicPagination count={totalPages} onPageChange={paginate} currentPage={currentPage} />
//             </div>
//           </>

//       ) : (
//         <div className='text-center text-xl text-gray-600'>No Products found</div>
//       )}

//       {showDeleteModal && (
//         <ProductDeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
//       )}

//       {showDeletedModal && (
//         <ProductDeletedModal onClose={handleCloseDeletedModal} />
//       )}
//     </>
//   );
// };

// export default ProductTable;
