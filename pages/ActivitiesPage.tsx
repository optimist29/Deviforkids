import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '../types';
import { generateQuiz, generateColoringPage } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import Card from '../components/Card';
import { playSound } from '../utils/sound';

const COLORING_SUBJECTS = [
  { name: 'Deity Durga', prompt: 'A simple, beautiful black and white coloring book outline of Deity Durga riding a lion, with thick clean lines, suitable for a young child to color. The background should be minimal.' },
  { name: 'Deity Lakshmi', prompt: 'A simple, beautiful black and white coloring book outline of Deity Lakshmi sitting on a lotus flower, with thick clean lines, suitable for a young child to color. The background should be minimal.' },
  { name: 'Deity Saraswati', prompt: 'A simple, beautiful black and white coloring book outline of Deity Saraswati playing the veena, with thick clean lines, suitable for a young child to color. The background should be minimal.' },
];

interface ColoringPage {
  name: string;
  image: string | null;
}

const ActivitiesPage: React.FC = () => {
  // Quiz State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizState, setQuizState] = useState<'idle' | 'loading' | 'active' | 'finished'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Coloring Page State
  const [coloringPages, setColoringPages] = useState<ColoringPage[]>(COLORING_SUBJECTS.map(s => ({ name: s.name, image: null })));
  const [isGenerating, setIsGenerating] = useState(false);


  useEffect(() => {
      const generatePages = async () => {
        setIsGenerating(true);
        const generatedImages = await Promise.all(
          COLORING_SUBJECTS.map(subject => generateColoringPage(subject.prompt))
        );
        
        setColoringPages(
          COLORING_SUBJECTS.map((subject, index) => ({
            name: subject.name,
            image: generatedImages[index],
          }))
        );
        setIsGenerating(false);
      };

      generatePages();
    }, []);

  const startQuiz = useCallback(async () => {
    setQuizState('loading');
    const fetchedQuestions = await generateQuiz();
    if (fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setQuizState('active');
    } else {
      alert("Could not load the quiz. Please try again!");
      setQuizState('idle');
    }
  }, []);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
      playSound('https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg');
    } else {
      playSound('https://actions.google.com/sounds/v1/emergency/beeper_error.ogg');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizState('finished');
      setIsModalOpen(true);
      playSound('https://actions.google.com/sounds/v1/crowds/battle_crowd_celebrate_stutter.ogg');
    }
  };
  
  const resetQuiz = () => {
      setQuizState('idle');
      setIsModalOpen(false);
  }

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-brand-yellow/30';
    }
    const isCorrect = option === questions[currentQuestionIndex].answer;
    const isSelected = option === selectedAnswer;

    if (isCorrect) return 'bg-green-400 text-white';
    if (isSelected && !isCorrect) return 'bg-red-400 text-white';
    return 'bg-gray-200 text-gray-700 cursor-not-allowed';
  };

  const renderQuizContent = () => {
    switch(quizState) {
        case 'loading':
            return <LoadingSpinner />;
        case 'active':
            const currentQuestion = questions[currentQuestionIndex];
            return (
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mb-4 text-center">
                        <p className="text-lg text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                        <h2 className="text-3xl font-semibold my-4">{currentQuestion.question}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                                disabled={isAnswered}
                                className={`p-4 rounded-lg text-xl font-semibold border-2 border-brand-orange transition-all duration-300 ${getButtonClass(option)}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {isAnswered && (
                        <div className="text-center mt-6">
                            <button onClick={handleNextQuestion} className="bg-brand-orange text-white font-bold text-xl py-3 px-12 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
                            </button>
                        </div>
                    )}
                </div>
            );
        case 'idle':
        default:
             return (
                <div className="text-center">
                    <h2 className="font-display text-5xl font-bold text-brand-dark mb-4">Ready for a Challenge?</h2>
                    <p className="text-xl text-gray-700 mb-8">Test your knowledge about the amazing Devis!</p>
                    <button onClick={startQuiz} className="bg-gradient-to-r from-brand-pink to-brand-orange text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Start the Devi Quiz!
                    </button>
                </div>
             );
    }
  };

  return (
    <div>
        <div className="text-center mb-12">
            <h1 className="font-display text-6xl font-extrabold text-brand-dark">Activities & Fun</h1>
        </div>
        
        {/* --- Quiz Section --- */}
        <div className="w-full p-8 bg-brand-orange/10 rounded-3xl shadow-inner min-h-[50vh] flex items-center justify-center">
             {renderQuizContent()}
        </div>
        <Modal isOpen={isModalOpen} onClose={resetQuiz} title="Quiz Results!">
            <div className="text-center">
                <h3 className="font-display text-4xl text-brand-dark">You're a Star!</h3>
                <p className="my-4 text-xl">You scored</p>
                <p className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-orange my-4">{score} <span className="text-4xl text-brand-dark">out of</span> {questions.length}</p>
                <button onClick={resetQuiz} className="mt-6 bg-brand-orange text-white font-bold text-xl py-3 px-12 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Play Again
                </button>
            </div>
        </Modal>

        {/* --- Coloring Section --- */}
        <div className="mt-20 text-center">
            <h2 className="font-display text-5xl font-bold text-brand-dark mb-4">Coloring Time!</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">Click to download and print these beautiful Devis to color in.</p>
            <div className="grid md:grid-cols-3 gap-8">
            {coloringPages.map((page, index) => (
                <Card key={index} className="p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="font-display text-2xl mb-4">{page.name}</h3>
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            {isGenerating || !page.image ? (
                            <LoadingSpinner />
                            ) : (
                            <img src={`data:image/png;base64,${page.image}`} alt={`Coloring page of ${page.name}`} className="w-full h-full object-contain rounded-lg" />
                            )}
                        </div>
                    </div>
                    <a
                        href={page.image ? `data:image/png;base64,${page.image}` : '#'}
                        download={page.image ? `${page.name.replace(/\s+/g, '_')}_Coloring_Page.png` : undefined}
                        className={`mt-4 flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-brand-teal to-brand-purple text-brand-dark font-bold font-display text-xl py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ${!page.image || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'}`}
                        aria-disabled={!page.image || isGenerating}
                        aria-label={`Download coloring page of ${page.name}`}
                        onClick={(e) => (!page.image || isGenerating) && e.preventDefault()}
                        title={page.image ? `Download ${page.name.replace(/\s+/g, '_')}_Coloring_Page.png` : 'Image is generating...'}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                         </svg>
                        <span>Download</span>
                    </a>
                </Card>
            ))}
            </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;