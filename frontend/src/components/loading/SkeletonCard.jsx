import React from 'react';
import { motion } from 'framer-motion';

/**
 * SkeletonCard - Loading placeholder with shimmer effect
 * @param {string} className - Optional custom classes
 * @param {string} variant - Card layout: 'job', 'event', 'alumni', 'default'
 */
export const SkeletonCard = ({ className = '', variant = 'default' }) => {
  const shimmer = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  if (variant === 'job') {
    return (
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg overflow-hidden ${className}`}>
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
          initial="initial"
          animate="animate"
          variants={shimmer}
        />
        
        {/* Top badges */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        
        {/* Title */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
        
        {/* Company */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
        
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    );
  }

  if (variant === 'event') {
    return (
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
          initial="initial"
          animate="animate"
          variants={shimmer}
        />
        
        {/* Image placeholder */}
        <div className="h-48 bg-gray-200 dark:bg-gray-700" />
        
        {/* Content */}
        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-3" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          
          <div className="flex gap-4 mb-4">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          
          <div className="flex gap-3">
            <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'alumni') {
    return (
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
          initial="initial"
          animate="animate"
          variants={shimmer}
        />
        
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
          
          {/* Info */}
          <div className="flex-1">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
            
            <div className="flex gap-2 mb-3">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            
            <div className="flex gap-3">
              <div className="h-9 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - profile or generic card
  if (variant === 'profile') {
    return (
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
          initial="initial"
          animate="animate"
          variants={shimmer}
        />
        
        <div className="flex items-center gap-4 mb-4">
          <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex-1">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
        initial="initial"
        animate="animate"
        variants={shimmer}
      />
      
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    </div>
  );
};

/**
 * SkeletonTable - Loading placeholder for tables
 */
export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {[...Array(columns)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {[...Array(columns)].map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Spinner - Simple loading spinner
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`inline-block ${sizes[size]} ${className}`}>
      <motion.div
        className="h-full w-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

/**
 * LoadingOverlay - Full screen loading overlay
 */
export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
