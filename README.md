# Beije Tech Backend Case README

This README file contains details and instructions for the backend case project prepared for Beije Tech internship application.

## Project Structure

The project is developed using the Nest.js framework.

## Installation

To run the project locally, follow these steps:

1. Install Dependencies
   
   npm install
   
## Environment Variables:

  The project operates with an .env file and E-mail I have delivered must include that .env file (If not please send an email)

## Start the Application:

  npm run start

The project provides the following API endpoints:

POST /user/register

Creates a user registration and sends an email verification token.

Sample JSON body:

{
  "username": "beijeintern",
  "email": "beije.intern@hotmail.com"
}
GET /user/verify-email/{username}/{verificationToken}

Verifies the user's email address.

GET /user/check-verification/{username}

Checks if the user's email address has been verified.


## Usage of ChatGPT or Co-Pilot
ChatGPT was benefitted in order to set a template for the project. But it was unable to support me in email-verification and email-sending part. For that I part, I utilized Youtube and Stackoverflow for the problems I encountered.
CHATGPT link: https://chatgpt.com/share/26f99311-43f7-4d37-b0f5-d8940cf59c25

## API Testing: 
I have used Postman

## Testing:

  npm run test

For testing I mostly utilized ChatGPT since I didn't have much experience. For correction again I have used Stackoverflow and Youtube tutorials

The testing setup for UserService in this Nest.js application utilizes Jest for unit testing. Key tests include verifying that user registration correctly creates and saves user data,
ensuring register method functionality. Additionally, it confirms that the sendVerificationEmail method successfully triggers an email send operation using mocked SendGrid functionality. 


## Email-Verification

For Emai-verification I have used SendGrid, and its API key is shared in .env file.
