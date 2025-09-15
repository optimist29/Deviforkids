import React from 'react';
import Card from '../components/Card';

const FeatureCard: React.FC<{ href: string; title: string; description: string; imgSrc: string; bgColor: string }> = ({ href, title, description, imgSrc, bgColor }) => (
    <a href={href} className="block group">
        <Card className="h-full">
            <div className={`p-4 ${bgColor}`}>
                <img src={imgSrc} alt={`Artistic illustration for ${title}`} className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-brand-dark group-hover:text-brand-pink transition-colors">{title}</h3>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </Card>
    </a>
);


const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <section className="py-16">
        <h1 className="font-display text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-orange to-brand-yellow">
          Welcome, Little Star!
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-700">
          Embark on a magical journey this Navaratri to discover the wonderful world of the Devis. Explore their brave stories, uncover their amazing powers, and play fun games!
        </p>
        <a href="#avatars" className="mt-8 inline-block bg-gradient-to-r from-brand-pink to-brand-orange text-brand-dark font-bold text-xl py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
          Start Exploring
        </a>
      </section>

      <section className="py-12">
        <h2 className="font-display text-5xl font-bold text-brand-dark mb-12">What's Inside?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
                href="#avatars"
                title="Meet the Avatars"
                description="Discover the nine beautiful forms of Durga celebrated during Navaratri."
                imgSrc="https://picsum.photos/seed/HomePageAvatars/500/300"
                bgColor="bg-brand-pink/20"
            />
            <FeatureCard 
                href="#stories"
                title="Magical Stories"
                description="Read enchanting tales of courage, wisdom, and love from the Devis."
                imgSrc="https://picsum.photos/seed/HomePageStories/500/300"
                bgColor="bg-brand-orange/20"
            />
            <FeatureCard 
                href="#activities"
                title="Fun & Games"
                description="Test your knowledge with a fun quiz and get creative with coloring pages!"
                imgSrc="https://picsum.photos/seed/HomePageActivities/500/300"
                bgColor="bg-brand-teal/20"
            />
            <FeatureCard 
                href="#videos"
                title="Divine Melodies"
                description="Watch and listen to beautiful songs and chants dedicated to the Devis."
                imgSrc="https://picsum.photos/seed/HomePageVideos/500/300"
                bgColor="bg-brand-purple/20"
            />
        </div>
      </section>
    </div>
  );
};

export default HomePage;