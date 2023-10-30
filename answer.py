# app.py
from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

tokenizer = GPT2Tokenizer.from_pretrained("gpt2-medium")
model = GPT2LMHeadModel.from_pretrained("gpt2-medium")

@app.route("/ask", methods=["POST"])
def ask():
    question = request.json["question"]
    input_ids = tokenizer.encode(question, return_tensors="pt")
    output = model.generate(input_ids, max_length=50)
    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run()


"""
    Create a virtual environment:

bash

python3 -m venv myenv

This creates a new virtual environment named myenv.

    Activate the virtual environment:

bash

source myenv/bin/activate

You should now see (myenv) before your terminal prompt, indicating the virtual environment is active.

    Install the packages in the virtual environment:

bash

pip install transformers torch
"""