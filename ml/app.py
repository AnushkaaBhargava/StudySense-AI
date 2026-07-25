from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app=FastAPI()

model = joblib.load("models/difficulty_model.pkl")

class Features(BaseModel):
    pages:int
    words:int
    avg_sentence_length:float
    technical_terms:int


@app.post("/predict")
def predict(data:Features):
    df=pd.DataFrame([{
        "pages":data.pages,
        "words":data.words,
        "avg_sentence_length":data.avg_sentence_length,
        "technical_terms":data.technical_terms


    }])

    prediction=model.predict(df)[0]

    return{
        "difficulty":prediction
    }


