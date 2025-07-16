import React from 'react';
import { RedditUser } from '../types';
import { 
  User, 
  Calendar, 
  TrendingUp, 
  MessageSquare, 
  FileText, 
  Sparkles,
  ExternalLink,
  Award,
  Users
} from 'lucide-react';

interface RedditProfileCardProps {
  user: RedditUser;
  onGenerateSummary: () => void;
  isGeneratingSummary: boolean;
}

export const RedditProfileCard: React.FC<RedditProfileCardProps> = ({
  user,
  onGenerateSummary,
  isGeneratingSummary,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-24 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="absolute -top-12 left-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="pt-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">u/{user.username}</h1>
                <a
                  href={user.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mt-1"
                >
                  <span className="text-sm">View on Reddit</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{user.accountAge}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="text-sm">{user.karma.total.toLocaleString()} karma</span>
                </div>
              </div>
            </div>

            {/* Karma Breakdown */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{user.karma.total.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Karma</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{user.karma.post.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Post Karma</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{user.karma.comment.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Comment Karma</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
            AI Profile Analysis
          </h2>
          <button
            onClick={onGenerateSummary}
            disabled={isGeneratingSummary}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium flex items-center"
          >
            {isGeneratingSummary ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Analysis
              </>
            )}
          </button>
        </div>
        
        {user.aiSummary ? (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{user.aiSummary}</p>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-600">Click "Generate Analysis" to get an AI-powered summary of this user's Reddit activity and personality.</p>
          </div>
        )}
      </div>

      {/* Top Subreddits */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-500" />
          Active Communities
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.topSubreddits.map((subreddit, index) => (
            <a
              key={index}
              href={`https://reddit.com/r/${subreddit}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
            >
              r/{subreddit}
            </a>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-green-500" />
          Recent Posts
        </h2>
        <div className="space-y-4">
          {user.recentPosts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>r/{post.subreddit}</span>
                    <span>•</span>
                    <span>{post.score} points</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 ml-4"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-purple-500" />
          Recent Comments
        </h2>
        <div className="space-y-4">
          {user.recentComments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <p className="text-gray-800 mb-3">{comment.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>r/{comment.subreddit}</span>
                  <span>•</span>
                  <span>{comment.score} points</span>
                  <span>•</span>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-xs text-gray-400">{comment.context}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};