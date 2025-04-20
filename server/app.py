import json
import os 

from flask import Flask, jsonify, request
from flask_cors import CORS

from utils import get_embedding, cosine_search

app = Flask(__name__)
CORS(app)  # Enable CORS so React can talk to Flask

app = Flask(__name__)

# Load the text + embeddings into memory
with open("embeddings.json", "r") as f:
    documents = json.load(f)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/api/greet', methods=['GET'])
def greet():
    return jsonify({'message': 'Hello from Flask!'})

@app.route("/ask", methods=["POST"])
def ask():
    user_query = request.json.get("query")
    query_embedding = get_embedding(user_query)
    top_texts = cosine_search(query_embedding, documents)

    print(top_texts)

    return jsonify({
        "query": user_query,
        "results": top_texts
    })

if __name__ == '__main__':
    app.run(debug=True)