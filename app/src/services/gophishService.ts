import axios from 'axios';

const API_URL = '/api';
const API_KEY = 'a653da1bc1b2264f9e2a8abf78a436b73fb252f3cafb74ba009c8366cf829a8b';

const gophishService = {

  getCampainData: async () => {
    try {
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