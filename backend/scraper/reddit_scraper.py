import praw
from decouple import config
from datetime import datetime

class RedditScraper:
    def __init__(self):
        try:
            self.reddit = praw.Reddit(
                client_id=config('REDDIT_CLIENT_ID'),
                client_secret=config('REDDIT_CLIENT_SECRET'),
                user_agent=config('REDDIT_USER_AGENT')
            )
            print("Reddit API initialized successfully")
        except Exception as e:
            print(f"Failed to initialize Reddit API: {e}")
            raise

    def scrape_user_profile(self, username):
        try:
            user = self.reddit.redditor(username)
            
            # Check if user exists by accessing a property
            try:
                _ = user.created_utc
            except Exception:
                print(f"User u/{username} not found or is suspended")
                return None

            print(f"Found user u/{username}, scraping data...")

            # Get user basic info
            user_data = {
                'username': username,
                'profileUrl': f'https://reddit.com/u/{username}',
                'karma': {
                    'post': user.link_karma,
                    'comment': user.comment_karma,
                    'total': user.link_karma + user.comment_karma
                },
                'accountAge': self.calculate_account_age(user.created_utc),
                'recentPosts': [],
                'recentComments': [],
                'topSubreddits': []
            }

            # Get recent posts (limit 15)
            posts = []
            subreddit_counts = {}
            
            print("Scraping recent posts...")
            try:
                for submission in user.submissions.new(limit=15):
                    post_data = {
                        'id': submission.id,
                        'title': submission.title,
                        'content': submission.selftext[:500] if submission.selftext else '',
                        'subreddit': submission.subreddit.display_name,
                        'score': submission.score,
                        'createdAt': datetime.fromtimestamp(submission.created_utc).isoformat(),
                        'url': f"https://reddit.com{submission.permalink}"
                    }
                    posts.append(post_data)
                    
                    # Count subreddit activity
                    subreddit = submission.subreddit.display_name
                    subreddit_counts[subreddit] = subreddit_counts.get(subreddit, 0) + 1
            except Exception as e:
                print(f"Error scraping posts: {e}")

            # Get recent comments (limit 20)
            comments = []
            print("Scraping recent comments...")
            try:
                for comment in user.comments.new(limit=20):
                    if hasattr(comment, 'body') and comment.body != '[deleted]':
                        comment_data = {
                            'id': comment.id,
                            'content': comment.body[:300] if comment.body else '',
                            'subreddit': comment.subreddit.display_name,
                            'score': comment.score,
                            'createdAt': datetime.fromtimestamp(comment.created_utc).isoformat(),
                            'context': f"Comment on: {comment.submission.title[:50]}..." if hasattr(comment, 'submission') else 'Comment context unavailable'
                        }
                        comments.append(comment_data)
                        
                        # Count subreddit activity
                        subreddit = comment.subreddit.display_name
                        subreddit_counts[subreddit] = subreddit_counts.get(subreddit, 0) + 1
            except Exception as e:
                print(f"Error scraping comments: {e}")

            # Get top subreddits
            top_subreddits = sorted(subreddit_counts.items(), key=lambda x: x[1], reverse=True)
            user_data['topSubreddits'] = [sub[0] for sub in top_subreddits[:8]]
            user_data['recentPosts'] = posts
            user_data['recentComments'] = comments

            print(f"Scraped {len(posts)} posts and {len(comments)} comments")
            return user_data

        except Exception as e:
            print(f"Error scraping user {username}: {e}")
            return None

    def calculate_account_age(self, created_utc):
        """Calculate human-readable account age"""
        created_date = datetime.fromtimestamp(created_utc)
        now = datetime.now()
        diff = now - created_date
        
        years = diff.days // 365
        months = (diff.days % 365) // 30
        
        if years > 0:
            return f"{years} year{'s' if years != 1 else ''}"
        elif months > 0:
            return f"{months} month{'s' if months != 1 else ''}"
        else:
            return f"{diff.days} day{'s' if diff.days != 1 else ''}"
