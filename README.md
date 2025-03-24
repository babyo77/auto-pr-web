# Auto PR Web

![Auto PR Web](https://i.pinimg.com/originals/c4/7b/9a/c47b9a94986b92ac592745ad3a1b8815.gif)

## Overview

Auto PR Web is a powerful tool that helps developers generate complete, professional pull requests automatically. Our Chrome extension can save you approximately 30 minutes per PR by streamlining the documentation process.

## Features

- **Automatic PR Generation**: Write pull requests in seconds
- **Chrome Extension**: Easy-to-use browser integration
- **Time-Saving**: Save an average of 30 minutes per pull request
- **Professional Output**: Generate well-structured, comprehensive pull requests

## Getting Started

### Prerequisites

- Node.js (v20 or newer)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/babyo77/auto-pr-web.git
   cd auto-pr-web
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file based on the provided example.

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technology Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Authentication**: Firebase
- **Payment Processing**: Razorpay
- **UI Components**: Radix UI

## Project Structure

```
auto-pr-web/
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # Reusable UI components
│   └── lib/             # Utility functions and libraries
├── public/              # Static assets
└── ...config files
```

## Deployment

To build the application for production:

```bash
pnpm build
pnpm start
```

## Chrome Extension

The Chrome extension allows users to generate pull requests directly from their GitHub interface. To get the extension:

1. Visit our website and click "Add to Chrome"
2. Or install from the Chrome Web Store (link coming soon)

