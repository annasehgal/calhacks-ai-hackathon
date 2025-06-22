
from app import create_app, db

app = create_app()

with app.app_context():
    db.create_all()  # <- This creates tables based on all models

if __name__ == '__main__':
    app.run(debug=True, port=5000)

