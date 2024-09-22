# Node.js Backend Development Tutorials

This repository contains various tutorials and examples for backend development using **Node.js**, **Express.js**, and **MongoDB**.

## Features
- Basic setup and configuration of a Node.js server
- CRUD operations with MongoDB
- RESTful API development using Express.js
- JWT-based authentication
- Dynamic views using EJS templates
- Configuration management with **config** package

## Installation
1. Clone the repository:
   git clone https://github.com/Ozy20/node.js.git

2. Install dependencies:
   npm install

3. Configure your application:
   - Create a `config` folder in the root of your project.
   - Add configuration files for different environments (e.g., `development.json`, `production.json`).
   - Example `development.json`:
     {
       "jwtsec": "your-secret-key",
       "db": "mongodb://127.0.0.1:27017/your-db"
     }

4. Run the application:
   node app.js

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose** (ODM for MongoDB)
- **JWT** (JSON Web Token for authentication)
- **EJS** (Embedded JavaScript templating)
- **config** (Configuration management)


