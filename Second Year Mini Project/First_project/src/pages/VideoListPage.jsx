// src/pages/VideoListPage.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resourceCategories, wellnessData } from '../data/resourceData';
import VideoPlayerModal from '../components/VideoPlayerModal';

const VideoListPage = () => {
  const { categorySlug } = useParams();
  const category = resourceCategories.find(c => c.slug === categorySlug);

  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const videos = category ? wellnessData[category.title] || [] : [];

  if (!category) {
    return <div className="p-8 text-center">Category not found. <Link to="/resources" className="text-indigo-500">Go back</Link></div>;
  }
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
          <div className="text-5xl text-indigo-500">{category.icon}</div>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-white">{category.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{category.description}</p>
      </div>
 
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map(video => {
          const videoId = video.embedUrl.split('/embed/')[1];
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
          return (
            <div
              key={video.id}
              className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-slate-800"
              onClick={() => setSelectedVideoId(videoId)}
            >
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-slate-800 dark:text-white">{video.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{video.article}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedVideoId && (
        <VideoPlayerModal 
          videoId={selectedVideoId} 
          onClose={() => setSelectedVideoId(null)} 
        />
      )}
    </div>
  );
}

export default VideoListPage;
