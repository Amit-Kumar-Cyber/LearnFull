import { useState } from 'react';
import { Quiz, QuizQuestion } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface QuizModuleProps {
  quiz: Quiz;
  onComplete?: (score: number) => void;
}

export function QuizModule({ quiz, onComplete }: QuizModuleProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return; // Don't allow changing answer after submission

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete
      const correctAnswers = quiz.questions.filter(
        (q) => selectedAnswers[q.id] === q.correctAnswer
      ).length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      setIsQuizComplete(true);
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsQuizComplete(false);
  };

  const getScore = () => {
    const correctAnswers = quiz.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
    };
  };

  if (isQuizComplete) {
    const score = getScore();
    const isPassing = score.percentage >= 70;

    return (
      <Card className="p-8 text-center max-w-2xl mx-auto bg-gray-900 border-gray-800">
        <div
          className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isPassing ? 'bg-green-500/20' : 'bg-orange-500/20'
          }`}
        >
          <Trophy
            className={`w-10 h-10 ${isPassing ? 'text-green-400' : 'text-orange-400'}`}
          />
        </div>

        <h2 className="text-3xl font-bold mb-2 text-white">Quiz Complete!</h2>
        <p className="text-gray-400 mb-6">
          {isPassing
            ? 'Great job! You have a solid understanding of the material.'
            : 'Good effort! Consider reviewing the material and trying again.'}
        </p>

        <div className="mb-8">
          <div className="text-5xl font-bold mb-2 text-white">{score.percentage}%</div>
          <div className="text-gray-400">
            {score.correct} out of {score.total} questions correct
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{score.correct}</div>
            <div className="text-gray-400">Correct</div>
          </div>
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">
              {score.total - score.correct}
            </div>
            <div className="text-gray-400">Incorrect</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{score.total}</div>
            <div className="text-gray-400">Total</div>
          </div>
        </div>

        <Button onClick={handleResetQuiz} size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Quiz
        </Button>
      </Card>
    );
  }

  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const hasAnswered = selectedAnswer !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-white">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 mb-6 bg-gray-800 border-gray-700">
        <div className="mb-1 text-sm text-gray-400">
          {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'True/False'}
        </div>
        <h3 className="text-xl font-semibold mb-6 text-white">{currentQuestion.question}</h3>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const showCorrect = showExplanation && isCorrectOption;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : showIncorrect
                    ? 'border-red-500 bg-red-500/10'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-200">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
              )}
              <div className="font-semibold text-white">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
            </div>
            <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {selectedAnswer !== undefined ? (
            showExplanation ? (
              <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            ) : (
              'Answer selected'
            )
          ) : (
            'Select an answer to continue'
          )}
        </div>

        <div className="flex gap-2">
          {!showExplanation && hasAnswered && (
            <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
          )}

          {showExplanation && (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}