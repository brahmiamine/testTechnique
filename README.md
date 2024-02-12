# HyperMail Messaging App

## Overview
HyperMail is a messaging application designed to combine essential features for managing messages. The app is split into two main components: a backend service (`back`) built with Node.js and TypeScript using MongoDB, and a frontend (`front`) built with React.js. This README provides guidance on setting up and running the application using Docker and Docker Compose, ensuring a streamlined deployment process.

## Prerequisites
- Docker and Docker Compose installed on your system
- Node.js and npm installed for local development and testing


## Cloning the Project Repository

To get started with the HyperMail Messaging App, you first need to clone the project repository to your local machine. This will allow you to access the source code, make changes, and run the project locally. Follow the steps below to clone the repository:

1. **Open Terminal or Command Prompt:**
   - On macOS or Linux, open the Terminal.
   - On Windows, open Command Prompt or PowerShell.

2. **Navigate to the Directory:**
   - Navigate to the directory where you want to clone the repository using the `cd` command. For example:
     ```
     cd path/to/your/directory
     ```

3. **Clone the Repository:**
   - Use the `git clone` command followed by the URL of the repository. Replace `repository-url` with the actual URL of the project repository. You can find this URL on the GitHub page of the project.
     ```
     git clone https://github.com/your-username/your-repository-url.git
     ```
   - Press Enter, and Git will begin cloning the repository to your specified directory.

4. **Navigate to the Project Directory:**
   - Once the cloning process is complete, navigate into the project directory:
     ```
     cd your-repository-name
     ```

5. **Continue with Project Setup:**
   - After successfully cloning the repository, you can proceed with the rest of the project setup, including installing dependencies and configuring environment variables as described in the previous sections of this README.

## Environment Setup

### back `.env` Configuration
1. **Rename `.env.example` to `.env` or Create a New `.env` File:**
   - If your project includes an `.env.example` file, rename it to `.env`.
   - Alternatively, create a new `.env` file in the root directory of both the `back` components of your project.
```
APP_PORT=3001
SECRET_KEY=qwe1234
MONGO_URL=mongodb://localhost:27017/hypermail?authSource=admin
```
   - The `SECRET_KEY` is a value used to sign and verify JSON Web Tokens (JWTs) for authentication purposes. Enter a random, secure value for this variable. For example:
     ```
     SECRET_KEY=yourRandomSecureValueHere
     ```
   - Ensure you save the `.env` file after making these changes.

### front `.env` Configuration
1. **Rename `.env.example` to `.env` or Create a New `.env` File:**
   - If your project includes an `.env.example` file, rename it to `.env`.
   - Alternatively, create a new `.env` file in the root directory of `front` components of your project.
```
REACT_APP_API=http://localhost:3001/api/v1/
REACT_APP_BASE_URL=http://localhost:3001
```

### MongoDB Atlas Setup

To configure your MongoDB database, it's recommended to use MongoDB Atlas, a fully-managed cloud database service. Follow the steps in the video tutorial to set up your MongoDB Atlas cluster:

- [MongoDB Atlas Setup Tutorial](https://www.youtube.com/watch?v=jXgJyuBeb_o)

### Configuring the `.env` File

After setting up your MongoDB Atlas cluster, you will receive a MongoDB URI. This URI is essential for connecting your application to the MongoDB database. Follow these steps to configure your `.env` file:

1. **Update the `.env` File:**
   - Open the `.env` file in your preferred text editor.
   - Locate the `MONGO_URL` variable and replace its value with your MongoDB URI from MongoDB Atlas. For example:
     ```
     MONGO_URL=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/mydatabase?retryWrites=true&w=majority
     ```
   - Ensure you save the `.env` file after making these changes.

### Finalizing the Configuration

After updating the `.env` file with your MongoDB URI and SECRET_KEY, your application is ready to connect to your MongoDB database securely. The SECRET_KEY should be kept confidential and used consistently across your application for authentication purposes.

--- 


## Node.js Backend Setup

#### Installing Dependencies
Navigate to the `back` directory
```
cd back
```
and run : 
```
npm install
```

#### Building the Application
To compile the TypeScript code, run:
```
npm run build
```

#### Starting the Application
To start the backend service, run:
```
npm start
```

#### Running Tests
To execute tests, run:
```
npm test
```

## React.js Frontend Setup

#### Installing Dependencies
Navigate to the `front` directory
```
cd front
```
and run : 
```
npm install
```

#### Starting the Application
To start the React application, run:
```
npm start
```

## Docker and Docker Compose Setup

To facilitate deployment, a `docker-compose.yml` file is used to containerize and run both the `back` and `front` components along with a MongoDB service.

### Docker Compose Configuration
Ensure you have a `docker-compose.yml` file at the root of your project with the necessary configurations for the backend, frontend, and MongoDB services.

### Starting the Application with Docker Compose
To start the application using Docker Compose, run the following command from the root directory of your project:
```
docker-compose up --build
```

This command builds the images (if not already built) and starts the containers based on the configurations provided in the `docker-compose.yml` file. The `--build` option ensures that the images are rebuilt if there are any changes.

## Accessing the Application
Once the containers are up and running, you can access the frontend of the application by navigating to `http://localhost:3000` in your web browser.

## Conclusion
This README provides a comprehensive guide to setting up and running the HyperMail messaging application using Docker and Docker Compose, along with instructions for local development and environment configuration. Ensure all environment variables are correctly set up as per the instructions to avoid any issues during deployment or local development.
```