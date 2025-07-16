import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from scraper.reddit_scraper import RedditScraper
from scraper.ai_service import AIService

@api_view(['POST'])
def scrape_reddit_profile(request):
    try:
        profile_url = request.data.get('profileUrl')
        print(f"[INFO] Received profile URL: {profile_url}")

        if not profile_url:
            return Response({'error': 'Profile URL is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Extract username from supported URL formats
        username = extract_username_from_url(profile_url)
        print(f"[INFO] Extracted username: {username}")

        if not username:
            return Response(
                {'error': 'Invalid Reddit profile URL. Use links like /u/username, /user/username, or /r/username for user accounts.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        scraper = RedditScraper()
        ai_service = AIService()

        print(f"[INFO] Attempting to scrape profile for: {username}")
        user_data = scraper.scrape_user_profile(username)

        if not user_data:
            return Response(
                {'error': 'Failed to scrape Reddit profile. User might not exist or be private.'},
                status=status.HTTP_404_NOT_FOUND
            )

        print("[INFO] Generating AI summary...")
        ai_summary = ai_service.generate_profile_summary(user_data)
        user_data['aiSummary'] = ai_summary

        print("[SUCCESS] Profile analysis complete!")
        return Response(user_data, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return Response({'error': f'Server error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def extract_username_from_url(url):
    """
    Extract Reddit username from /u/, /user/, or /r/username (assuming /r/username is a user).
    """
    patterns = [
        r'reddit\.com\/user\/([^\/\?]+)',
        r'reddit\.com\/u\/([^\/\?]+)',
        r'reddit\.com\/r\/([^\/\?]+)',  # Accept /r/username (may be user)
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None
