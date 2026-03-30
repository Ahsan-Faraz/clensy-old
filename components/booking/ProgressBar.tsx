import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-600 border-green-600 text-white'
                    : isCurrent
                    ? 'bg-zinc-800 border-zinc-950 text-white'
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </div>
              <div className="mt-2 text-xs font-medium text-center max-w-20">
                <span className={isCurrent ? 'text-zinc-800' : 'text-gray-500'}>
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-zinc-800 h-2 rounded-full transition-all duration-300"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};