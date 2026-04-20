# 📄 `AI_NOTES.md`

```md
# AI_NOTES.md

## 🤖 Where AI is used

This project uses AI in the **backend analysis pipeline**.

### 1. UX Analysis Generation
We send extracted website content to an LLM:

- Title
- Headings
- Paragraphs
- Buttons
- Navigation elements

The LLM returns:
- UX score (0–100)
- List of UX issues (8–12)
- Categories (clarity, layout, navigation, accessibility, trust)
- Explanation ("why this is an issue")
- Proof based on extracted content
- Top fixes (before/after suggestions)

---

## 🧠 LLM Used

### Model:gemini-2.5-flash-lite


---

## ❓ Why this model was used

- Fast response time (low latency)
- Free / low-cost tier available
- Good balance of reasoning + structured output
- Strong performance for:
  - summarization
  - classification
  - structured JSON generation

---

## ⚙️ How AI is controlled

We use strict prompting:

- Force JSON output only
- No explanations outside JSON
- No markdown allowed
- Structured schema for:
  - score
  - issues
  - top_fixes

---

## 🧪 What was checked manually

The following parts were verified manually:

### Backend logic:
- URL scraping works correctly
- BeautifulSoup extracts:
  - title
  - headings
  - paragraphs
  - buttons
- API endpoints (/analyze, /history)

### Frontend:
- URL input works
- API integration with Axios
- History display works
- Expand/collapse UI for reports
- UX score rendering
- Issues rendering

### AI Output:
- JSON format consistency
- Issue categorization correctness
- Proper mapping of extracted content into UX feedback

---

## ⚠️ Limitations

- AI may hallucinate UX issues not explicitly visible in HTML
- No screenshot-based validation
- No visual DOM analysis
- History is not persisted in a database (in-memory only)

---

## 🚀 Future Improvements

- Add screenshot-based visual UX analysis
- Store history in PostgreSQL/MongoDB
- Add authentication system
- Export UX report as PDF
- Compare two URLs
- Add scoring breakdown chart

---