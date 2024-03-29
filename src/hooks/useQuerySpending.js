import axios from 'axios';
import { useQuery } from 'react-query';

export const useQuerySpending = () => {
    return useQuery(
      'categories',
      async () => {
        const response = await axios.get('http://localhost:3000/category');
        return response.data
    });
  }

  