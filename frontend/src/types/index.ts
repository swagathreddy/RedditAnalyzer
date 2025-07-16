export interface RedditUser {
  username: string;
  profileUrl: string;
  karma: {
    post: number;
    comment: number;
    total: number;
  };
  accountAge: string;
  recentPosts: RedditPost[];
  recentComments: RedditComment[];
  topSubreddits: string[];
  aiSummary?: string;
}

export interface RedditPost {
  id: string;
  title: string;
  content: string;
  subreddit: string;
  score: number;
  createdAt: string;
  url: string;
}

export interface RedditComment {
  id: string;
  content: string;
  subreddit: string;
  score: number;
  createdAt: string;
  context: string;
}

export interface ScrapingResult {
  success: boolean;
  data?: RedditUser;
  error?: string;
}

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}