import os
import time
from pathlib import Path

import requests
from dotenv import load_dotenv


load_dotenv()

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")

BASE_DIR = Path(__file__).resolve().parents[1]
MEDIA_DIR = BASE_DIR / "media" / "houses"


CATEGORIES = {
    "low": {
        "query": "small simple american house exterior",
        "total": 80,
    },
    "medium": {
        "query": "suburban american family house exterior",
        "total": 120,
    },
    "high": {
        "query": "modern american house exterior",
        "total": 120,
    },
    "luxury": {
        "query": "luxury mansion exterior house",
        "total": 80,
    },
}


def download_image(url, output_path):
    response = requests.get(url, timeout=30)
    response.raise_for_status()

    with open(output_path, "wb") as file:
        file.write(response.content)


def download_category_images(category_name, query, total):
    folder = MEDIA_DIR / category_name
    folder.mkdir(parents=True, exist_ok=True)

    headers = {
        "Authorization": PEXELS_API_KEY,
    }

    downloaded = 0
    page = 1

    while downloaded < total:
        response = requests.get(
            "https://api.pexels.com/v1/search",
            headers=headers,
            params={
                "query": query,
                "per_page": 30,
                "page": page,
                "orientation": "landscape",
                "locale": "en-US",
            },
            timeout=30,
        )

        response.raise_for_status()
        data = response.json()

        photos = data.get("photos", [])

        if not photos:
            break

        for photo in photos:
            if downloaded >= total:
                break

            filename = f"{category_name}_{downloaded + 1:03}.jpg"
            output_path = folder / filename

            if output_path.exists():
                downloaded += 1
                continue

            image_url = photo["src"]["large"]
            download_image(image_url, output_path)

            downloaded += 1
            print(f"Descargada: {category_name}/{filename}")

            time.sleep(0.25)

        page += 1


def main():
    if not PEXELS_API_KEY:
        raise ValueError("Falta PEXELS_API_KEY en tu archivo .env")

    for category_name, config in CATEGORIES.items():
        download_category_images(
            category_name=category_name,
            query=config["query"],
            total=config["total"],
        )

    print("Descarga terminada.")


if __name__ == "__main__":
    main()