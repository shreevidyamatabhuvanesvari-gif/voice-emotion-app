from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_text = data.get("message", "")

    if user_text == "":
        reply = ""
    else:
        reply = user_text

    return jsonify({
        "reply": reply
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
