import axios from 'axios';
import { Product } from '@/types/product';

export async function getProductById(id: string): Promise<any> {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw error; // Lanza el error para que sea manejado por quien llame a esta función
    }
  }
  