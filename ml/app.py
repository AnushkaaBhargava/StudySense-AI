from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app=FastAPI()

difficulty_model = joblib.load("models/difficulty_model.pkl")
study_time_model = joblib.load("models/study_time_model.pkl")

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

    prediction=difficulty_model.predict(df)[0]
    study_time = study_time_model.predict(df)[0]

    return{
        "difficulty":prediction,
        "study_time":round(study_time)
    }


