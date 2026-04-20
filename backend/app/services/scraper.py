import requests
from bs4 import BeautifulSoup

def extract_content(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers, timeout=10)
    response.encoding = "utf-8"
    html = response.text

    # Detect blocking
    if "Just a moment" in html or "cf-browser-verification" in html:
        raise Exception("Blocked by site")

    soup = BeautifulSoup(html, "html.parser")

    # Title
    title = soup.title.string.strip() if soup.title and soup.title.string else ""

   
    meta_desc = ""
    meta = soup.find("meta", attrs={"name": "description"})
    if meta and meta.get("content"):
        meta_desc = meta["content"].strip()


    headings = [
        h.get_text(strip=True)
        for h in soup.find_all(["h1", "h2", "h3"])
    ][:10]

    
    paragraphs = [
        p.get_text(strip=True)
        for p in soup.find_all("p")
        if p.get_text(strip=True)
    ][:10]

    buttons = [
        b.get_text(strip=True)
        for b in soup.find_all("button")
        if b.get_text(strip=True)
    ]


    cta_keywords = ["start", "buy", "signup", "login", "try", "get"]
    cta_links = [
        a.get_text(strip=True)
        for a in soup.find_all("a")
        if any(word in a.get_text(strip=True).lower() for word in cta_keywords)
    ][:10]


    forms = []
    for form in soup.find_all("form"):
        inputs = [
            inp.get("type", "text")
            for inp in form.find_all("input")
        ]
        forms.append(inputs)


    images_alt = [
        img.get("alt")
        for img in soup.find_all("img")
    ][:10]


    nav = []
    for n in soup.find_all(["nav"]):
        links = [a.get_text(strip=True) for a in n.find_all("a")]
        nav.extend(links)

    return {
        "title": title,
        "meta_description": meta_desc,
        "headings": headings,
        "paragraphs": paragraphs,
        "buttons": buttons,
        "cta_links": cta_links,
        "forms": forms,
        "images_alt": images_alt,
        "navigation": nav[:10]
    }