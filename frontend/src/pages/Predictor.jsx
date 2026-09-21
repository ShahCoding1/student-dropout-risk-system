import { useState } from "react";
import {
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  User,
  GraduationCap,
  Users,
  WalletCards,
  Globe,
  ChevronDown,
} from "lucide-react";

import { predictStudent } from "../services/api";

/*
  IMPORTANT:
  The UI uses human-readable labels.
  The values sent to FastAPI remain the original UCI numeric codes.
*/

const initialForm = {
  marital_status: 1,
  application_mode: 17,
  application_order: 0,
  course: 171,
  daytime_evening_attendance: 1,
  previous_qualification: 1,
  previous_qualification_grade: 120,
  nationality: 1,
  mothers_qualification: 13,
  fathers_qualification: 10,
  mothers_occupation: 6,
  fathers_occupation: 10,
  admission_grade: 130,
  displaced: 0,
  educational_special_needs: 0,
  debtor: 0,
  tuition_fees_up_to_date: 1,
  gender: 1,
  scholarship_holder: 0,
  age_at_enrollment: 20,
  international: 0,
  unemployment_rate: 10.8,
  inflation_rate: 1.4,
  gdp: 1.74,
};

/* =========================================================
   UCI DATASET MAPPINGS
========================================================= */

const maritalStatuses = [
  { value: 1, label: "Single" },
  { value: 2, label: "Married" },
  { value: 3, label: "Widower" },
  { value: 4, label: "Divorced" },
  { value: 5, label: "Facto Union" },
  { value: 6, label: "Legally Separated" },
];

const applicationModes = [
  { value: 1, label: "1st Phase - General Contingent" },
  { value: 2, label: "Ordinance No. 612/93" },
  {
    value: 5,
    label: "1st Phase - Special Contingent (Azores Island)",
  },
  { value: 7, label: "Holder of Other Higher Courses" },
  { value: 10, label: "Ordinance No. 854-B/99" },
  { value: 15, label: "International Student (Bachelor)" },
  {
    value: 16,
    label: "1st Phase - Special Contingent (Madeira Island)",
  },
  { value: 17, label: "2nd Phase - General Contingent" },
  { value: 18, label: "3rd Phase - General Contingent" },
  {
    value: 26,
    label: "Ordinance No. 533-A/99 - Different Plan",
  },
  {
    value: 27,
    label: "Ordinance No. 533-A/99 - Other Institution",
  },
  { value: 39, label: "Over 23 Years Old" },
  { value: 42, label: "Transfer" },
  { value: 43, label: "Change of Course" },
  {
    value: 44,
    label: "Technological Specialization Diploma Holder",
  },
  {
    value: 51,
    label: "Change of Institution/Course",
  },
  { value: 53, label: "Short Cycle Diploma Holder" },
  {
    value: 57,
    label: "Change of Institution/Course (International)",
  },
];

const courses = [
  { value: 33, label: "Biofuel Production Technologies" },
  { value: 171, label: "Animation and Multimedia Design" },
  { value: 8014, label: "Social Service (Evening Attendance)" },
  { value: 9003, label: "Agronomy" },
  { value: 9070, label: "Communication Design" },
  { value: 9085, label: "Veterinary Nursing" },
  { value: 9119, label: "Informatics Engineering" },
  { value: 9130, label: "Equinculture" },
  { value: 9147, label: "Management" },
  { value: 9238, label: "Social Service" },
  { value: 9254, label: "Tourism" },
  { value: 9500, label: "Nursing" },
  { value: 9556, label: "Oral Hygiene" },
  { value: 9670, label: "Advertising and Marketing Management" },
  { value: 9773, label: "Journalism and Communication" },
  { value: 9853, label: "Basic Education" },
  { value: 9991, label: "Management (Evening Attendance)" },
];

const previousQualifications = [
  { value: 1, label: "Secondary Education" },
  { value: 2, label: "Higher Education - Bachelor's Degree" },
  { value: 3, label: "Higher Education - Degree" },
  { value: 4, label: "Higher Education - Master's" },
  { value: 5, label: "Higher Education - Doctorate" },
  { value: 6, label: "Frequency of Higher Education" },
  { value: 9, label: "12th Year of Schooling - Not Completed" },
  { value: 10, label: "11th Year of Schooling - Not Completed" },
  { value: 12, label: "Other - 11th Year of Schooling" },
  { value: 14, label: "10th Year of Schooling" },
  {
    value: 15,
    label: "10th Year of Schooling - Not Completed",
  },
  {
    value: 19,
    label: "Basic Education 3rd Cycle or Equivalent",
  },
  {
    value: 38,
    label: "Basic Education 2nd Cycle or Equivalent",
  },
  {
    value: 39,
    label: "Technological Specialization Course",
  },
  {
    value: 40,
    label: "Higher Education - Degree (1st Cycle)",
  },
  {
    value: 42,
    label: "Professional Higher Technical Course",
  },
  {
    value: 43,
    label: "Higher Education - Master's (2nd Cycle)",
  },
];

