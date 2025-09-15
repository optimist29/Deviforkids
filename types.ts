
export interface Devi {
  name: string;
  description: string;
  image: string;
  color: string;
}

export interface StoryTopic {
  title: string;
  prompt: string;
  image: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Video {
  title: string;
  description: string;
  youtubeVideoId: string;
}
