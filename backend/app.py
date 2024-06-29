from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data
comments = [
    {"comment_id": 1, "article_id": 101, "user_id": 1, "comment": "Great article!", "primary_category": "Good", "secondary_category": "Positive", "tertiary_category": "Best"},
    {"comment_id": 2, "article_id": 102, "user_id": 2, "comment": "Terrible post!", "primary_category": "Bad", "secondary_category": "Hate Speech", "tertiary_category": "Vulgar"}
]

@app.route('/')
def home():
    return "Welcome to the Comments API!"

@app.route('/comments', methods=['GET'])
def get_comments():
    return jsonify(comments)

@app.route('/comments/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    comment = next((c for c in comments if c['comment_id'] == comment_id), None)
    return jsonify(comment) if comment else ("Comment not found", 404)

@app.route('/comments', methods=['POST'])
def add_comment():
    new_comment = request.json
    comments.append(new_comment)
    return jsonify(new_comment), 201

@app.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = next((c for c in comments if c['comment_id'] == comment_id), None)
    if not comment:
       return jsonify({"error": "Comment not found"}), 404
    data = request.json
    comment.update(data)
    return jsonify(comment)

@app.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    global comments
    comments = [c for c in comments if c['comment_id'] != comment_id]
    return jsonify({"message": "Comment deleted"}), 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

