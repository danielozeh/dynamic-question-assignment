# Dynamic Question Assignment System

## Overview

The Dynamic Question Assignment System is a Node.js application designed to assign questions to users based on their region and a cyclical schedule. The system utilizes MongoDB for data storage and Mongoose for modeling the database schema. It efficiently handles question assignments and provides a straightforward API for retrieving assigned questions.

## Features

- **Cycle-Based Question Assignment**: Automatically assigns questions to regions based on a defined cycle.
- **Configurable Cycle Duration**: Easily adjustable cycle duration to accommodate different requirements.
- **Dynamic Retrieval**: Fetches assigned questions based on the current cycle and user region.
- **Unit Testing**: Comprehensive test coverage using Jest and MongoDB Memory Server for in-memory database testing.

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **MongoDB**: NoSQL database for storing questions and assignments.
- **Jest**: Testing framework for JavaScript, used for unit tests.
- **MongoDB Memory Server**: In-memory MongoDB server for testing.

## Getting Started

### Prerequisites

- Node.js (v18.x)
- MongoDB (for production use)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/danielozeh/dynamic-question-assignment.git
   cd dynamic-question-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a .env file:

   ```bash
   MONGO_URI=your_mongodb_uri
   ```

### Running the Application

To start the application, run:

```bash
npm start
```

### Running the Tests

To run the tests, run:

```bash
npm test
```

### API Endpoints

#### Create Question

URL: /api/questions
Method: POST
Description: Creates a new question.
```bash
{
  "content": "What is the capital of France?"
}
```
```bash
curl -X POST http://localhost:5001/api/questions \
-H "Content-Type: application/json" \
-d '{"content": "What is your favorite programming language?"}'
```

#### Assign Questions to Cycle

URL: /api/assign-questions
Method: POST
Description: Assigns questions to regions based on the current cycle.

#### Get Assigned Question

URL: /api/get-assigned-question/:region
Method: GET
Description: Retrieves the assigned question for a specified region based on the current cycle.
URL Parameters:
- region: The region for which to retrieve the assigned question (e.g., 'Singapore', 'US').

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

- Node.js
- Express
- Mongoose
- MongoDB
- Jest
- MongoDB Memory Server

## Author
Daniel Ozeh - [GitHub](https://github.com/danielozeh)