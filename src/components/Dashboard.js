import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const indicators = [
  {
    "Page": 20,
    "Indicator": "🧒 Immunisation coverage for age at 24 months",
    "Time": "Q3 23/24",
    "Māori": 64.60,
    "Pacific": 72.50,
    "Asian": 86.60,
    "European/Other": 83.10,
    "Target": 90,
    "Definition": "Percentage of children who have all scheduled vaccinations by age two.",
    "Interpretation": "Māori immunisation rates are significantly below the target, indicating a need for targeted interventions.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Page": 21,
    "Indicator": "⏱️ Shorter stays in Emergency Departments",
    "Time": "Q3 23/24",
    "Māori": 74.90,
    "Pacific": 67.70,
    "Asian": 72.20,
    "European/Other": 68.10,
    "Target": 95,
    "Definition": "Percentage of patients admitted, discharged, or transferred from ED within six hours.",
    "Interpretation": "Māori patients have slightly better ED wait times than other groups, but still below the target.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Page": 27,
    "Indicator": "🔬 Cancer patients waiting less than 31 days for first treatment",
    "Time": "Q3 23/24",
    "Māori": 82.00,
    "Pacific": 79.70,
    "Asian": 84.10,
    "European/Other": 81.90,
    "Target": 85,
    "Definition": "Proportion of eligible cancer patients receiving first treatment within 31 days of decision to treat.",
    "Interpretation": "Māori cancer treatment wait times are close to but slightly below the target.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Page": 28,
    "Indicator": "🏥 Primary care enrolment",
    "Time": "Q3 23/24",
    "Māori": 83.90,
    "Pacific": 98.30,
    "Asian": null,
    "European/Other": 96.40,
    "Target": 95,
    "Definition": "Percentage of people enrolled with a general practice or Kaupapa Māori provider.",
    "Interpretation": "Māori primary care enrolment is lower than other groups and below the target, suggesting access barriers.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Page": 29,
    "Indicator": "🗣️ Involvement in care decisions - primary care",
    "Time": "Q3 23/24",
    "Māori": 86.30,
    "Pacific": 86.20,
    "Asian": 88.60,
    "European/Other": 90.20,
    "Target": null,
    "Definition": "Percentage of patients feeling involved in primary care treatment decisions.",
    "Interpretation": "Māori involvement in primary care decisions is slightly lower than other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Page": 30,
    "Indicator": "👶 Ambulatory sensitive hospitalisations 0-4 years - 12 Months Rolling",
    "Time": "Q3 23/24",
    "Māori": 7955,
    "Pacific": 14218,
    "Asian": 6059,
    "European/Other": 5779,
    "Target": null,
    "Definition": "Rate of potentially avoidable hospitalizations for children aged 0-4 years.",
    "Interpretation": "Māori children have higher rates of avoidable hospitalizations compared to Asian and European/Other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Page": 31,
    "Indicator": "🧑‍⚕️ Ambulatory sensitive hospitalisations 45-64 years - 12 Months Rolling",
    "Time": "Q3 23/24",
    "Māori": 7203,
    "Pacific": 8181,
    "Asian": 2168,
    "European/Other": 3167,
    "Target": null,
    "Definition": "Rate of potentially avoidable hospitalizations for adults aged 45-64 years.",
    "Interpretation": "Māori adults have higher rates of avoidable hospitalizations than Asian and European/Other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Page": 32,
    "Indicator": "🧠 Access to primary mental health and addiction services - Rate per 100,000",
    "Time": "Q3 23/24",
    "Māori": 1517,
    "Pacific": 1583,
    "Asian": 556,
    "European/Other": 1018,
    "Target": null,
    "Definition": "Rate of people accessing primary mental health and addiction services per 100,000 population.",
    "Interpretation": "Māori have higher access rates to primary mental health services compared to Asian and European/Other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Page": 33,
    "Indicator": "📈 Access rates for specialist mental health services - Rate per 100,000",
    "Time": "Q3 23/24",
    "Māori": 2203,
    "Pacific": 1070,
    "Asian": 478,
    "European/Other": 1372,
    "Target": null,
    "Definition": "Rate of people accessing specialist mental health services per 100,000 population.",
    "Interpretation": "Māori have significantly higher access rates to specialist mental health services than other groups.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Page": 34,
    "Indicator": "⏳ Mental health wait times for under 25-year-olds - 12 Months Rolling",
    "Time": "Q3 23/24",
    "Māori": 74.20,
    "Pacific": 79.00,
    "Asian": 69.70,
    "European/Other": 63.70,
    "Target": 80,
    "Definition": "Percentage of under-25s seen by specialist mental health services within three weeks of referral.",
    "Interpretation": "Māori youth mental health wait times are below the target but better than European/Other.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Page": 35,
    "Indicator": "🚑 Emergency Department presentations",
    "Time": "Q3 23/24",
    "Māori": 73495,
    "Pacific": 28287,
    "Asian": 34486,
    "European/Other": 196087,
    "Target": null,
    "Definition": "Number of people presenting to Emergency Departments.",
    "Interpretation": "Māori have a high number of ED presentations, second only to European/Other.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Page": 36,
    "Indicator": "🏨 Admissions from Emergency Departments",
    "Time": "Q3 23/24",
    "Māori": 26.50,
    "Pacific": 28.60,
    "Asian": 22.70,
    "European/Other": 31.20,
    "Target": null,
    "Definition": "Percentage of ED attendees admitted to hospital.",
    "Interpretation": "Māori ED admission rates are lower than European/Other but higher than Asian groups.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Page": 37,
    "Indicator": "🛏️ Acute bed days per capita - Rate per 1,000",
    "Time": "Q3 23/24",
    "Māori": 607,
    "Pacific": 751,
    "Asian": null,
    "European/Other": 368,
    "Target": null,
    "Definition": "Number of bed days for acute hospital stays per 1,000 population.",
    "Interpretation": "Māori have a higher rate of acute bed days than European/Other, indicating more time spent in hospital.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Page": 38,
    "Indicator": "🕒 Inpatient length of stay > 7 days",
    "Time": "Q3 23/24",
    "Māori": 6.70,
    "Pacific": 7.70,
    "Asian": 6.20,
    "European/Other": 9.40,
    "Target": null,
    "Definition": "Percentage of hospital discharges with a length of stay greater than seven days.",
    "Interpretation": "Māori have a lower percentage of long hospital stays compared to European/Other.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Page": 39,
    "Indicator": "📝 Involvement in care decisions - in hospital",
    "Time": "Q3 23/24",
    "Māori": 77.70,
    "Pacific": 87.20,
    "Asian": 85.50,
    "European/Other": 81.30,
    "Target": null,
    "Definition": "Percentage of inpatients feeling involved in decisions about their treatment.",
    "Interpretation": "Māori report lower involvement in hospital care decisions compared to other groups.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Page": 41,
    "Indicator": "💻 Medical appointments through digital channels",
    "Time": "Q3 23/24",
    "Māori": 9.60,
    "Pacific": 8.40,
    "Asian": 8.30,
    "European/Other": 10.20,
    "Target": null,
    "Definition": "Percentage of outpatient appointments conducted via telephone or video.",
    "Interpretation": "Māori use of digital appointments is slightly lower than European/Other but higher than Pacific and Asian.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Page": 42,
    "Indicator": "❌ Missed appointments",
    "Time": "Q3 23/24",
    "Māori": 15.20,
    "Pacific": 16.10,
    "Asian": 6.00,
    "European/Other": 4.40,
    "Target": null,
    "Definition": "Percentage of patients who did not attend scheduled appointments.",
    "Interpretation": "Māori have a high rate of missed appointments, second only to Pacific.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Page": 44,
    "Indicator": "🔄 Acute Readmissions to Hospital - 12 Months Rolling",
    "Time": "Q3 23/24",
    "Māori": 12.70,
    "Pacific": 12.20,
    "Asian": null,
    "European/Other": 12.10,
    "Target": null,
    "Definition": "Percentage of acute readmissions to hospital within 28 days of discharge.",
    "Interpretation": "Māori have a slightly higher rate of hospital readmissions compared to other groups.",
    "Category": "Emergency and Hospital Care"
  }
];

