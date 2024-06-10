# Firebase Authentication with Next.js

This project demonstrates the integration of Firebase Authentication within a Next.js application. It showcases how to authenticate users using Firebase's phone number verification and Google sign-in methods.

## Getting Started

Before you begin, ensure that you have set up your Firebase project in the Firebase console. Enable both phone number verification and Google authentication to proceed.

## Installation

Install the necessary packages to integrate Firebase into your Next.js app:

```bash
npm install firebase react-firebase-hooks
```

## Authentication Setup

### Configuration

Locate the config.ts file within the firebase directory. This file contains the Firebase configuration required for initializing the service in your application.

### Phone Verification

For implementing phone verification, refer to the signin.tsx file located in the app directory. This component handles the logic for verifying a user’s phone number.

### Google Authentication

To set up Google authentication, check out the signup.tsx file inside the google folder within the app directory. This component manages the Google sign-in process.

### Session Management

To manage user sessions, refer to the page.tsx file in the dashboard folder of the app directory. This middleware ensures that a user’s session is active by verifying the Firebase cookie.

## Conclusion

By following the instructions and referring to the provided files, you can successfully implement Firebase Authentication in your Next.js application. Enjoy building secure and scalable web applications!
