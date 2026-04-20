# UX Reviewer AI

An AI-powered web application that analyzes any website URL and generates a UX review with issues, explanations, and improvement suggestions.

---

## 🚀 Features

- Paste any website URL
- Extracts:
  - Title
  - Headings
  - Paragraphs
  - Buttons
  - Navigation elements
- AI-generated UX analysis:
  - 8–12 UX issues
  - Categorized (Navigation, Clarity, Layout, Accessibility, Trust, etc.)
  - Explanation of why each issue exists
  - Proof from extracted content
- UX score (0–100)
- Top improvement suggestions (before/after)
- History of last 5 analyzed websites (clickable)
- Expandable history cards with full AI report

---

## 🧠 Tech Stack

### Frontend
- React (Vite + TypeScript)
- Axios
- Inline CSS styling (dark UI theme)

### Backend
- FastAPI (Python)
- BeautifulSoup (web scraping)
- Requests (HTTP fetching)
- Google Gemini API (LLM)

---

## ⚙️ How to Run

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


### 2. Frontend
cd frontend
npm install
npm run dev