import axios from "axios";

const BASE_URL = 'http://localhost:3000/items';


const ProductsApi = {
    getAllProducts: async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    }
}


export const updateProduct = async (productId, updatedFields) => {
    
    try {
      const response = await axios.put(`${BASE_URL}/${productId}`, updatedFields);
      return response.data;
    } catch (error) {
      console.error('Update Product Error:', error);
      throw error;
    }
}



export default ProductsApi;