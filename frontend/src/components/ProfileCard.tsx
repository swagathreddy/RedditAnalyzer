import React from 'react';
import { UserProfile } from '../types';
import { MapPin, Globe, Linkedin, Github, Phone, Mail, Calendar, Sparkles } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
  onEdit: () => void;
  onGenerateSummary: () => void;
  isGeneratingSummary: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onEdit,
  onGenerateSummary,
  isGeneratingSummary,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      {/* Profile content */}
      <div className="relative px-6 pb-6">
        {/* Profile image placeholder */}
        <div className="absolute -top-16 left-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-white text-2xl font-bold">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </span>
          </div>
        </div>

        {/* Edit button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Edit Profile
          </button>
        </div>

        {/* Name and basic info */}
        <div className="mt-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            <span className="text-sm">{profile.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-sm">{profile.phone}</span>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-4 flex space-x-4">
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm">Website</span>
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4 mr-1" />
              <span className="text-sm">LinkedIn</span>
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <Github className="w-4 h-4 mr-1" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
        </div>

        {/* AI Summary */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              AI Summary
            </h2>
            <button
              onClick={onGenerateSummary}
              disabled={isGeneratingSummary}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
            >
              {isGeneratingSummary ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                'Generate Summary'
              )}
            </button>
          </div>
          {profile.aiSummary && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-800 text-sm leading-relaxed">{profile.aiSummary}</p>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Experience</h2>
          <p className="text-gray-600">{profile.experience}</p>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">{profile.education}</p>
        </div>

        {/* Interests */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Last updated */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Last updated: {new Date(profile.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};