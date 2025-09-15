import React from 'react';
import { VIDEOS } from '../constants';
import Card from '../components/Card';

const VideosPage: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-display text-6xl font-extrabold text-brand-dark">Divine Melodies</h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-700">
          Watch beautiful animated stories that celebrate the wonder of the Devis.
        </p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {VIDEOS.map((video) => (
          <Card key={video.youtubeVideoId} className="flex flex-col">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-t-2xl"
                src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 text-center flex-grow flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold text-brand-dark">{video.title}</h3>
              <p className="text-gray-600 mt-2">{video.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;