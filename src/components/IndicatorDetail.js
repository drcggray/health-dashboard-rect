import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

// Updated Health system indicators data for Q4 23/24
const indicators = [
  {
    "Indicator": "🧒 Immunisation coverage for age at 24 months",
    "Time": "Q4 23/24",
    "Māori": 63.20,
    "Pacific": 71.30,
    "Asian": 84.30,
    "European/Other": 81.70,
    "Target": 90,
    "Definition": "Percentage of children who have all scheduled vaccinations by age two.",
    "Interpretation": "Māori immunisation rates are significantly below the target, indicating a need for targeted interventions.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Indicator": "⏱️ Shorter stays in Emergency Departments",
    "Time": "Q4 23/24",
    "Māori": 75.40,
    "Pacific": 71.00,
    "Asian": 74.80,
    "European/Other": 68.90,
    "Target": 95,
    "Definition": "Percentage of patients admitted, discharged, or transferred from ED within six hours.",
    "Interpretation": "Māori patients have slightly better ED wait times than other groups, but still below the target.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Indicator": "⏳ People waiting more than four months for a procedure",
    "Time": "Q4 23/24",
    "Māori": 5902,
    "Pacific": 2654,
    "Asian": 2927,
    "European/Other": 19397,
    "Target": null,
    "Definition": "Number of people waiting more than four months for a procedure.",
    "Interpretation": "Māori have a high number of people waiting, but lower than European/Other.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "🔬 Cancer patients waiting less than 31 days for first treatment",
    "Time": "Q4 23/24",
    "Māori": 82.80,
    "Pacific": 78.60,
    "Asian": 82.60,
    "European/Other": 84.10,
    "Target": 85,
    "Definition": "Proportion of eligible cancer patients receiving first treatment within 31 days of decision to treat.",
    "Interpretation": "Māori cancer treatment wait times are close to but slightly below the target.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "🏥 Primary care enrolment",
    "Time": "Q4 23/24",
    "Māori": 84.10,
    "Pacific": 98.80,
    "Asian": null,
    "European/Other": 96.40,
    "Target": 95,
    "Definition": "Percentage of people enrolled with a general practice or Kaupapa Māori provider.",
    "Interpretation": "Māori primary care enrolment is lower than other groups and below the target, suggesting access barriers.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Indicator": "🗣️ Involvement in care decisions - primary care",
    "Time": "Q4 23/24",
    "Māori": 88.90,
    "Pacific": 88.90,
    "Asian": 90.20,
    "European/Other": 90.30,
    "Target": null,
    "Definition": "Percentage of patients feeling involved in primary care treatment decisions.",
    "Interpretation": "Māori involvement in primary care decisions is slightly lower than other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Indicator": "👶 Ambulatory sensitive hospitalisations 0-4 years - 12 Months Rolling",
    "Time": "Q4 23/24",
    "Māori": 8124,
    "Pacific": 14281,
    "Asian": 6189,
    "European/Other": 5781,
    "Target": null,
    "Definition": "Rate of potentially avoidable hospitalizations for children aged 0-4 years.",
    "Interpretation": "Māori children have higher rates of avoidable hospitalizations compared to Asian and European/Other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Indicator": "🧑‍⚕️ Ambulatory sensitive hospitalisations 45-64 years - 12 Months Rolling",
    "Time": "Q4 23/24",
    "Māori": 7246,
    "Pacific": 8160,
    "Asian": 2168,
    "European/Other": 3176,
    "Target": null,
    "Definition": "Rate of potentially avoidable hospitalizations for adults aged 45-64 years.",
    "Interpretation": "Māori adults have higher rates of avoidable hospitalizations than Asian and European/Other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Indicator": "🧠 Access to primary mental health and addiction services - Rate per 100,000",
    "Time": "Q4 23/24",
    "Māori": 1814,
    "Pacific": 1945,
    "Asian": 662,
    "European/Other": 1156,
    "Target": null,
    "Definition": "Rate of people accessing primary mental health and addiction services per 100,000 population.",
    "Interpretation": "Māori have higher access rates to primary mental health services compared to Asian and European/Other groups.",
    "Category": "Primary and Preventive Care"
  },
  {
    "Indicator": "📈 Access rates for specialist mental health services - Rate per 100,000",
    "Time": "Q4 23/24",
    "Māori": 2361,
    "Pacific": 1169,
    "Asian": 514,
    "European/Other": 1433,
    "Target": null,
    "Definition": "Rate of people accessing specialist mental health services per 100,000 population.",
    "Interpretation": "Māori have significantly higher access rates to specialist mental health services than other groups.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "⏳ Mental health wait times for under 25-year-olds - 12 Months Rolling",
    "Time": "Q4 23/24",
    "Māori": 75.10,
    "Pacific": 79.60,
    "Asian": 72.20,
    "European/Other": 64.50,
    "Target": 80,
    "Definition": "Percentage of under-25s seen by specialist mental health services within three weeks of referral.",
    "Interpretation": "Māori youth mental health wait times are below the target but better than European/Other.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "🚑 Emergency Department presentations",
    "Time": "Q4 23/24",
    "Māori": 79039,
    "Pacific": 31187,
    "Asian": 37580,
    "European/Other": 200359,
    "Target": null,
    "Definition": "Number of people presenting to Emergency Departments.",
    "Interpretation": "Māori have a high number of ED presentations, second only to European/Other.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Indicator": "🏨 Admissions from Emergency Departments",
    "Time": "Q4 23/24",
    "Māori": 26.70,
    "Pacific": 27.60,
    "Asian": 22.40,
    "European/Other": 32.40,
    "Target": null,
    "Definition": "Percentage of ED attendees admitted to hospital.",
    "Interpretation": "Māori ED admission rates are lower than European/Other but higher than Asian groups.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Indicator": "🛏️ Acute bed days per capita - Rate per 1,000",
    "Time": "Q4 23/24",
    "Māori": 667,
    "Pacific": 703,
    "Asian": null,
    "European/Other": 425,
    "Target": null,
    "Definition": "Number of bed days for acute hospital stays per 1,000 population.",
    "Interpretation": "Māori have a higher rate of acute bed days than European/Other, indicating more time spent in hospital.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Indicator": "🕒 Inpatient length of stay > 7 days",
    "Time": "Q4 23/24",
    "Māori": 6.90,
    "Pacific": 7.60,
    "Asian": 6.20,
    "European/Other": 10.10,
    "Target": null,
    "Definition": "Percentage of hospital discharges with a length of stay greater than seven days.",
    "Interpretation": "Māori have a lower percentage of long hospital stays compared to European/Other.",
    "Category": "Emergency and Hospital Care"
  },
  {
    "Indicator": "📝 Involvement in care decisions - in hospital",
    "Time": "Q4 23/24",
    "Māori": 81.00,
    "Pacific": 81.40,
    "Asian": 87.10,
    "European/Other": 79.10,
    "Target": null,
    "Definition": "Percentage of inpatients feeling involved in decisions about their treatment.",
    "Interpretation": "Māori report lower involvement in hospital care decisions compared to Asian groups, but higher than European/Other.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "💻 Medical appointments through digital channels",
    "Time": "Q4 23/24",
    "Māori": 6.50,
    "Pacific": 5.10,
    "Asian": 6.60,
    "European/Other": 7.40,
    "Target": null,
    "Definition": "Percentage of outpatient appointments conducted via telephone or video.",
    "Interpretation": "Māori use of digital appointments is lower than European/Other and Asian, but higher than Pacific.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "❌ Missed appointments",
    "Time": "Q4 23/24",
    "Māori": 15.10,
    "Pacific": 16.40,
    "Asian": 5.30,
    "European/Other": 4.20,
    "Target": null,
    "Definition": "Percentage of patients who did not attend scheduled appointments.",
    "Interpretation": "Māori have a high rate of missed appointments, second only to Pacific.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "📅 Delivery of planned care interventions",
    "Time": "Q4 23/24",
    "Māori": 10339,
    "Pacific": 5321,
    "Asian": 7056,
    "European/Other": 62167,
    "Target": null,
    "Definition": "Number of planned care interventions delivered.",
    "Interpretation": "Māori receive fewer planned care interventions compared to European/Other, but more than Pacific and Asian groups.",
    "Category": "Specialist, Mental Health, and Outpatient Services"
  },
  {
    "Indicator": "🔄 Acute Readmissions to Hospital - 12 Months Rolling",
    "Time": "Q4 23/24",
    "Māori": null,
    "Pacific": null,
    "Asian": null,
    "European/Other": null,
    "Target": null,
    "Definition": "Percentage of acute readmissions to hospital within 28 days of discharge.",
    "Interpretation": "Data not available for this period.",
    "Category": "Emergency and Hospital Care"
  }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const IndicatorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const indicator = indicators[parseInt(id)];

  if (!indicator) {
    return <div>Indicator not found</div>;
  }

  const chartData = [
    { name: 'Māori', value: indicator.Māori },
    { name: 'Pacific', value: indicator.Pacific },
    { name: 'Asian', value: indicator.Asian },
    { name: 'European/Other', value: indicator['European/Other'] },
  ].filter(item => item.value !== null);

  const goToPreviousIndicator = () => {
    const previousId = (parseInt(id) - 1 + indicators.length) % indicators.length;
    navigate(`/indicator/${previousId}`);
  };

  const goToNextIndicator = () => {
    const nextId = (parseInt(id) + 1) % indicators.length;
    navigate(`/indicator/${nextId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>
        <div className="text-blue-600">{indicator.Category}</div>
        <div>
          <button onClick={goToPreviousIndicator} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Previous Indicator</button>
          <button onClick={goToNextIndicator} className="bg-blue-500 text-white px-4 py-2 rounded">Next Indicator</button>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">{indicator.Indicator}</h1>
      <p className="mb-2"><strong>Time Period:</strong> {indicator.Time}</p>
      <p className="mb-2"><strong>Indicator:</strong> {indicator.Definition}</p>
      <p className="mb-4"><strong>Interpretation for Māori:</strong> {indicator.Interpretation}</p>
      
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#8884d8" />
            {indicator.Target && <ReferenceLine y={indicator.Target} label={{ value: `Target: ${indicator.Target}`, position: 'top' }} stroke="red" strokeDasharray="3 3" />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndicatorDetail;