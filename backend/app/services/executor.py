import subprocess
import tempfile
import os
from app.core.config import settings

def execute_code(code: str) -> dict:
    """
    Write the user's code to a temp file and run it with Python subprocess.
    Returns stdout, stderr, and exit_code.

    Why subprocess?
    - It runs in a SEPARATE process, so crashes don't kill the API server
    - We can enforce a timeout to prevent infinite loops
    - We capture both normal output and error output separately
    """

    # Write code to a temporary file (auto-deleted after the with-block)
    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".py",
        delete=False,
        encoding="utf-8"
    ) as tmp:
        tmp.write(code)
        tmp_path = tmp.name

    try:
        result = subprocess.run(
            ["python", tmp_path],
            capture_output=True,      # Capture both stdout and stderr
            text=True,                # Return strings, not bytes
            timeout=settings.EXECUTION_TIMEOUT,  # Kill after N seconds
        )
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "exit_code": result.returncode,
        }

    except subprocess.TimeoutExpired:
        # Code ran too long (infinite loop, etc.)
        return {
            "stdout": "",
            "stderr": f"⏱ Execution timed out after {settings.EXECUTION_TIMEOUT} seconds.",
            "exit_code": -1,
        }

    except Exception as e:
        return {
            "stdout": "",
            "stderr": f"Execution error: {str(e)}",
            "exit_code": -1,
        }

    finally:
        # Always clean up the temp file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)