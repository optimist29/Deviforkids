
import React, { useState, useCallback } from 'react';
import { STORY_TOPICS } from '../constants';
import { StoryTopic } from '../types';
import Card from '../components/Card';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateStory } from '../services/geminiService';
import { playSound } from '../utils/sound';

const StoryCard: React.FC<{ topic: StoryTopic; onSelect: (topic: StoryTopic) => void }> = ({ topic, onSelect }) => (
  <Card onClick={() => onSelect(topic)}>
    <img src={topic.image} alt={`Illustration representing the story of ${topic.title}`} className="w-full h-56 object-cover" />
    <div className="p-6 text-center">
      <h3 className="font-display text-3xl font-bold text-brand-dark">{topic.title}</h3>
    </div>
  </Card>
);

const StoriesPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<StoryTopic | null>(null);
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectTopic = useCallback((topic: StoryTopic) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    generateStory(topic.prompt).then(generatedStory => {
      setStory(generatedStory);
      setIsLoading(false);
      playSound('https://actions.google.com/sounds/v1/musical_elements/magic_chime.ogg');
    });
  }, []);

  const handleCloseModal = () => {
    setSelectedTopic(null);
    setStory('');
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-display text-6xl font-extrabold text-brand-dark">Magical Stories</h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-700">Choose a story you'd like to hear. Our magical storyteller will tell you a wonderful tale!</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
        {STORY_TOPICS.map((topic) => (
          <StoryCard key={topic.title} topic={topic} onSelect={handleSelectTopic} />
        ))}
      </div>

      {selectedTopic && (
        <Modal isOpen={!!selectedTopic} onClose={handleCloseModal} title={selectedTopic.title}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
              {story}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default StoriesPage;