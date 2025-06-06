LeetCode Clone

A clone of the popular LeetCode platform built to demonstrate front-end and back-end integration along with a modern application architecture. 
This project is a personal project built to practice building full-stack applications and replicate the LeetCode user experience. 
Note that this project is not deployed – it’s showcased here for demonstration.

![image](https://github.com/user-attachments/assets/4f1d75af-04d8-4d23-b7fe-f6c6a39a003d)

Table of Contents

Features
Tech Stack
Project Structure
Installation
Usage
Future Improvements
Contributing
License
Acknowledgements

Features

User Authentication: Sign up, log in, and secure routes for user-specific actions.
Problem Listings: Browse and select from a list of coding problems.
Problem Details: View detailed descriptions, examples, and expected outputs.
Code Editor: Built-in code editor to write and run your solutions, with basic test output displayed.
Responsive UI: Responsive design for a smooth experience across devices.
Dark Themed Interface: Eye-friendly dark theme, similar to modern coding platforms.

Tech Stack

Front-end: NextJs, Typescript, TailwindCss
Back-end: NodeJs with Express
Database: MongoDB (via Mongoose)

Other Tools:
Git for version control
npm package management

Project Structure

client/: Contains all front-end code (React components, pages, styling).
server/: Contains all back-end code (Express server, API routes, database models).

Installation

Clone the Repository
git clone https://github.com/Jatti045/leetcode-clone.git
cd leetcode-clone

Install Dependencies

Client:
cd client
npm install

Server:
cd server
npm install

Configure Environment Variables

In the client directory, create a .env file with your configuration details:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
JWT_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY (stripe payment)=

In the server directory, create a .env file with your configuration details (e.g., database connection string, port, JWT secret, etc.):

PORT=5000
CORS_ORIGIN=http://localhost:3000
MONGO_URI=
JWT_SECRET_KEY=
REDIS_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

Start the Application

Server:
cd server
npm run dev

Client (in a separate terminal):

cd client
npm run dev

Open the App

Visit http://localhost:3000 in your browser to see the application running.

Usage

Browse Problems: View the list of coding problems on the homepage.
Select a Problem: Click on any problem to view its description, constraints, and examples.
Solve a Problem: Use the built-in code editor to write your solution, then run the code to check against test cases.
Log In or Sign Up: If you need user-specific features (like saving progress), log in or create a new account.


Pull Requests
For contributions or changes, create a feature branch and open a pull request for review.

Future Improvements

Additional Programming Languages: Expand the code editor to support more languages (e.g., Python, C++).
User Profiles: Track users’ solved problems and provide statistics.
Discussion Forum: Enable users to discuss problem solutions.
Deployment: Deploy the application to a hosting platform like Heroku, AWS, or Netlify for the front-end.

Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork this repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit your changes (git commit -m 'Add new feature').
Push to your branch (git push origin feature/new-feature).
Open a Pull Request detailing your changes.

License
This project is licensed under the MIT License. Feel free to use and modify the code. See the LICENSE file for details.

Acknowledgements
LeetCode for inspiring this project.
