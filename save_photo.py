from flask import Flask, render_template, request, jsonify
import datetime, base64

now = datetime.datetime.now()
filename = now.strftime("%Y-%m-%d_%H-%M-%S.jpg")

app = Flask(__name__, template_folder='./', static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/savephoto', methods=['POST'])
def save_photo():
    photoData = request.get_json()['photoData']
    with open(filename, 'wb') as f:
        f.write(base64.b64decode(photoData.split(',')[1]))
    return jsonify({'success': 'True'})

if __name__ == '__main__':
    app.run()
