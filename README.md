# 🎓 Student Dropout Risk Analytics & Early Warning System

> **A Machine Learning-powered early warning system for identifying students at risk of dropping out and supporting data-driven student intervention.**

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python\&logoColor=white)](https://www.python.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-Machine%20Learning-F7931E?logo=scikit-learn\&logoColor=white)](https://scikit-learn.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite\&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-UI-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github\&logoColor=white)](https://github.com/)

---

## 📌 Project Overview

Student dropout is an important challenge for educational institutions because identifying academic or socioeconomic risk factors early can help institutions provide appropriate support.

This project develops an end-to-end **Student Dropout Risk Analytics & Early Warning System** that combines **Data Science, Machine Learning, FastAPI, and React** into a practical web-based application.

The system analyzes student information and produces:

* 🎓 Predicted student outcome
* ⚠️ Dropout probability
* 📊 Model probability distribution
* 🚦 Risk classification
* 💡 Recommended intervention action

The project goes beyond a traditional machine learning notebook by integrating the trained model into a working application through a REST API and interactive frontend.

---

## 🎯 Project Objectives

The main objectives of the project are to:

1. Analyze student academic, demographic, financial, and socioeconomic information.
2. Explore patterns associated with student academic outcomes.
3. Develop a machine learning classification model.
4. Estimate the probability of student dropout.
5. Categorize students into different risk levels.
6. Provide an early-warning mechanism for potential dropout cases.
7. Expose the trained model through a FastAPI backend.
8. Build an interactive React-based analytics interface.
9. Present machine learning predictions in an understandable format.

---

## 🧠 Machine Learning Problem

The system treats student academic outcome prediction as a **multi-class classification problem**.

The model predicts one of three outcomes:

| Outcome     | Meaning                                      |
| ----------- | -------------------------------------------- |
| 🎓 Graduate | Student successfully completes the programme |
| 📚 Enrolled | Student remains enrolled                     |
| ⚠️ Dropout  | Student leaves the programme                 |

In addition to the predicted outcome, the system calculates the probability associated with each class.

The **Dropout probability** is then used as an early-warning signal.

---

## 🚦 Risk Classification

The application converts the predicted dropout probability into an interpretable risk level.

| Dropout Probability | Risk Level     |
| ------------------: | -------------- |
|             `< 40%` | 🟢 Low Risk    |
|        `40% – <70%` | 🟡 Medium Risk |
|             `≥ 70%` | 🔴 High Risk   |

These thresholds are implemented in the application metadata and are intended to make model output easier to interpret for users.

---

## 📊 Dataset

The project uses the **UCI Student Performance / Academic Success dataset**, containing student-level information related to academic, demographic, financial, and socioeconomic characteristics.

The dataset contains:

* **4,424 student records**
* **36 original features**
* Multiple demographic and academic variables
* Financial indicators
* Previous qualification information
* Admission information
* Parent education and occupation information
* Macroeconomic indicators

The target variable represents the student's academic outcome:

```text
Dropout
Enrolled
Graduate
```

### Important Features

Examples of features used by the predictive system include:

* Marital Status
* Application Mode
* Application Order
* Course
* Daytime / Evening Attendance
* Previous Qualification
* Previous Qualification Grade
* Nationality
* Mother's Qualification
* Father's Qualification
* Mother's Occupation
* Father's Occupation
* Admission Grade
* Displaced
* Educational Special Needs
* Debtor
* Tuition Fees Up to Date
* Gender
* Scholarship Holder
* Age at Enrollment
* International Student
* Unemployment Rate
* Inflation Rate
* GDP

The project also includes engineered variables used by the trained model, including:

* `Tuition_At_Risk`
* `Scholarship_Status`

---

## 🔬 Data Science Workflow

The project follows an end-to-end data science workflow:

```text
Raw Dataset
     │
     ▼
Data Understanding
     │
     ▼
Data Cleaning & Preparation
     │
     ▼
Exploratory Data Analysis
     │
     ▼
Feature Engineering
     │
     ▼
Statistical Analysis
     │
     ▼
Machine Learning
     │
     ▼
Model Evaluation
     │
     ▼
Early Warning Risk Classification
     │
     ▼
Model Serialization
     │
     ▼
FastAPI REST API
     │
     ▼
React Analytics Dashboard
```

---

## 📈 Exploratory Data Analysis

The notebook performs exploratory analysis to understand relationships between student characteristics and academic outcomes.

The analysis covers areas such as:

* Student outcome distribution
* Demographic characteristics
* Academic background
* Admission grades
* Previous qualification
* Tuition payment status
* Scholarship status
* Debtor status
* Parent education
* Parent occupation
* Age at enrollment
* Macroeconomic indicators

The results are used to understand the structure of the dataset and prepare the data for machine learning.

---

## 🛠️ Feature Engineering

Additional variables are created to improve the interpretability of student risk.

### Tuition At Risk

The system derives:

```text
Tuition_At_Risk
```

based on whether tuition fees are up to date.

### Scholarship Status

The system also creates:

```text
Scholarship_Status
```

which represents whether the student holds a scholarship.

These engineered variables allow the application to present financial information in a more meaningful way while maintaining compatibility with the trained model.

---

## 🤖 Machine Learning Pipeline

The trained machine learning pipeline is saved using **Joblib**.

The application loads the serialized model and uses it to generate predictions for new student information.

The model receives the same feature structure used during training, including the engineered variables.

### Model Output

For each student, the API returns:

```json
{
  "prediction": "Dropout",
  "risk_level": "High Risk",
  "dropout_probability": 71.44,
  "probabilities": {
    "Dropout": 71.44,
    "Enrolled": 18.32,
    "Graduate": 10.23
  },
  "recommendation": "Consider early academic counselling, financial support review, attendance monitoring, and regular student follow-up."
}
```

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │      React Frontend      │
                    │                         │
                    │  Dashboard              │
                    │  Risk Predictor          │
                    │  Students               │
                    │  Analytics              │
                    │  ML Model               │
                    └────────────┬────────────┘
                                 │
                              Axios
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      FastAPI Backend     │
                    │                         │
                    │  REST API               │
                    │  Prediction Endpoint    │
                    │  Dashboard Endpoint     │
                    │  Student Endpoint       │
                    │  Model Information      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Scikit-learn Model    │
                    │                         │
                    │  Preprocessing          │
                    │  Classification         │
                    │  Probability Prediction │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Student Data       │
                    │                         │
                    │  Analytics CSV          │
                    │  Model Metadata         │
                    └─────────────────────────┘
```

---

# ⚡ Backend

The backend is developed using **FastAPI**.

### Available API Endpoints

| Endpoint          | Method | Purpose                     |
| ----------------- | ------ | --------------------------- |
| `/`               | GET    | API welcome/status          |
| `/api/health`     | GET    | Health check                |
| `/api/model-info` | GET    | Model information           |
| `/api/dashboard`  | GET    | Dashboard statistics        |
| `/api/students`   | GET    | Student risk data           |
| `/api/predict`    | POST   | Generate student prediction |
| `/api`            | GET    | API information             |

### Interactive API Documentation

FastAPI automatically provides interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend

The frontend is built using:

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* Lucide React

The interface is designed as a modern analytics dashboard rather than a simple prediction form.

### Main Pages

#### 📊 Dashboard

Provides an overview of:

* Total students
* Dropout statistics
* Risk distribution
* Student outcome distribution
* Key analytics

#### 🔮 Risk Predictor

Allows users to enter student information through human-readable fields instead of raw dataset codes.

The system converts the selected values into the appropriate model input format before sending them to the FastAPI backend.

#### 👨‍🎓 Students

Provides student-level risk information and allows users to inspect prediction results.

#### 📈 Analytics

Provides visual analysis of student outcomes and risk-related information.

#### 🤖 ML Model

Displays information about the trained machine learning model and prediction configuration.

---

# 📁 Project Structure

```text
Student-Dropout-Risk-System/
│
├── backend/
│   │
│   ├── main.py
│   ├── requirements.txt
│   │
│   ├── model/
│   │   ├── student_dropout_early_warning_model.joblib
│   │   └── model_metadata.json
│   │
│   └── data/
│       └── student_dropout_risk_predictions.csv
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── notebook/
│   └── Student_Dropout_Risk_Analytics.ipynb
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/ShahCoding1/student-dropout-risk-system.git
```

Move into the project:

```bash
cd student-dropout-risk-system
```

---

# 🐍 Backend Setup

Move into the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
uvicorn main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Open another terminal.

Move into:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Make sure the FastAPI backend is running before using the prediction functionality.

---

# 🔮 Example Prediction Workflow

A typical prediction follows this process:

```text
User enters student information
             ↓
React frontend validates the form
             ↓
Axios sends data to FastAPI
             ↓
FastAPI prepares model features
             ↓
Trained ML pipeline generates prediction
             ↓
Dropout probability is calculated
             ↓
Risk level is assigned
             ↓
Recommendation is generated
             ↓
Result displayed in React dashboard
```

---

# 💡 Why This Project Matters

A traditional machine learning model usually ends with a prediction inside a notebook.

This project focuses on taking that model one step further:

> **From a machine learning experiment to an actual usable application.**

The system demonstrates how Data Science can be integrated with Software Engineering to create an end-to-end product.

It combines:

**Data Analysis + Machine Learning + API Development + Frontend Engineering + Data Visualization**

This makes the project useful as a practical demonstration of applied machine learning and full-stack development.

---

# 🔐 Responsible Use

This system is intended as an **early-warning and decision-support tool**, not as an automated decision maker.

A high-risk prediction should not automatically be interpreted as proof that a student will drop out.

Predictions should be reviewed alongside:

* Academic performance
* Attendance
* Financial circumstances
* Student engagement
* Individual circumstances
* Support staff observations

The system should support human decision-making rather than replace it.

---

# 🚧 Future Improvements

Planned improvements include:

* [ ] SHAP-based model explainability
* [ ] Individual feature contribution analysis
* [ ] More advanced student analytics
* [ ] Student intervention tracking
* [ ] Historical risk monitoring
* [ ] Authentication and role-based access
* [ ] Database integration
* [ ] Automated notifications
* [ ] Model monitoring
* [ ] Model retraining pipeline
* [ ] Cloud deployment
* [ ] Docker containerization
* [ ] Improved accessibility and responsive design

---

# 🧰 Technology Stack

### Data Science & Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib
* Jupyter Notebook

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* Lucide React

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* Jupyter / Google Colab

---

# 📚 Learning Outcomes

Through this project, I worked across the complete machine learning application lifecycle:

* Data exploration
* Data preprocessing
* Feature engineering
* Statistical analysis
* Machine learning
* Model evaluation
* Model serialization
* REST API development
* Frontend integration
* Data visualization
* Git/GitHub project management

The project strengthened my understanding of how machine learning models can be transformed into practical software systems.

---

# 👨‍💻 Author

**Muhammad Shah Khalid**

Software Engineer | AI/ML & Data Science | Web Development

📍 Pakistan

🔗 GitHub:
https://github.com/ShahCoding1

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Feedback, suggestions, and contributions are welcome.

---

## 📄 License

This project is intended for educational, research, and portfolio purposes.
