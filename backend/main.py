from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import json
import pandas as pd
import numpy as np
from pathlib import Path


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = (
    BASE_DIR
    / "model"
    / "student_dropout_early_warning_model.joblib"
)

METADATA_PATH = (
    BASE_DIR
    / "model"
    / "model_metadata.json"
)

DATA_PATH = (
    BASE_DIR
    / "data"
    / "student_dropout_risk_predictions.csv"
)


# ============================================================
# LOAD MODEL
# ============================================================

try:

    model = joblib.load(MODEL_PATH)

except Exception as e:

    raise RuntimeError(
        f"Could not load ML model: {e}"
    )


# ============================================================
# LOAD METADATA
# ============================================================

try:

    with open(METADATA_PATH, "r") as file:
        metadata = json.load(file)

except Exception as e:

    raise RuntimeError(
        f"Could not load model metadata: {e}"
    )


# ============================================================
# LOAD PREDICTION DATA
# ============================================================

try:

    predictions_df = pd.read_csv(
        DATA_PATH
    )

except Exception as e:

    raise RuntimeError(
        f"Could not load prediction CSV: {e}"
    )


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Student Dropout Risk Analytics API",
    description=(
        "Machine Learning API for Student "
        "Dropout Risk Analytics and Early Warning."
    ),
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# INPUT SCHEMA
# ============================================================

class StudentData(BaseModel):

    marital_status: int = Field(
        ...,
        description="Marital status code"
    )

    application_mode: int = Field(
        ...,
        description="Application mode code"
    )

    application_order: int = Field(
        ...,
        ge=0,
        description="Application order"
    )

    course: int = Field(
        ...,
        description="Course code"
    )

    daytime_evening_attendance: int = Field(
        ...,
        description="Daytime/evening attendance"
    )

    previous_qualification: int = Field(
        ...,
        description="Previous qualification code"
    )

    previous_qualification_grade: float = Field(
        ...,
        ge=0,
        description="Previous qualification grade"
    )

    nationality: int = Field(
        ...,
        description="Nationality code"
    )

    mothers_qualification: int = Field(
        ...,
        description="Mother's qualification code"
    )

    fathers_qualification: int = Field(
        ...,
        description="Father's qualification code"
    )

    mothers_occupation: int = Field(
        ...,
        description="Mother's occupation code"
    )

    fathers_occupation: int = Field(
        ...,
        description="Father's occupation code"
    )

    admission_grade: float = Field(
        ...,
        ge=0,
        description="Admission grade"
    )

    displaced: int = Field(
        ...,
        description="Displaced student indicator"
    )

    educational_special_needs: int = Field(
        ...,
        description="Educational special needs indicator"
    )

    debtor: int = Field(
        ...,
        description="Debtor indicator"
    )

    tuition_fees_up_to_date: int = Field(
        ...,
        description="Tuition fees status"
    )

    gender: int = Field(
        ...,
        description="Gender code"
    )

    scholarship_holder: int = Field(
        ...,
        description="Scholarship holder indicator"
    )

    age_at_enrollment: int = Field(
        ...,
        ge=10,
        le=100,
        description="Age at enrollment"
    )

    international: int = Field(
        ...,
        description="International student indicator"
    )

    unemployment_rate: float = Field(
        ...,
        description="Unemployment rate"
    )

    inflation_rate: float = Field(
        ...,
        description="Inflation rate"
    )

    gdp: float = Field(
        ...,
        description="GDP"
    )


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():

    return {
        "application":
            "Student Dropout Risk Analytics",

        "status":
            "running",

        "version":
            "1.0.0"
    }


# ============================================================
# HEALTH ENDPOINT
# ============================================================

@app.get("/api/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "prediction_records":
            len(predictions_df)
    }


# ============================================================
# MODEL INFORMATION
# ============================================================

@app.get("/api/model-info")
def model_info():

    return {
        "target_classes":
            metadata.get(
                "target_classes",
                []
            ),

        "dropout_class":
            metadata.get(
                "dropout_class",
                "Dropout"
            ),

        "risk_thresholds":
            metadata.get(
                "risk_thresholds",
                {}
            )
    }


# ============================================================
# DASHBOARD SUMMARY
# ============================================================

@app.get("/api/dashboard")
def dashboard():

    total_students = len(
        predictions_df
    )

    response = {
        "total_students":
            int(total_students)
    }

    # --------------------------------------------------------
    # Risk level
    # --------------------------------------------------------

    if "Risk_Level" in predictions_df.columns:

        risk_counts = (
            predictions_df[
                "Risk_Level"
            ]
            .value_counts()
            .to_dict()
        )

        response["risk_distribution"] = {
            str(key): int(value)
            for key, value
            in risk_counts.items()
        }

    # --------------------------------------------------------
    # Actual outcome
    # --------------------------------------------------------

    possible_target_columns = [
        "Target",
        "target",
        "Outcome",
        "outcome"
    ]

    target_column = None

    for column in possible_target_columns:

        if column in predictions_df.columns:

            target_column = column
            break

    if target_column:

        outcome_counts = (
            predictions_df[
                target_column
            ]
            .value_counts()
            .to_dict()
        )

        response["outcome_distribution"] = {
            str(key): int(value)
            for key, value
            in outcome_counts.items()
        }

    # --------------------------------------------------------
    # Dropout probability
    # --------------------------------------------------------

    probability_columns = [
        "Dropout_Probability",
        "Dropout Probability",
        "Dropout_Probability_%",
        "Dropout Probability %"
    ]

    probability_column = None

    for column in probability_columns:

        if column in predictions_df.columns:

            probability_column = column
            break

    if probability_column:

        probabilities = pd.to_numeric(
            predictions_df[
                probability_column
            ],
            errors="coerce"
        )

        response[
            "average_dropout_probability"
        ] = round(
            float(
                probabilities.mean()
            ),
            2
        )

    return response


