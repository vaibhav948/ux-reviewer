import sqlite3
import json
conn = sqlite3.connect("reviews.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    result TEXT
)
""")

def save_review(url, result):
    conn = sqlite3.connect("reviews.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO reviews (url, result) VALUES (?, ?)",
        (url, json.dumps(result))   
    )

    conn.commit()
    conn.close()

def get_reviews():
    cursor.execute("SELECT url, result FROM reviews ORDER BY id DESC LIMIT 5")
    return cursor.fetchall()