const nationalities = [
  { value: 1, label: "Portuguese" },
  { value: 2, label: "German" },
  { value: 6, label: "Spanish" },
  { value: 11, label: "Italian" },
  { value: 13, label: "Dutch" },
  { value: 14, label: "English" },
  { value: 17, label: "Lithuanian" },
  { value: 21, label: "Angolan" },
  { value: 22, label: "Cape Verdean" },
  { value: 24, label: "Guinean" },
  { value: 25, label: "Mozambican" },
  { value: 26, label: "Santomean" },
  { value: 32, label: "Turkish" },
  { value: 41, label: "Brazilian" },
  { value: 62, label: "Romanian" },
  { value: 100, label: "Moldova (Republic of)" },
  { value: 101, label: "Mexican" },
  { value: 103, label: "Ukrainian" },
  { value: 105, label: "Russian" },
  { value: 108, label: "Cuban" },
  { value: 109, label: "Colombian" },
];

const parentQualifications = [
  { value: 1, label: "Secondary Education - 12th Year" },
  { value: 2, label: "Higher Education - Bachelor's Degree" },
  { value: 3, label: "Higher Education - Degree" },
  { value: 4, label: "Higher Education - Master's" },
  { value: 5, label: "Higher Education - Doctorate" },
  { value: 6, label: "Frequency of Higher Education" },
  { value: 9, label: "12th Year - Not Completed" },
  { value: 10, label: "11th Year - Not Completed" },
  { value: 11, label: "7th Year (Old)" },
  { value: 12, label: "Other - 11th Year" },
  { value: 13, label: "2nd Year Complementary High School" },
  { value: 14, label: "10th Year of Schooling" },
  { value: 18, label: "General Commerce Course" },
  { value: 19, label: "Basic Education 3rd Cycle" },
  { value: 20, label: "Complementary High School Course" },
  { value: 22, label: "Technical-Professional Course" },
  {
    value: 25,
    label: "Complementary High School - Not Concluded",
  },
  { value: 26, label: "7th Year of Schooling" },
  {
    value: 27,
    label: "2nd Cycle of General High School Course",
  },
  { value: 29, label: "9th Year - Not Completed" },
  { value: 30, label: "8th Year of Schooling" },
  {
    value: 31,
    label: "General Course of Administration and Commerce",
  },
  {
    value: 33,
    label: "Supplementary Accounting and Administration",
  },
  { value: 34, label: "Unknown" },
  { value: 35, label: "Cannot Read or Write" },
  {
    value: 36,
    label: "Can Read Without 4th Year of Schooling",
  },
  {
    value: 37,
    label: "Basic Education 1st Cycle",
  },
  {
    value: 38,
    label: "Basic Education 2nd Cycle",
  },
  {
    value: 39,
    label: "Technological Specialization Course",
  },
  {
    value: 40,
    label: "Higher Education - Degree (1st Cycle)",
  },
  {
    value: 41,
    label: "Specialized Higher Studies Course",
  },
  {
    value: 42,
    label: "Professional Higher Technical Course",
  },
  {
    value: 43,
    label: "Higher Education - Master's",
  },
  {
    value: 44,
    label: "Higher Education - Doctorate",
  },
];

