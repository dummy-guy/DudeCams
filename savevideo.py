from flask import Flask, render_template, request, jsonify
import datetime

app = Flask(__name__, template_folder='./', static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/savevideo', methods=['POST'])
def save_video():
    videoData = request.files['videoData']
    filename = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S.webm")
    videoData.save(filename)
    return jsonify({'success': 'True'})

if __name__ == '__main__':
    app.run()
