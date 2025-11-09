// src/pages/ResourcesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { resourceCategories } from '../data/resourceData';

const CategoryCard = ({ slug, title, description, icon }) => (
  <Link
    to={`/resources/${slug}`}
    className="block transform rounded-lg bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
  >
    <div className="text-4xl text-indigo-500">{icon}</div>
    <h3 className="mt-4 text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
  </Link>
);

const ResourcesPage = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-extrabold text-slate-900 dark:text-white">Wellness Resources</h1>
      <p className="mb-10 text-lg text-slate-600 dark:text-slate-300">
        Explore our curated collection of videos to support your mental health journey.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {resourceCategories.map((category) => (
          <CategoryCard key={category.slug} {...category} />
        ))}
      </div>
      <div className="mt-12">
        <iframe
          title="Resource Video Player"
          width="100%"
          height="400"
          className="rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/Evgx9yX2Vw8"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ResourcesPage;