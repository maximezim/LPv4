import './App.css'

import { Separator}from './components/ui/separator'
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { useState } from 'react';
import { ButtonNav } from './components/button_nav'; 
import { IoArrowBackCircle } from "react-icons/io5";

import { Phishing } from './components/phishing';


function App() {

  const [page, setPage] = useState("home");
  const handlePageChange = (page: string) => {
    setPage(page);
  }

  return (
      <div className="min-h-screen bg-background text-foreground w-full">
        <DotPattern
          width={15}
          height={15}
          className={cn("[mask-image:radial-gradient(circle_at_center,white,transparent)] z-0 opacity-60 pt-8")}
        />
        <div className='relative px-24 py-16 w-full'>

        { page === "home" && (
          <>

            <h1 className="text-4xl font-bold mb-4">HOME</h1>
            <Separator className='mb-8 mt-8'/>
            <div className="flex gap-8">

              <ButtonNav titre="OSINT" description='Vérifier sur quelles sites une adresse mail est utilisée' handlePageChange={()=>{handlePageChange("osint")}} />
              <ButtonNav titre="PHISHING" description='Visualiser les informations récupérées par formulaire' handlePageChange={()=>{handlePageChange("phishing")}}/>
              <ButtonNav titre="ANALYSE" description='Analyse les informations recupérées et les conséquences associées' handlePageChange={()=>{handlePageChange("analyse")}}/>
            </div>
          </>
          )
        }

        { page === "osint" && (
          <>
            <IoArrowBackCircle size={40} className='text-2xl cursor-pointer absolute top-4 left-4' onClick={()=>{handlePageChange("home")}}/>
            <h1 className="text-4xl font-bold mb-4">OSINT</h1>
            <Separator className='mb-8 mt-8'/>
            
            <div className='mt-8 w-full h-96 bg-slate-50 rounded-sm shadow'>
              
            </div>
          </>
          )
        }

        { page === "phishing" && (
          <>
            <IoArrowBackCircle size={40} className='text-2xl cursor-pointer absolute top-4 left-4' onClick={()=>{handlePageChange("home")}}/>
            <Phishing />

          </>
          )
        }

        { page === "analyse" && (
          <>
           <IoArrowBackCircle size={40} className='text-2xl cursor-pointer absolute top-4 left-4' onClick={()=>{handlePageChange("home")}}/>
            <h1 className="text-4xl font-bold mb-4">ANALYSE</h1>
            <Separator className='mb-8 mt-8'/>
          </>
          )
        }

        </div>
      </div>
  )
}

export default App