# ============================================================
# STUDENT RECORDS
# ============================================================

@app.get("/api/students")
def students(
    limit: int = 100,
    risk: str | None = None
):

    data = predictions_df.copy()

    # --------------------------------------------------------
    # Filter by risk
    # --------------------------------------------------------

    if (
        risk
        and
        "Risk_Level" in data.columns
    ):

        data = data[
            data[
                "Risk_Level"
            ].str.lower()
            ==
            risk.lower()
        ]

    # --------------------------------------------------------
    # Limit records
    # --------------------------------------------------------

    data = data.head(
        max(
            1,
            min(
                limit,
                1000
            )
        )
    )

    # --------------------------------------------------------
    # Replace NaN
    # --------------------------------------------------------

    data = data.replace(
        {
            np.nan: None
        }
    )

    return {
        "count": len(data),
        "students":
            data.to_dict(
                orient="records"
            )
    }


# ============================================================
# SINGLE STUDENT PREDICTION
# ============================================================

@app.post("/api/predict")
def predict_student(
    student: StudentData
):

    try:

        # ----------------------------------------------------
        # Convert API input to model feature names
        # ----------------------------------------------------

        data = pd.DataFrame([{

            "Marital Status":
                student.marital_status,

            "Application mode":
                student.application_mode,

            "Application order":
                student.application_order,

            "Course":
                student.course,

            "Daytime/evening attendance":
                student.daytime_evening_attendance,

            "Previous qualification":
                student.previous_qualification,

            "Previous qualification (grade)":
                student.previous_qualification_grade,

            "Nacionality":
                student.nationality,

            "Mother's qualification":
                student.mothers_qualification,

            "Father's qualification":
                student.fathers_qualification,

            "Mother's occupation":
                student.mothers_occupation,

            "Father's occupation":
                student.fathers_occupation,

            "Admission grade":
                student.admission_grade,

            "Displaced":
                student.displaced,

            "Educational special needs":
                student.educational_special_needs,

            "Debtor":
                student.debtor,

            "Tuition fees up to date":
                student.tuition_fees_up_to_date,

            "Gender":
                student.gender,

            "Scholarship holder":
                student.scholarship_holder,

            "Age at enrollment":
                student.age_at_enrollment,

            "International":
                student.international,

            "Unemployment rate":
                student.unemployment_rate,

            "Inflation rate":
                student.inflation_rate,

            "GDP":
                student.gdp,

            # Engineered features
            "Tuition_At_Risk":
                int(
                    student.tuition_fees_up_to_date
                    == 0
                ),

            "Scholarship_Status":
                (
                    "Scholarship"
                    if student.scholarship_holder == 1
                    else "No Scholarship"
                )
        }])


        # ----------------------------------------------------
        # Ensure exact feature order
        # ----------------------------------------------------

        expected_features = (
            model
            .named_steps[
                "preprocessor"
            ]
            .feature_names_in_
            .tolist()
        )

        data = data[
            expected_features
        ]


        # ----------------------------------------------------
        # Prediction
        # ----------------------------------------------------

        prediction = model.predict(
            data
        )[0]

        probabilities = (
            model.predict_proba(
                data
            )[0]
        )

        classes = metadata[
            "target_classes"
        ]

        probability_dict = {
            classes[i]:
                float(
                    probabilities[i]
                )
            for i in range(
                len(classes)
            )
        }


        # ----------------------------------------------------
        # Dropout probability
        # ----------------------------------------------------

        dropout_probability = (
            probability_dict.get(
                "Dropout",
                0
            )
        )


        # ----------------------------------------------------
        # Risk classification
        # ----------------------------------------------------

        if dropout_probability >= 0.70:

            risk_level = "High Risk"

        elif dropout_probability >= 0.40:

            risk_level = "Medium Risk"

        else:

            risk_level = "Low Risk"


        # ----------------------------------------------------
        # Recommendation
        # ----------------------------------------------------

        if risk_level == "High Risk":

            recommendation = (
                "Consider early academic counselling, "
                "financial support review, attendance "
                "monitoring, and regular student follow-up."
            )

        elif risk_level == "Medium Risk":

            recommendation = (
                "Continue academic monitoring and "
                "consider targeted student support."
            )

        else:

            recommendation = (
                "Continue normal academic monitoring "
                "and student engagement."
            )


        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {

            "prediction":
                str(prediction),

            "risk_level":
                risk_level,

            "dropout_probability":
                round(
                    dropout_probability * 100,
                    2
                ),

            "probabilities": {
                key:
                    round(
                        value * 100,
                        2
                    )
                for key, value
                in probability_dict.items()
            },

            "recommendation":
                recommendation
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ============================================================
# RUN INFORMATION
# ============================================================

@app.get("/api")
def api_info():

    return {

        "message":
            "Student Dropout Risk Analytics API",

        "endpoints": [

            "GET /",

            "GET /api/health",

            "GET /api/model-info",

            "GET /api/dashboard",

            "GET /api/students",

            "POST /api/predict"
        ]
    }