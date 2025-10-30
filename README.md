# TicTacToe

A full stack TicTacToe game built with React frontend and Django backend.

## Project Structure

```
tictactoeproject/
├── frontend/          # React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/           # Django backend application
│   ├── backend2/      # Django project settings
│   ├── game/          # Game app
│   ├── venv/          # Virtual environment (not tracked)
│   └── manage.py
├── .gitignore         # Git ignore rules for both frontend and backend
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js and npm (for React frontend)
- Python 3.x (for Django backend)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate
# Install dependencies (if requirements.txt exists)
pip install django
# Run migrations
python manage.py migrate
# Start development server
python manage.py runserver
```

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Django, Python
- **Version Control**: Git
