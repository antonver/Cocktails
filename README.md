Cocktail Selection App

Technologies

React
Tailwind CSS
TypeScript
Django Test Framework
Neural Network Model
Description

The Cocktail Selection App is a modern and elegant web application designed to help users choose the perfect cocktail for parties or to recover from a hangover. The app features a sleek and responsive design built with React and Tailwind CSS. It integrates a small neural network model capable of detecting objects in images, providing users with cocktail suggestions based on visual input.

The backend of the application is powered by Django Test Framework, ensuring robust functionality and smooth user experience. The project is hosted on the DigitalOcean platform:

ns1.digitalocean.com.cocktails.rocks

Setup

1. Clone the Repository
Clone the repository to your local machine:

git clone https://github.com/antonver/Cocktails.git
cd Cocktails
2. Download and Add the Keras Model
Download the Keras model from the link below and add it to the root of the Django project :

[Download Keras Model](https://drive.google.com/file/d/1-5glDsZLshMEkofYrW4ammprQb5M-iUT/view?usp=sharing)

3. Setup the Backend
Navigate to the backend directory and set up the backend environment:

cd backend
python3 -m venv venv            # Create a virtual environment
source venv/bin/activate        # Activate the virtual environment (Linux/macOS)
pip install -r requirements.txt # Install required dependencies
Create your .env file using the sample.env file as an example:

# Create .env file
touch .env
Then, run database migrations:

python manage.py migrate
4. Setup the Frontend
Navigate to the frontend directory and install the necessary dependencies:

cd ../frontend
npm install
5. Run the Backend Server
Now, return to the backend directory and run the Django server:

cd ../backend
python manage.py runserver
6. Run the Frontend Server
Open another terminal window and navigate to the frontend directory:

cd frontend
Create your .env file using the sample.env file as an example:

# Create .env file
touch .env
Then, start the frontend development server:

npm run dev
