# Network

A work-in-progress Django social network application for CS50W Project 4.

## Current Features

- User registration
- Login and logout
- Custom `User` model
- Basic `Post` model
- All Posts page scaffold
- New post form scaffold

## Tech Stack

- Python
- Django
- SQLite
- HTML
- CSS

## Getting Started

Install Django if needed:

```bash
pip install django
```

Apply migrations:

```bash
python manage.py migrate
```

Run the development server:

```bash
python manage.py runserver
```

Open the app at `http://127.0.0.1:8000/`.

## Project Structure

- `network/` - Django app with models, views, URLs, templates, and static files
- `project4/` - Django project settings and root URL configuration
- `manage.py` - Django command-line entry point

## Notes

This project is still under active development. Local database files and Python cache files should not be committed.