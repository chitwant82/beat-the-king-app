from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)


@app.route('/')
def root():
    return redirect(url_for('index'))

@app.route('/players', methods=['GET', 'POST'])
def index():
	return render_template('players/index.html')

if __name__ == '__main__':
  app.run(debug=True, port=3000)
