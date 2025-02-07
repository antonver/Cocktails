# Cocktails Project

Ce projet est une application Django et React pour explorer et gérer des cocktails.

## Installation et Configuration

### 1. Cloner le projet
```sh
git clone https://github.com/antonver/Cocktails.git
cd Cocktails
```

### 2. Télécharger le modèle Keras
Téléchargez le modèle depuis [ce lien](https://drive.google.com/file/d/1-5glDsZLshMEkofYrW4ammprQb5M-iUT/view?usp=sharing) et ajoutez-le à la racine du projet Django (dans le conteneur backend Docker).

### 3. Configuration du Backend
```sh
cd backend
python3 -m venv venv  # Créer un environnement virtuel
source venv/bin/activate  # Activer l'environnement virtuel (Linux/macOS)
pip install -r requirements.txt  # Installer les dépendances
```

### 4. Configurer les variables d'environnement
Créez un fichier `.env` en vous basant sur `sample.env` et remplissez les informations nécessaires.

### 5. Appliquer les migrations de la base de données
```sh
python manage.py migrate
```

### 6. Lancer le serveur Django
```sh
python manage.py runserver
```

## Configuration du Frontend
```sh
cd ../frontend  
npm install  # Installer les dépendances
```

Créez un fichier `.env` en vous basant sur `sample.env` et remplissez les informations nécessaires.

### 7. Lancer l'application frontend
Ouvrez un autre terminal et exécutez :
```sh
cd frontend
npm run dev
```

## Chargement de la base de données
Assurez-vous que le serveur Django est en cours d'exécution, puis exécutez :
```sh
python backend/parseApi.py
```
Ce script extrait les données de l'API [TheCocktailDB](https://www.thecocktaildb.com/api.php) et les insère dans la base de données.

This website was deployed on DigitalOcean platform: https://ns1.digitalocean.com.cocktails.rocks

### The main page:
<img width="1412" alt="main page" src="https://github.com/user-attachments/assets/35b3dabf-d68f-4b1f-b32d-0df96b7da221" />

### List of cocktails:
<img width="1412" alt="List of cocktails" src="https://github.com/user-attachments/assets/9d4d8f31-4a29-44f8-8737-f383247fe73d" />

### Cocktails card:
<img width="1412" alt="Cocktails card" src="https://github.com/user-attachments/assets/b5fe0405-db46-4ec9-93a2-26d914edd447" />

### Rock-paper-scissors game with ML model:

<img width="1412" alt="Rock-paper-scissors game with ML model" src="https://github.com/user-attachments/assets/7caad490-5cfa-4ee1-87b0-50c1f0e1e16f" />










