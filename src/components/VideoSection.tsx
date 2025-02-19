
import { useState } from 'react';

const VideoSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 z-10">
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-white animate-fade-in"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>
      <img 
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80" 
        alt="Video thumbnail"
        className="w-full h-full object-cover transform transition-transform duration-300"
      />
    </div>
  );
};

export default VideoSection;
