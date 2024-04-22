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
        <div className="max-w-4x1 px-5 py-8 bg-black text-white">
        <h1 className="text-3xl font-semibold mb-4 text-blue-900">{product.title}</h1> {/* Letra rosada oscura */}
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2">
            <div className="rounded-full overflow-hidden w-96 h-105 mb-5">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-5 md:mt-0">
            <p className="font-semibold text-blue-400 mb-0">Price:</p> {/* Letra rosa clara */}
            <p className="text-white-900 mb-0">${product.price}</p> {/* Letra rosada oscura */}
            <p className="font-semibold text-blue-400 mb-0">Category:</p> {/* Letra rosa clara */}
            <p className="text-white-900 mb-0">{product.category}</p> {/* Letra rosada oscura */}
            <p className="font-semibold text-blue-400 mb-0">Rating:</p> {/* Letra rosa clara */}
            <p className="text-white-900 mb-0">{product.rating.rate}</p> {/* Letra rosada oscura */}
            <p className="font-semibold text-blue-400 mb-0">Description:</p> {/* Letra rosa clara */}
            <p className="text-white-900 mb-2">{product.description}</p> {/* Letra rosada oscura */}
          </div>
        </div>
      </div>
      
    </MainLayout>
  );
}
