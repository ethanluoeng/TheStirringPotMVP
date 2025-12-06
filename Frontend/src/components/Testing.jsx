import { useState, useEffect } from "react";

export default function Testing({ steps }) {
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const currentStep = steps[index];

    if (currentStep.timer && currentStep.timer > 0) {
      setTimeLeft(currentStep.timer);
    } else {
      setTimeLeft(null); // no timer for this step
    }
  }, [index]); 

  useEffect(() => {
    if (timeLeft == null) return;
    if (timeLeft == 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000)

    return () => clearInterval(interval);
  }, [timeLeft])

  const nextStep = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevStep = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="slideshow">
      <h2>Step {index + 1} of {steps.length}</h2>
      <p>{steps[index].text}</p>

      {timeLeft !== null && (
        <div className="timer">
          Time left: {timeLeft}s
        </div>
      )}

      <div className="controls">
        <button onClick={prevStep} disabled={index === 0}>
          Previous
        </button>

        <button onClick={nextStep} disabled={index === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
