"use client";

import { MainLayout } from '@/layouts';
import { getProductById } from '@/services/productService';
import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();
  const { id_product } = params;

  useEffect(() => {
      getProductById(id_product as string)
        .then((res) => {
       
            setProduct(res);
        
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        })
        .finally(() => setIsLoading(false));
   
  }, []);


  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  else return (
    <MainLayout>
        <div className="max-w-6x2 px-5 py-8 ml-4 bg-white text-black rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-400 md:text-center">{product.title}</h1>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden w-60 h-80 md:w-75 md:h-100 mb-5 mx-auto md:ml-auto flex justify-center items-center"> 
              <img src={product.image} alt={product.title} className="max-w-90 max-h-full opacity-70 mt-2" /> 
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-2 md:mt-0 md:text-left">
            <p className="font-semibold text-blue-300 mb-0">Price:</p> 
            <p className="text-lg text-gray-400 semi-bold">${product.price}</p> 
            <p className="font-semibold text-blue-300 mb-0">Category:</p> 
            <p className="text-gray-400 mb-0">{product.category}</p> 
            <p className="font-semibold text-blue-300 mb-0">Rating:</p> 
            <p className="text-gray-400 mb-0">{product.rating.rate}</p> 
            <p className="font-semibold text-blue-300 mb-0 mt-2">Description:</p> 
            <p className="text-gray-400 inline italic ">{product.description}</p> 
          </div>
          <div className="text-xs text-gray-300 inline italic ml-24">
  <p>* Reference image, may difer from real the product</p>
</div>
<button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-6 mr-3 rounded">
  To cart
</button>

        </div>
      </div>
      
    </MainLayout>
  );
}
