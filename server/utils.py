import numpy as np
from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity
import os

from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-ada-002"
    )
    # print(response)
    return response.data[0].embedding

def cosine_search(query_embedding, docs, top_k=3):
    similarities = []
    for doc in docs:
        sim = cosine_similarity(
            [query_embedding], [doc["embedding"]]
        )[0][0]
        similarities.append((doc["text"], sim))

    sorted_results = sorted(similarities, key=lambda x: x[1], reverse=True)
    return [text for text, _ in sorted_results[:top_k]]
