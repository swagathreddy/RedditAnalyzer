import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface ProfileInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error?: string;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({ onSubmit, isLoading, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const isValidRedditUrl = (url: string) => {
    return (
      url.includes('reddit.com') &&
      (url.includes('/u/') || url.includes('/user/') || url.includes('/r/'))
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Reddit Profile Analyzer
        </h1>
        <p className="text-lg text-gray-600">
          Enter a Reddit profile URL to get an AI-powered analysis of the user's activity and personality.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: <code>/u/username</code>, <code>/user/username</code>, or even <code>/r/username</code> if it points to a user.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://reddit.com/u/spez or /user/AutoModerator or /r/spez"
            className="w-full px-4 py-4 pr-12 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !url.trim() || !isValidRedditUrl(url)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Profile...</span>
            </div>
          ) : (
            'Analyze Profile'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">Example URLs:</p>
        <div className="space-y-2">
          <button
            onClick={() => setUrl('https://reddit.com/u/spez')}
            className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors duration-200"
          >
            https://reddit.com/u/spez
          </button>
          <button
            onClick={() => setUrl('https://reddit.com/user/AutoModerator')}
            className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors duration-200"
          >
            https://reddit.com/user/AutoModerator
          </button>
          <button
            onClick={() => setUrl('https://reddit.com/r/AutoModerator')}
            className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors duration-200"
          >
            https://reddit.com/r/AutoModerator
          </button>
        </div>
      </div>
    </div>
  );
};
