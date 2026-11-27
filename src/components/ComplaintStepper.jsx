import { Check } from 'lucide-react';
import './ComplaintStepper.css';

function ComplaintStepper({ currentStep = 1, language = 'bikol' }) {
  const steps =
    language === 'bikol'
      ? [
          { number: 1, label: 'Klase' },
          { number: 2, label: 'Impormasyon' },
          { number: 3, label: 'Detalye' },
          { number: 4, label: 'Kaibang partido' },
          { number: 5, label: 'Ebidensya' },
          { number: 6, label: 'Suri' },
        ]
      : [
          { number: 1, label: 'Type' },
          { number: 2, label: 'Information' },
          { number: 3, label: 'Details' },
          { number: 4, label: 'Other Party' },
          { number: 5, label: 'Evidence' },
          { number: 6, label: 'Review' },
        ];

  return (
    <nav className="complaint-stepper" aria-label="Complaint filing steps">
      <ol className="stepper-list">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.number}
              className={`stepper-item ${isActive ? 'is-active' : ''} ${
                isCompleted ? 'is-completed' : ''
              }`}
            >
              <div className="stepper-node-row">
                <div className="stepper-circle">
                  {isCompleted ? (
                    <Check size={14} strokeWidth={2.8} />
                  ) : (
                    step.number
                  )}
                </div>
                {!isLast && (
                  <div className="stepper-line">
                    {isActive && <span className="stepper-line-progress" />}
                  </div>
                )}
              </div>
              <span className="stepper-label">{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default ComplaintStepper;