# Cocktails Project

This project is a Django and React application for exploring and managing cocktails.

## Installation and Setup

### 1. Clone the Project
```sh
git clone https://github.com/antonver/Cocktails.git
cd Cocktails
```

### 2. Download the Keras Model
Download the model from [this link](https://drive.google.com/file/d/1-5glDsZLshMEkofYrW4ammprQb5M-iUT/view?usp=sharing) and add it to the root of the Django project .

### 3. Backend Setup
```sh
cd backend
python3 -m venv venv  # Create a virtual environment
source venv/bin/activate  # Activate the virtual environment (Linux/macOS)
pip install -r requirements.txt  # Install dependencies
```

### 4. Configure Environment Variables
Create a `.env` file using `sample.env` as an example and fill in the required information.

### 5. Apply Database Migrations
```sh
python manage.py migrate
```

### 6. Start the Django Server
```sh
python manage.py runserver
```

## Frontend Setup
```sh
cd ../frontend  
npm install  # Install dependencies
```

Create a `.env` file using `sample.env` as an example and fill in the required information.

### 7. Start the Frontend Application
Open another terminal and run:
```sh
cd frontend
npm run dev
```

## Load Database with Information
Make sure the Django server is running, then execute:
```sh
python backend/parseApi.py
```
This script fetches data from the [TheCocktailDB API](https://www.thecocktaildb.com/api.php) and inserts it into the database.


This website was deployed on the DigitalOcean platform: https://ns1.digitalocean.com.cocktails.rocks

### The main page:
<img width="1412" alt="main page" src="https://github.com/user-attachments/assets/35b3dabf-d68f-4b1f-b32d-0df96b7da221" />

### List of cocktails:
<img width="1412" alt="List of cocktails" src="https://github.com/user-attachments/assets/9d4d8f31-4a29-44f8-8737-f383247fe73d" />

### Cocktails card:
<img width="1412" alt="Cocktails card" src="https://github.com/user-attachments/assets/b5fe0405-db46-4ec9-93a2-26d914edd447" />

### Rock-paper-scissors game with ML model:

<img width="1412" alt="Rock-paper-scissors game with ML model" src="https://github.com/user-attachments/assets/7caad490-5cfa-4ee1-87b0-50c1f0e1e16f" />










