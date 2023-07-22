import pandas as pd

from db_classes import *
from database import db



def populate_db():
    # Read in the CSV files
    location_data = pd.read_csv('dataset/location.csv')
    establishment_data = pd.read_csv('dataset/establishment.csv')
    food_data = pd.read_csv('dataset/food.csv')
    food_genre_data = pd.read_csv('dataset/food_genre.csv')
    food_item_data = pd.read_csv('dataset/food_item.csv')
    food_data_data = pd.read_csv('dataset/food_data.csv')

    # Add data to the Location table
    for index, row in location_data.iterrows():
        location = Location(locationId=row['locationId'], locationName=row['locationName'])
        db.session.add(location)

    # Add data to the Establishment table
    for index, row in establishment_data.iterrows():
        establishment = Establishment(establishmentId=row['establishmentId'], locationId=row['locationId'],
                                      establishmentName=row['establishmentName'], openingHours=row['openingHours'],
                                      imageId=row['imageId'])
        db.session.add(establishment)

    # Add data to the FoodData table
    for index, row in food_data.iterrows():
        food_data = FoodData(stallId=row['stallId'], establishmentId=row['establishmentId'],
                             stallName=row['stallName'], imageId=row['imageId'])
        db.session.add(food_data)

    # Add data to the FoodGenre table
    for index, row in food_genre_data.iterrows():
        food_genre = FoodGenre(genreId=row['genreId'], genreName=row['genreName'])
        db.session.add(food_genre)

    # Add data to the FoodItem table
    for index, row in food_item_data.iterrows():
        food_item = FoodItem(foodId=row['foodId'], locationId=row['locationId'],
                             establishmentId=row['establishmentId'], stallId=row['stallId'],
                             genreId=row['genreId'], foodName=row['foodName'], Ratings=row['Ratings'],
                             imageId=row['imageId'])
        db.session.add(food_item)

    # Add data to the Food table
    for index, row in food_data_data.iterrows():
        food = Food(foodId=row['foodId'], location=row['location'],
                    establishmentId=row['establishmentId'], stallId=row['stallId'],
                    genre=row['genre'], foodName=row['foodName'], Ratings=row['Ratings'],
                    Description=row['Description'], imageId=row['imageId'])
        db.session.add(food)

    # Commit the changes
    db.session.commit()

