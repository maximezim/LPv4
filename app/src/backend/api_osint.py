from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json

app = FastAPI()

# Configurer CORS pour permettre les requêtes depuis React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Remplacez par l'URL de votre frontend pour plus de sécurité
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
        # Exécute Holehe via subprocess
        result = subprocess.check_output(['holehe', email, '--only-used'], text=True)
        print(result)
        return {"success": True, "data": result}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Error running Holehe: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
