
import React, { useState, useCallback } from 'react';
import { NAVADURGAS } from '../constants';
import { Devi } from '../types';
import Card from '../components/Card';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateStory } from '../services/geminiService';
import { playSound } from '../utils/sound';

const DeviCard: React.FC<{ devi: Devi; onSelect: (devi: Devi) => void }> = ({ devi, onSelect }) => (
  <Card onClick={() => onSelect(devi)}>
    <div className={`p-4 ${devi.color}`}>
      <img src={devi.image} alt={`Artistic depiction of deity ${devi.name}, ${devi.description}`} className="w-full h-56 object-cover rounded-lg shadow-md" />
    </div>
    <div className="p-4 text-center">
      <h3 className="font-display text-3xl font-bold text-brand-dark">{devi.name}</h3>
      <p className="text-gray-600 mt-1">{devi.description}</p>
    </div>
  </Card>
);

const AvatarsPage: React.FC = () => {
  const [selectedDevi, setSelectedDevi] = useState<Devi | null>(null);
  const [deviStory, setDeviStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectDevi = useCallback((devi: Devi) => {
    playSound('https://actions.google.com/sounds/v1/magic_spells/magic_spell_casting_in_a_circle.ogg');
    setSelectedDevi(devi);
    setIsLoading(true);
    const prompt = `Tell me a short, magical story for a 6-year-old about the deity ${devi.name}, the ${devi.description}. Focus on her special powers and what makes her wonderful.`;
    generateStory(prompt).then(story => {
      setDeviStory(story);
      setIsLoading(false);
    });
  }, []);

  const handleCloseModal = () => {
    setSelectedDevi(null);
    setDeviStory('');
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-display text-6xl font-extrabold text-brand-dark">The Nine Avatars of Durga</h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-700">During Navaratri, we celebrate nine special forms of the great deity. Let's meet them!</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NAVADURGAS.map((devi) => (
          <DeviCard key={devi.name} devi={devi} onSelect={handleSelectDevi} />
        ))}
      </div>

      {selectedDevi && (
        <Modal isOpen={!!selectedDevi} onClose={handleCloseModal} title={selectedDevi.name}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
              {deviStory}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AvatarsPage;