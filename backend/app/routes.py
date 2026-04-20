from fastapi import APIRouter
from pydantic import BaseModel
from app.services.scraper import extract_content
from app.services.llm import analyze
from app.services.db import save_review, get_reviews
from fastapi import HTTPException
router = APIRouter()

class URLRequest(BaseModel):
    url: str

@router.post("/analyze")
def analyze_url(req: URLRequest):
    if not req.url or req.url.strip() == "":
        raise HTTPException(status_code=400, detail="URL cannot be empty")

    if not req.url.startswith("http"):
        raise HTTPException(status_code=400, detail="Invalid URL format")
    
    content = extract_content(req.url)
    # print("TYPE OF CONTENT:", type(content))
    # print(content)
    result = analyze(content)
    save_review(req.url, result)

    return {
        "content": content,
        "analysis": result
    }

@router.get("/history")
def history():
    return get_reviews()

@router.get("/status")
def status():
    return {
        "backend": "ok",
        "db": "ok",
        "llm": "ok"
    }