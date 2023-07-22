from datetime import datetime

from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from database import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80))

class Location(db.Model):
    locationId = db.Column(db.Integer, primary_key=True)
    locationName = db.Column(db.String(50), unique=True)

class Establishment(db.Model):
    establishmentId = db.Column(db.Integer, primary_key=True)
    locationId = db.Column(db.Integer, db.ForeignKey('location.locationId'))
    establishmentName = db.Column(db.String(50))
    openingHours = db.Column(db.String(50))
    imageId = db.Column(db.String(200))

# Food Stalls
class FoodData(db.Model):
    stallId = db.Column(db.Integer, primary_key=True)
    establishmentId = db.Column(db.Integer, db.ForeignKey('establishment.establishmentId'))
    stallName = db.Column(db.String(50))
    imageId = db.Column(db.String(200))

class FoodGenre(db.Model):
    genreId = db.Column(db.Integer, primary_key=True)
    genreName = db.Column(db.String(50))

class FoodItem(db.Model):
    foodId = db.Column(db.Integer, primary_key=True)
    locationId = db.Column(db.Integer, db.ForeignKey('location.locationId'))
    establishmentId = db.Column(db.Integer, db.ForeignKey('establishment.establishmentId'))
    stallId = db.Column(db.Integer, db.ForeignKey('food_data.stallId'))
    genreId = db.Column(db.Integer, db.ForeignKey('food_genre.genreId'))
    foodName = db.Column(db.String(50))
    Ratings = db.Column(db.Float)
    imageId = db.Column(db.String(200))

class Food(db.Model):
    foodId = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(50))
    establishmentId = db.Column(db.Integer, db.ForeignKey('establishment.establishmentId'))
    stallId = db.Column(db.Integer, db.ForeignKey('food_data.stallId'))
    genre = db.Column(db.String(50))
    foodName = db.Column(db.String(50))
    Ratings = db.Column(db.Float)
    Description = db.Column(db.Text)
    imageId = db.Column(db.String(200))


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    food_name = db.Column(db.String(100))
    review_description = db.Column(db.Text)
    rating = db.Column(db.Integer)
    cuisine_type = db.Column(db.String(100))
    canteen = db.Column(db.String(100))
    imageId = db.Column(db.String(200))
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    
class SearchHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    food_item = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
