import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
console.log('API_URL:', API_URL);
console.log('API_KEY:', API_KEY);

const gophishService = {

  getCampainData: async () => {
    try {
      console.log('API_URL:', API_URL);
      const response = await axios.get(`${API_URL}/campaigns/`, {
        headers: {
          'Authorization': API_KEY,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
      throw error;
    }
  },

  getCampaignDatawithID: async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/campaigns/${id}/results`, {
        headers: {
          'Authorization': API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
};

export default gophishService;