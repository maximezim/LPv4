import axios from 'axios';

const API_URL = 'http://localhost:3333/api';
const API_KEY = '997c5b79b4811951481bf9dba79840c729d9b77dc3cd88bd76c0eded73f44392';

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