const occupations = [
  { value: 0, label: "Student" },
  {
    value: 1,
    label: "Legislative / Executive / Manager",
  },
  {
    value: 2,
    label: "Intellectual / Scientific Professional",
  },
  {
    value: 3,
    label: "Technician / Associate Professional",
  },
  {
    value: 4,
    label: "Administrative / Office Worker",
  },
  {
    value: 5,
    label: "Services / Sales Worker",
  },
  {
    value: 6,
    label: "Agricultural / Skilled Worker",
  },
  {
    value: 7,
    label: "Craft / Related Trade Worker",
  },
  {
    value: 8,
    label: "Plant / Machine Operator",
  },
  {
    value: 9,
    label: "Elementary Occupation",
  },
  {
    value: 10,
    label: "Armed Forces",
  },
  {
    value: 90,
    label: "Other / Unspecified",
  },
  {
    value: 99,
    label: "Other / Unspecified",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function Predictor() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await predictStudent(form);
      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to generate prediction. Please check the API connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const riskClass =
    result?.risk_level === "High Risk"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : result?.risk_level === "Medium Risk"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
            <Target size={22} />
          </div>

          <div>
            <p className="text-sm text-indigo-400">
              Machine Learning Prediction
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Student Risk Predictor
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Enter student information using normal human-readable options.
          The system converts these selections into the encoded values
          required by the trained machine learning model.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL */}
          <Section
            icon={User}
            title="Personal Information"
            description="Basic demographic information about the student."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Marital Status"
                name="marital_status"
                value={form.marital_status}
                onChange={handleChange}
                options={maritalStatuses}
              />

              <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  { value: 1, label: "Male" },
                  { value: 0, label: "Female" },
                ]}
              />

              <SelectField
                label="Nationality"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                options={nationalities}
              />

              <NumberField
                label="Age at Enrollment"
                name="age_at_enrollment"
                value={form.age_at_enrollment}
                onChange={handleChange}
                min="15"
                max="100"
              />

              <SelectField
                label="International Student"
                name="international"
                value={form.international}
                onChange={handleChange}
                options={[
                  { value: 0, label: "No" },
                  { value: 1, label: "Yes" },
                ]}
              />

              <SelectField
                label="Displaced Student"
                name="displaced"
                value={form.displaced}
                onChange={handleChange}
                options={[
                  { value: 0, label: "No" },
                  { value: 1, label: "Yes" },
                ]}
              />

              <SelectField
                label="Educational Special Needs"
                name="educational_special_needs"
                value={form.educational_special_needs}
                onChange={handleChange}
                options={[
                  { value: 0, label: "No" },
                  { value: 1, label: "Yes" },
                ]}
              />
            </div>
          </Section>

          {/* ACADEMIC */}
          <Section
            icon={GraduationCap}
            title="Academic Background"
            description="Information about admission and previous education."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Course"
                name="course"
                value={form.course}
                onChange={handleChange}
                options={courses}
              />

              <SelectField
                label="Application Mode"
                name="application_mode"
                value={form.application_mode}
                onChange={handleChange}
                options={applicationModes}
              />

              <SelectField
                label="Application Order"
                name="application_order"
                value={form.application_order}
                onChange={handleChange}
                options={[
                  { value: 0, label: "1st Choice" },
                  { value: 1, label: "2nd Choice" },
                  { value: 2, label: "3rd Choice" },
                  { value: 3, label: "4th Choice" },
                  { value: 4, label: "5th Choice" },
                  { value: 5, label: "6th Choice" },
                  { value: 6, label: "7th Choice" },
                  { value: 7, label: "8th Choice" },
                  { value: 8, label: "9th Choice" },
                  { value: 9, label: "10th Choice" },
                ]}
              />

              <SelectField
                label="Previous Qualification"
                name="previous_qualification"
                value={form.previous_qualification}
                onChange={handleChange}
                options={previousQualifications}
              />

              <NumberField
                label="Previous Qualification Grade"
                name="previous_qualification_grade"
                value={form.previous_qualification_grade}
                onChange={handleChange}
                min="0"
                max="200"
                step="0.01"
              />

              <NumberField
                label="Admission Grade"
                name="admission_grade"
                value={form.admission_grade}
                onChange={handleChange}
                min="0"
                max="200"
                step="0.01"
              />

              <SelectField
                label="Attendance Schedule"
                name="daytime_evening_attendance"
                value={form.daytime_evening_attendance}
                onChange={handleChange}
                options={[
                  { value: 1, label: "Daytime" },
                  { value: 0, label: "Evening" },
                ]}
              />
            </div>
          </Section>

          {/* FAMILY */}
          <Section
            icon={Users}
            title="Family & Socioeconomic Background"
            description="Parents' education and occupation information."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Mother's Qualification"
                name="mothers_qualification"
                value={form.mothers_qualification}
                onChange={handleChange}
                options={parentQualifications}
              />

              <SelectField
                label="Father's Qualification"
                name="fathers_qualification"
                value={form.fathers_qualification}
                onChange={handleChange}
                options={parentQualifications}
              />

              <SelectField
                label="Mother's Occupation"
                name="mothers_occupation"
                value={form.mothers_occupation}
                onChange={handleChange}
                options={occupations}
              />

              <SelectField
                label="Father's Occupation"
                name="fathers_occupation"
                value={form.fathers_occupation}
                onChange={handleChange}
                options={occupations}
              />
            </div>
          </Section>

          {/* FINANCIAL */}
          <Section
            icon={WalletCards}
            title="Financial & Enrollment Status"
            description="Financial and enrollment-related indicators."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Tuition Fees Up to Date"
                name="tuition_fees_up_to_date"
                value={form.tuition_fees_up_to_date}
                onChange={handleChange}
                options={[
                  { value: 1, label: "Yes - Up to Date" },
                  { value: 0, label: "No - Outstanding" },
                ]}
              />

              <SelectField
                label="Scholarship Holder"
                name="scholarship_holder"
                value={form.scholarship_holder}
                onChange={handleChange}
                options={[
                  { value: 1, label: "Yes" },
                  { value: 0, label: "No" },
                ]}
              />

              <SelectField
                label="Debtor"
                name="debtor"
                value={form.debtor}
                onChange={handleChange}
                options={[
                  { value: 0, label: "No" },
                  { value: 1, label: "Yes" },
                ]}
              />
            </div>
          </Section>

          {/* ECONOMIC */}
          <Section
            icon={Globe}
            title="Economic Indicators"
            description="Macroeconomic indicators included in the model."
          >
            <div className="grid gap-5 md:grid-cols-3">
              <NumberField
                label="Unemployment Rate (%)"
                name="unemployment_rate"
                value={form.unemployment_rate}
                onChange={handleChange}
                step="0.01"
              />

              <NumberField
                label="Inflation Rate (%)"
                name="inflation_rate"
                value={form.inflation_rate}
                onChange={handleChange}
                step="0.01"
              />

              <NumberField
                label="GDP"
                name="gdp"
                value={form.gdp}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          </Section>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Target size={20} />

            {loading
              ? "Analyzing Student..."
              : "Analyze Student Risk"}
          </button>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}
        </form>

        {/* RESULT PANEL */}
        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:sticky xl:top-6">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
              AI / ML Assessment
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Prediction Result
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              The trained model's early-warning assessment.
            </p>
          </div>

          {!result ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-slate-800 p-5 text-slate-500">
                <Info size={32} />
              </div>

              <h3 className="mt-5 font-medium text-slate-300">
                No prediction yet
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Complete the student information and click
                "Analyze Student Risk" to generate an assessment.
              </p>
            </div>
          ) : (
            <div>
              {/* RISK */}
              <div
                className={`rounded-2xl border p-6 ${riskClass}`}
              >
                <div className="flex items-center gap-3">
                  {result.risk_level === "High Risk" ? (
                    <AlertTriangle size={27} />
                  ) : (
                    <CheckCircle size={27} />
                  )}

                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">
                      Risk Level
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {result.risk_level}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wider opacity-70">
                    Dropout Probability
                  </p>

                  <p className="mt-1 text-5xl font-bold">
                    {Number(result.dropout_probability).toFixed(2)}
                    <span className="text-2xl">%</span>
                  </p>
                </div>
              </div>

              {/* PROBABILITIES */}
              {result.probabilities && (
                <div className="mt-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Model Probabilities
                  </p>

                  <div className="space-y-3">
                    {Object.entries(result.probabilities).map(
                      ([label, probability]) => (
                        <div key={label}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="text-slate-400">
                              {label}
                            </span>

                            <span className="font-medium text-white">
                              {Number(probability).toFixed(2)}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-indigo-500 transition-all"
                              style={{
                                width: `${Math.min(
                                  Number(probability),
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* PREDICTION */}
              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Predicted Outcome
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {formatPrediction(result.prediction)}
                </p>
              </div>

              {/* RECOMMENDATION */}
              <div className="mt-4 rounded-xl border border-slate-800 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Recommended Action
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {result.recommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   UI COMPONENTS
========================================================= */

function Section({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          <Icon size={21} />
        </div>

        <div>
          <h2 className="font-semibold text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
        >
          {options.map((option) => (
            <option
              key={`${name}-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </label>
  );
}

function NumberField({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step = "1",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
      />
    </label>
  );
}

function formatPrediction(prediction) {
  if (prediction === "0") return "Dropout";
  if (prediction === "1") return "Enrolled";
  if (prediction === "2") return "Graduate";

  return prediction;
}

export default Predictor;