from google import genai
import os , json , re
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def safe_json_parse(text: str):
    text = text.replace("```json", "").replace("```", "")
    text = re.sub(r'\\(?!["\\/bfnrtu])', r'\\\\', text)

    return json.loads(text)

def analyze(content):
   
    prompt = f"""
        You are a UX expert.

        Analyze this website content:

        Title: {content['title']}
        Headings: {content['headings']}
        Paragraphs: {content['paragraphs']}
        Buttons: {content['buttons']}
        Forms : {content['forms']}
        Return ONLY valid JSON. No markdown. No backticks. No explanation.
        Escape all special characters properly.

        Return STRICT JSON:
        {{
        "score": number,
        "issues": [
            {{
            "category": "",
            "issue": "",
            "why": "",
            "proof": ""
            }}
        ],
        "top_fixes": [
            {{
            "before": "",
            "after": ""
            }}
        ]
        }}
        """

    response = client.models.generate_content(
    model="gemini-2.5-flash-lite",
    contents=prompt,
     config={
            "response_mime_type": "application/json"
        }
    )

    if hasattr(response, "parsed") and response.parsed:
        return response.parsed
    
    return safe_json_parse(response.text)