import React from 'react';
import { SkeletonCard } from './SkeletonCard';

/**
 * LoadingState - Renders loading skeletons based on page type
 * @param {string} type - Page type: 'jobs', 'events', 'alumni', 'grid', 'list'
 * @param {number} count - Number of skeleton items to show
 */
export const LoadingState = ({ type = 'grid', count = 6 }) => {
  if (type === 'jobs') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, index) => (
          <SkeletonCard key={index} variant="job" />
        ))}
      </div>
    );
  }

  if (type === 'events') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, index) => (
          <SkeletonCard key={index} variant="event" />
        ))}
      </div>
    );
  }

  if (type === 'alumni') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, index) => (
          <SkeletonCard key={index} variant="alumni" />
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, index) => (
          <SkeletonCard key={index} variant="default" />
        ))}
      </div>
    );
  }

  // Default grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} variant="default" />
      ))}
    </div>
  );
};

export default LoadingState;
