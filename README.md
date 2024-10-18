# CRM_Sanders

## How to start the project? 🚀

First of all clone this github repository, make sure you have your SSH key in your local environment.
Also to run both the frontend and backend you will need to create your own (auto-signed) https certificates and add them at the following path `cd path/to/the/project/CRM_Sanders/certs`. Without this you will **NOT** be able to start the project.

### Backend 💾

Make sure you replicate the `env.example` file, to get the secret keys and variables needed please contact the owner of this repository.

Navigate to the project folder and then to the backend folder:

`cd path/to/the/project/CRM_Sanders/backend`

Install all dependencies:

`npm install`

Run the backend:

`npm run dev`

This should run the _stripe cli_ and the database in _MongoDB_ (of course make sure you have mongo up and working). 
**Important:** You will need to navigate to this address on any browser `https://localhost:5001`. Once on the address press on your navigator that you trust this address even though it is not secure, this is due to the https auto-signed certificates. With this the backend and the frontend will be able to communicate.

### Frontend 💻

Make sure you replicate the `env.example` file, to get the secret keys and variables needed please contact the owner of this repository.

Navigate to the project folder and then to the backend folder:

`cd path/to/the/project/CRM_Sanders/frontend`

Install all dependencies:

`npm install`

Run the backend:

`npm run dev`

This should run the Frontend in with react admin, you will be able to see the project at `https://localhost:5173/`. Once on the address press on your navigator that you trust this address even though it is not secure, this is due to the https auto-signed certificates.

### If no errors show up it means you're all set, Happy Coding! 🎉

**Note:** If you need further assistance please contact the owner of this repository.