const categories = [
  { name: "All Indicators", emoji: "📋" },
  { name: "Primary and Preventive Care", emoji: "🩺" },
  { name: "Emergency and Hospital Care", emoji: "🚑" },
  { name: "Specialist, Mental Health, and Outpatient Services", emoji: "🏥" }
];

const getCellColor = (value, target) => {
  if (!target) return '';
  const difference = value - target;
  if (difference >= 0) return 'bg-green-200';
  if (difference >= -4) return 'bg-yellow-200';
  if (difference >= -9) return 'bg-orange-200';
  return 'bg-red-200';
};

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All Indicators");

  const filteredIndicators = activeCategory === "All Indicators"
    ? indicators
    : indicators.filter(indicator => indicator.Category === activeCategory);

  return (
    <div className="dashboard">
      <h1>Q3 Health System Performance Results</h1>
      <p className="description">
        This dashboard provides an overview of key health indicators{' '}
        <a href="https://www.tewhatuora.govt.nz/publications/quarterly-performance-report-1-january-to-31-march-2024/" target="_blank" rel="noopener noreferrer">
          from the Q3 2023/2024 report
        </a>{' '}
        to identify areas for improving health outcomes for the Māori population. This is an independent summary and is not affiliated with Health New Zealand.
      </p>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={activeCategory === category.name ? 'active' : ''}
          >
            {category.emoji} {category.name}
          </button>
        ))}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Indicator</th>
              <th className="data-column">Māori</th>
              <th className="data-column">Pacific</th>
              <th className="data-column">Asian</th>
              <th className="data-column">European/Other</th>
              <th className="data-column">Target</th>
            </tr>
          </thead>
          <tbody>
            {filteredIndicators.map((indicator, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/indicator/${index}`}>
                    {indicator.Indicator}
                  </Link>
                </td>
                <td className={`data-column ${getCellColor(indicator.Māori, indicator.Target)}`}>{indicator.Māori}</td>
                <td className={`data-column ${getCellColor(indicator.Pacific, indicator.Target)}`}>{indicator.Pacific}</td>
                <td className={`data-column ${getCellColor(indicator.Asian, indicator.Target)}`}>{indicator.Asian}</td>
                <td className={`data-column ${getCellColor(indicator['European/Other'], indicator.Target)}`}>{indicator['European/Other']}</td>
                <td className="data-column">{indicator.Target || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="legend">
        <h3>Legend:</h3>
        <div className="legend-items">
          <div className="legend-item"><span className="color-box bg-red-200"></span>10 or more below target</div>
          <div className="legend-item"><span className="color-box bg-orange-200"></span>5-9 below target</div>
          <div className="legend-item"><span className="color-box bg-yellow-200"></span>0-4 below target</div>
          <div className="legend-item"><span className="color-box bg-green-200"></span>Equal to or greater than target</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;