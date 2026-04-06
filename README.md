# Silent Speak

**Silent Speak** is a React Native (Expo) mobile application designed to support individuals who experience anxiety, autism, or nonverbal episodes. It provides a calm, accessible, and customizable way to communicate without relying on speech.

The app empowers users to express themselves through personalized communication cards, helping them navigate stressful situations, overwhelming environments, or everyday interactions with confidence and clarity.

Unlike many existing communication tools that feel overly complex or juvenile, Silent Speak prioritizes dignity, emotional clarity, and a mature, minimal user experience.


## Core Features

### Communication Cards
- Create personalized communication cards
- Create new cards within 2 clicks
- Edit and delete cards as desired
- Baseline stack of cards automatically created for each user
- Cards designed for quick access during stressful moments

### Display Mode
- Expand cards into a focused “display mode”
- Optimized for readability 

### Authentication
- Individual user accounts
- Personalized data and card storage
- Email verification & Password reset options

### Visual Preferences
- Dark & light mode
- Personalizable highlight color

## Design Philosophy

Silent Speak is built around three key principles:

### 1. Dignity
The interface avoids childish visuals and instead focuses on a clean, modern design that respects users of all ages.

### 2. Emotional Clarity
Cards are designed to clearly communicate feelings, needs, and intentions without confusion or overload.

### 3. Accessibility & Comfort
- Simple navigation
- Minimal cognitive load
- Calm, supportive visual design (including theme support)

## Tech Stack

- **Framework:** React Native (Expo)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Backend:** Firebase (Authentication + Database)

## Future Features

- Emergency button to alert a trusted contact
- Text-to-speech integration
- Advanced customization (folders, favorites, size adjustment)
- Sharing cards app-to-app
- Interactive notes/typing section
- emergency medical details or contact information
- How to help section: to document things like grounding techniques, comfort foods, etc.


## Setup Instructions

### Prerequisites

-   Node.js
-   Expo CLI (or use `npx expo`)

### 1. Clone the Repository

`` git clone https://github.com/mikaylahubbard/silent-speak.git ``   
`` cd silent-speak 11 ``  
`` npm install ``  

### 2\. Create Environment Variables

This project uses Firebase for authentication and data storage.

You will need to create your own Firebase project and provide your API key.

#### Steps:

1.  Go to <https://console.firebase.google.com/>
2.  Create a new project
3.  Enable Authentication (Email/Password)
4.  Create a Firestore database
5.  Copy the **Firebase API Key**

### 3\. Configure `.env`

Create a `.env` file in the root of the project:

``FIREBASE_API_KEY=your_firebase_api_key_here``   

### 4\. Run the App

npx expo start -c

Then:

-   Press `i` to open the iOS simulator
-   Press `a` to open the Android emulator
-   Or scan the QR code using the Expo Go app on your phone





