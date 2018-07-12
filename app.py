from flask import Flask, render_template, redirect, url_for
import os

app = Flask(__name__)

if os.environ.get('ENV') == 'production':
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')


@app.route('/')
def root():
    return redirect(url_for('index'))

@app.route('/players', methods=['GET', 'POST'])
def index():

	return render_template('players/index.html')

@app.route('/players/new')
def new():
    return render_template('players/new.html')

@app.route('/games/tictactoe')
def tictactoe():
    return render_template('games/index.html')

# If we are in production, make sure we DO NOT use the debug mode
if os.environ.get('ENV') == 'production':
    debug = False
else:
    debug = True

if __name__ == '__main__':
  app.run(debug=debug)