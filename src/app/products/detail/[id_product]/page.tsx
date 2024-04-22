"use client";

import { MainLayout } from '@/layouts';
import { getProductById } from '@/services/prodcts';
import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id_product } = useParams(); // Obtén el parámetro de la URL correctamente
  
  useEffect(() => {
    if (id_product) { // Verifica si id_product tiene un valor
      getProductById(id_product)
        .then((res) => {
          if (res) {
            setProduct(res); // Utiliza la respuesta directamente
          } else {
            setProduct(null); // Debug
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id_product]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2">
            <img src={product.image} alt={product.title} className="rounded-lg w-full" />
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
            <p className="text-gray-700 mb-2">Categoría: {product.category}</p>
            <p className="text-gray-700 mb-2">Calificación: {product.rating}</p>
            <p className="text-gray-700 mb-2">Descripción:</p>
            <p className="text-gray-900">{product.description}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
