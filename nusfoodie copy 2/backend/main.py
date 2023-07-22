from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask_bcrypt import Bcrypt
import os
from flask_cors import CORS
from sqlalchemy import desc
import pandas as pd
from database import db
from db_classes import User, Location, Establishment, FoodData, FoodGenre, FoodItem, Food, Review, SearchHistory
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from populate_db import populate_db

app = Flask(__name__)

CORS(app) 
bcrypt = Bcrypt(app)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = os.urandom(24)
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/', methods=['GET'])
@login_required
def home():
    return jsonify({"message": "You are logged in"}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user, remember=True)
        return jsonify({"message": "Logged in successfully"}), 200

    return jsonify({"message": "Invalid email or password"}), 401


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Check if username or email is already in use
    existing_user = User.query.filter((User.username == data['username']) | (User.email == data['email'])).first()
    if existing_user is not None:
        return jsonify({"message": "Username or email is already in use"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account created successfully"}), 201


@app.route('/api/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200


@app.route('/api/genres', methods=['GET'])
def get_cuisine_types():
    # Query the database to get all genres
    genres = db.session.query(FoodGenre).all()
    results = []
    for genre in genres:
        result = {
            'genreName': genre.genreName,
            'genreId': genre.genreId,
        }
        results.append(result)
    return jsonify(results)

@app.route('/api/establishments', methods=['GET'])
def get_establishments():
    # Query the database to get all establishments
    establishments = db.session.query(Establishment, Location).join(Location,
                                                                    Establishment.locationId == Location.locationId).all()
    results = []
    # Loop through each establishment
    for establishment, location in establishments:
        # Create a dictionary with the establishment and location details
        result = {
            'establishmentId': establishment.establishmentId,
            'locationId': establishment.locationId,
            'establishmentName': establishment.establishmentName,
            'openingHours': establishment.openingHours,
            'imageId': establishment.imageId,
            'locationName': location.locationName,
        }
        results.append(result)

    # Return the results as JSON
    return jsonify(results)


@app.route('/api/establishments/<int:establishmentId>', methods=['GET'])
def get_establishment(establishmentId):
    establishment = Establishment.query.get(establishmentId)

    if establishment is None:
        return jsonify({"message": "Establishment not found"}), 404

    establishment_data = {
        'name': establishment.establishmentName,
    }

    return jsonify(establishment_data)


@app.route('/api/establishments/<int:establishmentId>/stalls/<int:stallId>', methods=['GET'])
def get_establishment_and_stall(establishmentId, stallId):
    establishment = Establishment.query.get(establishmentId)
    stall = FoodData.query.get(stallId)

    if establishment is None or stall is None:
        return jsonify({"message": "Establishment or Stall not found"}), 404

    data = {
        'establishmentName': establishment.establishmentName,
        'stallName': stall.stallName,
    }

    return jsonify(data)


@app.route('/api/fooditems', methods=['GET'])
def get_food_items():
    page = request.args.get('page', default=None, type=int)
    per_page = request.args.get('per_page', default=10, type=int)

    try:
        query = db.session.query(FoodItem, FoodGenre).join(FoodGenre, FoodItem.genreId == FoodGenre.genreId).order_by(desc(FoodItem.Ratings))

        if page is not None:
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            food_items_list = [{
                'foodId': item.FoodItem.foodId,
                'locationId': item.FoodItem.locationId,
                'establishmentId': item.FoodItem.establishmentId,
                'stallId': item.FoodItem.stallId,
                'genreId': item.FoodItem.genreId,
                'genreName': item.FoodGenre.genreName,
                'foodName': item.FoodItem.foodName,
                'Ratings': item.FoodItem.Ratings,
                'imageId': item.FoodItem.imageId
            } for item in pagination.items]

            return jsonify({
                'items': food_items_list,
                'page': pagination.page,
                'per_page': pagination.per_page,
                'total_pages': pagination.pages,
                'total_items': pagination.total,
            }), 200

        else:
            food_items = query.all()
            food_items_list = [{
                'foodId': item.FoodItem.foodId,
                'locationId': item.FoodItem.locationId,
                'establishmentId': item.FoodItem.establishmentId,
                'stallId': item.FoodItem.stallId,
                'genreId': item.FoodItem.genreId,
                'genreName': item.FoodGenre.genreName,
                'foodName': item.FoodItem.foodName,
                'Ratings': item.FoodItem.Ratings,
                'imageId': item.FoodItem.imageId
            } for item in food_items]

            return jsonify(food_items_list), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/api/reviews", methods=["GET"])
def get_reviews():
    reviews = db.session.query(Review, User).join(User, Review.user_id==User.id).all()
    # now reviews is a list of (review, user) tuples
    # return it in a format your client can understand
    reviews_list = [
        {
            "review_id": review.id,
            "food_name": review.food_name,
            "review_description": review.review_description,
            "rating": review.rating,
            "cuisine_type": review.cuisine_type,
            "canteen": review.canteen,
            "imageId": review.imageId,
            "username": user.username,
            "date": review.date_posted,
        }
        for review, user in reviews
    ]
    return jsonify(reviews_list)


# Load  data
file_path = 'dataset/FoodValues.csv'  # replace with the path to your csv file
df = pd.read_csv(file_path)
df2 = df[['genre', 'Description', 'foodName']]
df2 = df2.dropna()
text_data = np.array(df.Description)
# Load saved model

model_path = 'my_model.h5'
model = SentenceTransformer(model_path)

embeddings = model.encode(text_data, show_progress_bar=True)
X = np.array(embeddings)
n_comp = 5
pca = PCA(n_components=n_comp)
pca.fit(X)
cos_sim_data = pd.DataFrame(cosine_similarity(X))


def give_recommendations(index):
    index_recomm = cos_sim_data.loc[index].sort_values(ascending=False).index.tolist()[1:6]
    food_recomm = df2['foodName'].loc[index_recomm].values
    desc_recomm = df2['Description'].loc[index_recomm].values
    genre_recomm = df2['genre'].loc[index_recomm].values

    result = {'Food Item': food_recomm.tolist(),
              'Description': desc_recomm.tolist(),
              'Genre': genre_recomm.tolist()}
    return result
@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()

    # get the food item from the request data
    food_item = data.get('food_item')
    try:
        # find the index of the food item in your data
        index = df2[df2['foodName'] == food_item].index[0]
    except IndexError:
        return jsonify({"error": "Food item not found"}), 404

    recommendations = give_recommendations(index)

    # get the list of recommended food items
    recommended_food_items = recommendations['Food Item']

    # iterate over the list and get the image id and genre name for each food item
    for i, food_item in enumerate(recommended_food_items):
        food = db.session.query(FoodItem, FoodGenre).join(FoodGenre, FoodItem.genreId == FoodGenre.genreId).filter(FoodItem.foodName == food_item).first()
        if food:
            # add the image id, rating and genre name to the recommendations'
            print("FOOD IS ", food)
            recommendations['Food Item'][i] = {
                'food_name': food_item,
                'imageId': food.FoodItem.imageId,
                'rating': food.FoodItem.Ratings,
                'genre_name': food.FoodGenre.genreName,
            }

    # sort the list of dictionaries by 'rating' in descending order
    recommendations['Food Item'] = sorted(recommendations['Food Item'], key=lambda x: x['rating'], reverse=True)

    return jsonify(recommendations)

@app.route('/search', methods=['POST'])
def add_search():
    data = request.get_json()

    # get the user id and food item from the request data
    userEmail = data.get('user_email')
    user = User.query.filter_by(email=userEmail).first()
    food_item = data.get('food_item')


    new_search = SearchHistory(user_id=user.id, food_item=food_item)

    db.session.add(new_search)
    db.session.commit()

    return jsonify({"message": "Search added successfully"}), 200


@app.route('/api/searchhistory/<string:user_email>', methods=['GET'])
def get_latest_search_history(user_email):
    user = User.query.filter_by(email=user_email).first()
    try:
        # get the latest search history for the user
        search_history = SearchHistory.query.filter_by(user_id=user.id).order_by(SearchHistory.timestamp.desc()).first()
        if search_history:
            # convert the search history object to a dictionary so it can be returned as json
            search_history_dict = {
                'id': search_history.id,
                'user_id': search_history.user_id,
                'food_item': search_history.food_item,
                'timestamp': search_history.timestamp.strftime('%Y-%m-%d %H:%M:%S')  # format the datetime as a string
            }
            return jsonify(search_history_dict), 200
        else:
            return jsonify({"message": "No search history found for user"}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/api/reviews', methods=['POST'])
def submit_review():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    userEmail = request.json.get('userEmail', None)
    food_name = request.json.get('foodName', None)
    review_description = request.json.get('reviewDescription', None)
    rating = request.json.get('rating', None)
    cuisine_type = request.json.get('cuisineType', None)
    canteen = request.json.get('canteen', None)
    imageLink = request.json.get('imageLink', None)
    if not all([userEmail, food_name, review_description, rating, cuisine_type, canteen, imageLink]):
        return jsonify({"msg": "Missing parameters"}), 400
    user = User.query.filter_by(email=userEmail).first()
    print(user)
    print(request.json)
    new_review = Review(
        user_id=user.id,
        food_name=food_name,
        review_description=review_description,
        rating=rating,
        cuisine_type=cuisine_type,
        canteen=canteen,
        imageId=imageLink
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"msg": "Review submitted successfully", "reviewId": new_review.id}), 201


@app.route('/api/establishments/<int:establishmentId>/stalls/<int:stallId>/items', methods=['GET'])
def get_stall_items(establishmentId, stallId):
    items = db.session.query(FoodItem, FoodGenre).join(FoodGenre,
                                                       FoodItem.genreId == FoodGenre.genreId) \
                                                 .filter(FoodItem.establishmentId == establishmentId,
                                                         FoodItem.stallId == stallId).all()

    result = []

    for item, genre in items:
        item_data = {
            'stallId': item.stallId,
            'establishmentId': item.establishmentId,
            'foodName': item.foodName,
            'imageId': item.imageId,
            'genreName': genre.genreName,
        }
        result.append(item_data)

    return jsonify(result)

@app.route('/api/establishments/<int:establishmentId>/stalls', methods=['GET'])
def get_stalls(establishmentId):
    stalls = FoodData.query.filter_by(establishmentId=establishmentId).all()
    result = []

    for stall in stalls:
        stall_data = {
            'stallId': stall.stallId,
            'establishmentId': stall.establishmentId,
            'stallName': stall.stallName,
            'imageId': stall.imageId
        }
        result.append(stall_data)


    return jsonify(result)
if __name__ == '__main__':
    try:
        with app.app_context():
            db.create_all()
            populate_db()
    except:
        pass
    app.run(debug=True, port=5001)
