from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json

app = FastAPI()

# Configurer CORS pour permettre les requêtes depuis React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    email: str

@app.post("/")
async def check_email(request: EmailRequest):
    email = request.email
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    try:
        # Exécuter Holehe
        holehe_result = subprocess.check_output(
            ['holehe', email, '--only-used'], text=True
        )

        # Retourner les résultats combinés
        return {
            "success": True,
            "holehe_data": holehe_result,
        }
        
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Error running command: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
