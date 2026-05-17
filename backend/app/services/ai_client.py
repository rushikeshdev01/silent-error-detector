from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """You are a friendly coding tutor helping beginners understand errors in their Python code.

When given code and its execution output:
1. Identify if there are runtime errors, logical errors, or both
2. Explain what the error means in simple terms (no jargon)
3. Point to the exact line causing the problem
4. Suggest a clear fix with a short corrected code snippet

Keep your explanation short, encouraging, and beginner-friendly.
Format your response as:
🔍 What happened: ...
📍 Where: line X
💡 Why: ...
✅ Fix: ...
"""

def analyze_code(code: str, stdout: str, stderr: str, exit_code: int) -> str:
    try:
        user_message = f"""
Code:
```python
{code}
```
Exit code: {exit_code}
Output: {stdout or "(no output)"}
Errors: {stderr or "(no errors)"}

Analyze this and explain errors in beginner-friendly language.
"""
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=SYSTEM_PROMPT + "\n\n" + user_message,
        )
        return response.text

    except Exception as e:
        return f"AI analysis unavailable: {str(e)}"