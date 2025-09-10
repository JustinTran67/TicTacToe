# TicTacToe Full Stack Project

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

## Development

This project uses Git for version control. The repository is initialized at the root level to manage both frontend and backend code together.

### Git Commands
- `git status` - Check the current state
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git log --oneline` - View commit history

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Django, Python
- **Version Control**: Git

## Contributing

1. Make your changes
2. Test both frontend and backend
3. Commit your changes with descriptive messages
4. Push to your repository
