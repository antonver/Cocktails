import requests
import time  # To add delay between requests

# Letters to fetch data for
letters = "abcdefghijklmnopqrstuvwxyz"

# Function to fetch cocktail data based on the letter
def parse_cocktails(letter: str):
    response = requests.get(f"https://www.thecocktaildb.com/api/json/v1/1/search.php?f={letter}")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data for letter {letter}. Status code: {response.status_code}")
        return None


# Iterate over the alphabet and fetch cocktails
for letter in letters:
    data = parse_cocktails(letter)
    if data and data.get("drinks"):
        for drink in data["drinks"]:  # Process all cocktails for the letter, not just the first one
            # Preparing the data to send to your Django API
            cocktail_data = {
                "name": drink.get("strDrink"),  # Add the name field
                "alcoholic": drink.get("strAlcoholic") == "Alcoholic",  # Convert to boolean
                "instruction": drink.get("strInstructions"),
                "image_url": drink.get("strDrinkThumb")  # Use image_url for the serializer
            }

            # Extract ingredients and their measurements
            ingredients = [drink.get(f"strIngredient{i}") for i in range(1, 21)]
            measurements = [drink.get(f"strMeasure{i}") for i in range(1, 21)]

            # Filter out None values and pair ingredients with measurements
            ingredients_measurements = list(zip(ingredients, measurements))
            ingredients_measurements = [(ing, meas) for ing, meas in ingredients_measurements if ing is not None]
            cocktail_data["ingredients"] = ""
            # Add ingredients and measurements to the dictionary
            for ingredient, measurement in ingredients_measurements:
                cocktail_data["ingredients"] += f"{ingredient}: {measurement}; "

            # Send data to Django API
            response = requests.post("http://localhost:8000/cocktails/", json=cocktail_data)

            # Check if the request was successful
            if response.status_code == 201:
                print(f"Cocktail {drink.get('strDrink')} created successfully!")
            else:
                print(f"Failed to create cocktail: {drink.get('strDrink')}. Status code: {response.status_code}")

        # Add a delay between requests to avoid overwhelming the server
        time.sleep(1.5)
