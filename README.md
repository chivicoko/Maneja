
# Maneja

  This is an all-in-one project management application that provides access to all of the resources and the people that are involved in any project you have created. It makes task management a lot easier. You can easily create your own project, create tasks for the project from beginning to completion. And you can add team members for every project and every task just be dragging and dropping users into it; or by adding team members via the provided form. The same for swapping teams. Everything is draggable. It's made easy for all users.

## Project Setup

This project is built using Python/Django for the backend and ReactJs for the frontend. So there are two parent directories inside the project: the `dj-backend` directory which is the python/django part, and the `react-frontend` directory which is the react-js part.

### 1. Install Dependencies
Ensure you have **python**, **pip**, **Node.js** and **npm** installed on your system.
Inside the `dj-backend` directory (navigate into it by running the command: `cd dj-backend`):
  - Create a virtual environment:
```bash
python -m venv venv
```
  - Navigate into the virtual environment:
  - for bash/linux terminal users:
```bash
source venv/Scripts/activate
```
  - for windows/non linux/non bash users:
```bash
venv\Scripts\activate
```

  - Run the following command to install the dependencies for the backend and start the backend server:
```bash
pip install -r requirements.txt
```

  - Run the following to create admin:
```bash
py manage.py createsuperuser
```
  and fill in the necessary required details to proceed.
  
  - Run the server:
```bash
py manage.py runserver
```
OR, you can specify the port number
```bash
py manage.py runserver 9000
```

the server will be started on the default port of 8000, or on the specified port(9000, for example)
open the admin on the browser at `http://127.0.0.1:8000/admin/`

### 3. Run the Development Server
Once the dependencies are installed, you can start the Vue development server:
```bash
npm run dev
```
This will start the application at `http://localhost:3000/`.

Visit [the preview of the application here](https://okoye-victor-chibuzo-lendsqr-fe-test.vercel.app/) .

More information in the `PROJECT_DOCUMENTATION.md` file.

Happy Hacking!