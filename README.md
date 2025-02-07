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



