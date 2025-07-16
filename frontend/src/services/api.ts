import { RedditUser, ScrapingResult } from '../types';

const DJANGO_API_URL = 'http://localhost:8000/api'; // Django backend URL

export const apiService = {
  // Reddit Profile Scraping
  async scrapeRedditProfile(profileUrl: string): Promise<ScrapingResult> {
    try {
      const response = await fetch(`${DJANGO_API_URL}/scrape-reddit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileUrl }),
      });

      const data = await response.json(); // Only parse once

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to scrape profile' };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: 'Network error - make sure Django backend is running',
      };
    }
  },
};
