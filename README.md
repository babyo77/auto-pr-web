# Auto PR Web ✨

[![Website](https://img.shields.io/badge/Website-Online-brightgreen)](https://auto-pr-web.vercel.app) 

## Overview 🚀

Auto PR Web is a tool designed to help developers generate pull requests automatically. By streamlining the documentation process, our Chrome extension can save developers approximately 30 minutes per PR. This web application serves as the backend and provides the core functionality for the Chrome extension.

**Homepage:** [https://auto-pr-web.vercel.app](https://auto-pr-web.vercel.app)

## Table of Contents 🗺️

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Chrome Extension](#chrome-extension)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features 🌟

- **Automatic PR Generation**: Write pull requests in seconds. ⏱️
- **Chrome Extension**: Easy-to-use browser integration. 💻
- **Time-Saving**: Save an average of 30 minutes per pull request. ⏳
- **Professional Output**: Generate well-structured, comprehensive pull requests. 💼
- **Customizable**: Tailor the PR generation to your specific needs. 🎨

## Getting Started 🚦

To get started with Auto PR Web, follow the instructions below.

### Prerequisites ⚙️

Before you begin, ensure you have the following installed:

- Node.js (v20 or newer)
- pnpm

### Installation 🛠️

1. Clone the repository:

   bash
   git clone https://github.com/babyo77/auto-pr-web.git
   cd auto-pr-web
   
2. Install dependencies:

   bash
   pnpm install
   
### Environment Variables 📝

1. Create a `.env` file based on the provided example. Configure Firebase credentials.

## Usage 💻

1. Run the development server:

   bash
   pnpm dev
   
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technology Stack 📚

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Authentication**: Firebase 🔥
- **UI Components**: Radix UI
- **Animation**: `twa-animate-css` and `motion`

## Project Structure 📂

auto-pr-web/
├── src/
│   ├── app/             # Next.js app routes
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions and libraries
│   └── public/          # Static assets
├── .config files
└── ...

## Deployment 📦

To build the application for production:

bash
pnpm build
pnpm start

## Chrome Extension 🌐

The Chrome extension allows users to generate pull requests directly from their GitHub interface. To get the extension:

1. Visit our website and click "Add to Chrome."
2. Or install from the Chrome Web Store (link coming soon).

## Contributing 🤝

Contributions to Auto PR Web are welcome! Please adhere to the guidelines below:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests for your changes.
4. Submit a pull request with a clear description of your changes.

