import requests
from decouple import config

class AIService:
    def __init__(self):
        self.api_key = config('OPENROUTER_API_KEY')
        self.base_url = 'https://openrouter.ai/api/v1/chat/completions'

    def generate_profile_summary(self, user_data):
        try:
            prompt = self.build_prompt(user_data)
            
            print("Calling OpenRouter DeepSeek API...")
            response = requests.post(
                self.base_url,
                headers={
                    'Authorization': f'Bearer {self.api_key}',
                    'Content-Type': 'application/json',
                },
                json={
                    'model': 'deepseek/deepseek-chat',
                    'messages': [
                        {
                            'role': 'system',
                            'content': 'You are an AI that analyzes Reddit user profiles and creates insightful summaries about their personality, interests, and online behavior patterns. Be objective, professional, and provide specific insights based on the data.'
                        },
                        {
                            'role': 'user',
                            'content': prompt,
                        },
                    ],
                    'max_tokens': 600,
                    'temperature': 0.7,
                }
            )

            if response.status_code == 200:
                data = response.json()
                summary = data['choices'][0]['message']['content']
                print("AI summary generated successfully")
                return summary
            else:
                print(f"OpenRouter API error: {response.status_code}")
                return 'Failed to generate AI summary - API error'

        except Exception as e:
            print(f"AI Service error: {e}")
            return 'AI summarization temporarily unavailable'

    def build_prompt(self, user_data):
        """Build comprehensive prompt for AI analysis"""
        
        # Format recent posts
        posts_text = ""
        if user_data['recentPosts']:
            posts_text = '\n\n'.join([
                f"Title: {post['title']}\nContent: {post['content']}\nSubreddit: r/{post['subreddit']}\nScore: {post['score']}"
                for post in user_data['recentPosts'][:8]
            ])
        else:
            posts_text = "No recent posts available"

        # Format recent comments
        comments_text = ""
        if user_data['recentComments']:
            comments_text = '\n\n'.join([
                f"Comment: {comment['content']}\nSubreddit: r/{comment['subreddit']}\nScore: {comment['score']}"
                for comment in user_data['recentComments'][:12]
            ])
        else:
            comments_text = "No recent comments available"

        return f"""Analyze this Reddit user's profile and provide a comprehensive summary:

**User Information:**
- Username: u/{user_data['username']}
- Account Age: {user_data['accountAge']}
- Total Karma: {user_data['karma']['total']:,} ({user_data['karma']['post']:,} post karma, {user_data['karma']['comment']:,} comment karma)
- Most Active Subreddits: {', '.join(user_data['topSubreddits']) if user_data['topSubreddits'] else 'None available'}

**Recent Posts:**
{posts_text}

**Recent Comments:**
{comments_text}

Please provide a detailed analysis covering:

1. **Personality & Communication Style**: How do they communicate? Are they helpful, argumentative, humorous, technical, etc.?

2. **Primary Interests & Expertise**: What topics do they care about most? What are they knowledgeable in?

3. **Community Behavior**: How do they interact with others? Are they active contributors, lurkers, or somewhere in between?

4. **Activity Patterns**: What does their karma distribution and subreddit activity tell us about their Reddit usage?

5. **Overall Assessment**: A summary of who this person appears to be based on their Reddit presence.

Keep the analysis professional, objective, and insightful. Use specific examples from their posts/comments when relevant."""
