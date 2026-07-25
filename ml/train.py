import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

data=pd.read_csv("dataset.csv")

X=data[["pages",
        "words",
        "avg_sentence_length",
        "technical_terms"]]

y=data["difficulty"]

X_train, X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)

model=RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train,y_train)

predictions=model.predict(X_test)

accuracy=accuracy_score(y_test,predictions)

print("Accuracy:", accuracy)

# Create models folder
os.makedirs("models", exist_ok=True)

# Save model
joblib.dump(
    model,
    "models/difficulty_model.pkl"
)

print("Model saved successfully!")