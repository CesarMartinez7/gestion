from app import app
from utils.db import db
from models.categorias import Categorias

with app.app_context():

    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
