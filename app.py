from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

PAGES = {
    1: {
        "title": "تسبيح",
        "subtitle": "ابدأ رحلتك مع التسبيح",
        "button_text": "ابدأ",
        "phrase": "",
        "background": "linear-gradient(135deg, #1c5cff 0%, #2a73ff 100%)",
    },
    2: {
        "title": "سبحان الله",
        "subtitle": "اضغط على الزر لتتبع العد",
        "button_text": "اضغط",
        "phrase": "سبحان الله",
        "background": "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
    },
    3: {
        "title": "الحمد لله",
        "subtitle": "اضغط على الزر لتتبع العد",
        "button_text": "اضغط",
        "phrase": "الحمد لله",
        "background": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    },
    4: {
        "title": "الله أكبر",
        "subtitle": "اضغط على الزر لتتبع العد",
        "button_text": "اضغط",
        "phrase": "الله أكبر",
        "background": "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    },
}


@app.get("/")
def index():
    return render_template("index.html", page=1, counter=0)


@app.post("/state")
def state():
    payload = request.get_json(silent=True) or {}
    page = int(payload.get("page", 1))
    counter = int(payload.get("counter", 0))
    action = payload.get("action", "press")
    state = apply_action(page=page, counter=counter, action=action)
    return jsonify(state)


def apply_action(page, counter, action):
    if page == 1:
        return {"page": 2, "counter": 0}

    if action == "skip":
        next_page = min(page + 1, 4)
        if page == 4:
            return {"page": 1, "counter": 0}
        return {"page": next_page, "counter": 0}

    if action != "press":
        return {"page": page, "counter": counter}

    next_counter = counter + 1
    if page == 2 and next_counter >= 33:
        return {"page": 3, "counter": 0}
    if page == 3 and next_counter >= 33:
        return {"page": 4, "counter": 0}
    if page == 4 and next_counter >= 34:
        return {"page": 1, "counter": 0}
    return {"page": page, "counter": next_counter}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
