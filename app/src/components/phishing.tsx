import { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import gophishService from '../services/gophishService';
import { ImFacebook } from "react-icons/im";
import { ImLinkedin } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { FaCircleQuestion } from "react-icons/fa6";

export const Phishing = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [campaignData, setCampaignData] = useState<any>({});

  useEffect(() => {
    getAllCampaigns();
  }, []);

  const getAllCampaigns = async () => {
    try {
      const data = await gophishService.getCampainData();
      setCampaigns(data);
      console.log('Campaigns:', data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  }

  const getCampaignData = async (id: number) => {
    try {
      const data = await gophishService.getCampaignDatawithID(id);
      setCampaignData(data);
      console.log('Campaign data:', data);
    } catch (error) {
      console.error('Error fetching campaign data:', error);
    }
  }
  
  const onClickCampaign = async (id: number) => {
    try {
      await getCampaignData(id);
    } catch (error) {
      console.error('Error fetching campaign data:', error);
    }
  }

  const getIcon = (name: string) => {
    name = name.toLowerCase();
    switch (name) {
      case 'facebook':
        return <ImFacebook size={50} color='#4B6CD7' />;
      case 'linkedin':
        return <ImLinkedin size={50} color='#0A66C2' />;
      case 'twitter':
        return <ImTwitter size={50} color='#1DA1F2' />;
      default:
        return <FaCircleQuestion size={50} color='303030' />;
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">PHISHING</h1>
      <Separator className='mb-8 mt-8' />
        <div className="grid grid-cols-2 gap-4">
        {
          campaigns.map((campaign: any, index: number) => (
            <div key={index} className="px-6 py-4 border rounded bg-white">
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col items-start'>
                  <p>{campaign.name}</p>
                  <p>{campaign.created_date}</p>
                  <button onClick={() => onClickCampaign(campaign.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">View Details</button>
                </div>
                {getIcon(campaign.name)}
              </div>
            </div>
          ))
        }
        </div>

        <Separator className='mb-8 mt-8' />
        
        <div className="grid grid-cols-3 gap-4">
          {campaignData.timeline?.map((event: any, index: number) => {
            if (event.message !== "Submitted Data") return null;

            let details;
            let site;
            let mail;
            let password;
            try {
              details = JSON.parse(event.details);
              site = campaignData.name; 
              mail = details.payload.email[0]; 
              password = details.payload.password[0];
            } catch (e) {
              console.error('Error parsing JSON:', e);
              return null;
            }

            return (
              <div key={index} className="p-4 border rounded bg-white w-full">
                <p>Mail : {JSON.stringify(mail)}</p>
                <p>Password : {JSON.stringify(password)}</p>
                <a href={`https://www.${site}.com`} target="_blank" rel="noopener noreferrer">
                  <button className="btn w-full mt-3">Accéder à {site}</button>
                </a>
              </div>
            );
          })
          }
          </div>
         
      
        
    </>
  );
};