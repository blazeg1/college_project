import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo } from 'react-icons/fa';

// Data sourced from the provided PHQ-9 PDF
const assessmentData = {
  title: 'PATIENT HEALTH QUESTIONNAIRE-9 (PHQ-9)',
  questions: [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading the newspaper or watching television',
    // Corrected line below:
    'Moving or speaking so slowly that other people could have noticed? Or the opposite being so fidgety or restless that you have been moving around a lot more than usual',
    'Thoughts that you would be better off dead or of hurting yourself in some way',
  ],
  options: [
    { text: 'Not at all', value: 0 },
    { text: 'Several days', value: 1 },
    { text: 'More than half the days', value: 2 },
    { text: 'Nearly every day', value: 3 },
  ],
};

// Standard PHQ-9 score interpretations
const scoreInterpretations = {
  minimal: {
    range: '0-4',
    severity: 'Minimal Depression',
    recommendation: 'Your score suggests you may be experiencing minimal or no symptoms of depression. Continue monitoring your mood.',
    color: 'bg-green-500',
  },
  mild: {
    range: '5-9',
    severity: 'Mild Depression',
    recommendation: 'Your score suggests you may be experiencing mild depression. Consider monitoring your symptoms and exploring self-help resources.',
    color: 'bg-yellow-500',
  },
  moderate: {
    range: '10-14',
    severity: 'Moderate Depression',
    recommendation: 'Your score suggests moderate depression. It is recommended to discuss these symptoms with a healthcare professional.',
    color: 'bg-orange-500',
  },
  moderatelySevere: {
    range: '15-19',
    severity: 'Moderately Severe Depression',
    recommendation: 'Your score indicates moderately severe depression. Professional consultation is strongly recommended.',
    color: 'bg-red-500',
  },
  severe: {
    range: '20-27',
    severity: 'Severe Depression',
    recommendation: 'Your score suggests severe depression. Please seek professional help immediately. Treatment is highly effective.',
    color: 'bg-red-700',
  },
};

const getInterpretation = (score) => {
  if (score <= 4) return scoreInterpretations.minimal;
  if (score <= 9) return scoreInterpretations.mild;
  if (score <= 14) return scoreInterpretations.moderate;
  if (score <= 19) return scoreInterpretations.moderatelySevere;
  return scoreInterpretations.severe;
};

const PHQ9Assessment = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(assessmentData.questions.length).fill(null));
  const [results, setResults] = useState(null);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQuestion < assessmentData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((sum, val) => sum + (val || 0), 0);
    const interpretation = getInterpretation(totalScore);
    setResults({ score: totalScore, ...interpretation });
  };

  const handleRetake = () => {
    setAnswers(Array(assessmentData.questions.length).fill(null));
    setCurrentQuestion(0);
    setResults(null);
  };

  const progress = ((currentQuestion + 1) / assessmentData.questions.length) * 100;

  if (results) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-slate-900">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaArrowLeft /> Back
          </button>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Assessment Complete</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Here are your results based on your responses.</p>
          <div className={`mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full ${results.color} text-white`}>
            <div>
              <div className="text-5xl font-bold">{results.score}</div>
              <div className="text-sm">Total Score</div>
            </div>
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">{results.severity}</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{results.recommendation}</p>
          <p className="mt-8 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4 text-left text-sm text-yellow-800 dark:border-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-200">
            <strong>Disclaimer:</strong> This is a screening tool, not a diagnosis. [cite_start]Please consult a qualified healthcare professional for a comprehensive evaluation. [cite: 8]
          </p>
          <button
            onClick={handleRetake}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <FaRedo /> Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 md:p-8">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FaArrowLeft /> Back
        </button>
        {/* Progress Bar and Header */}
        <div className="pt-8">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Question {currentQuestion + 1} of {assessmentData.questions.length}
          </p>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mt-8 text-center">
          <p className="mb-2 text-slate-600 dark:text-slate-400">Over the last 2 weeks, how often have you been bothered by this problem?</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {assessmentData.questions[currentQuestion]}
          </h2>
        </div>

        {/* Options */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {assessmentData.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswerSelect(option.value)}
              className={`rounded-lg p-4 text-left text-lg font-medium transition-all duration-200 ease-in-out
                ${
                  answers[currentQuestion] === option.value
                    ? 'scale-105 bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 dark:bg-indigo-500'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaArrowLeft /> Previous
          </button>
          {currentQuestion === assessmentData.questions.length - 1 && (
            <button
              onClick={handleSubmit}
              disabled={answers[currentQuestion] === null}
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-95 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              See Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PHQ9Assessment;