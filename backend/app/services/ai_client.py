from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """You are a friendly coding tutor helping beginners understand errors in their Python code.

When given code and its execution output:
1. Identify if there are runtime errors, logical errors, or both
2. Explain what the error means in simple terms (no jargon)
3. Point to the exact line causing the problem
4. Suggest a clear fix with a short corrected code snippet
5. If the code ran successfully but has a logical issue (wrong output), explain that too

Keep your explanation short, encouraging, and beginner-friendly.
Format your response as:
🔍 What happened: ...
📍 Where: line X
💡 Why: ...
✅ Fix: ...
"""

def analyze_code(code: str, stdout: str, stderr: str, exit_code: int) -> str:
    """
    Send the code + execution result to the LLM.
    Returns a plain-text explanation of what went wrong (or right).
    """
    user_message = f"""
Here is the Python code a beginner wrote:

```python
{code}
```

Execution result:
- Exit code: {exit_code}
- Standard output: {stdout or "(no output)"}
- Error output: {stderr or "(no errors)"}

Please analyze this and explain any errors in simple beginner-friendly language.
"""

    try:
        response = client.chat.completions.create(
            model=settings.AI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            max_tokens=600,
            temperature=0.3,
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"AI analysis unavailable: {str(e)}"