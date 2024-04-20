import axios from 'axios';
import { Product } from '@/types/product';

export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      // Check if response.data has content before returning
      if (response.data) {
        const convertedId = parseInt(response.data.id, 10); // Assuming integer ID
        return {
          ...response.data,
          id: convertedId, // Replace string ID with converted number
        };
      }
     else {
        console.warn('No product found for ID:', id);
        return undefined; // Handle case where API returns no data
      }
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
      return undefined;
    }
  };
  