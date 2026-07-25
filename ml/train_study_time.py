import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib
import os

data=pd.read_csv("dataset.csv")

X=data[[
    "pages",
    "words",
    "avg_sentence_length",
    "technical_terms"
]]

y=data["study_time"]

X_train,X_test,y_train,y_test= train_test_split(X,y,test_size=0.2,random_state=42)

model=RandomForestRegressor(
    n_estimators=150,
    random_state=42
)

model.fit(X_train,y_train)

predictions=model.predict(X_test)

mae=mean_absolute_error(y_test,predictions)

print(f"Mean Absolute Error: {mae:.2f} minutes")

# Create models folder if it doesn't exist
os.makedirs("models", exist_ok=True)

# Save trained model
joblib.dump(model, "models/study_time_model.pkl")

print("Study Time Model saved successfully!")