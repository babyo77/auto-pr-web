# Auto PR - Write Better and Faster 🚀

[![GitHub Stars](https://img.shields.io/github/stars/babyo77/auto-pr-web?style=social)](https://github.com/babyo77/auto-pr-web)
[![License](https://img.shields.io/github/license/babyo77/auto-pr-web)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%5E4-blue)](https://tailwindcss.com/)

Save time writing professional pull request messages with **Auto PR**. It analyzes your code changes and generates meaningful summaries in seconds. Transform your GitHub workflow today!

[![Auto PR Web](https://github.com/user-attachments/assets/875636ac-7cd4-486d-ac6a-2af3bc5e949e)](https://github.com/user-attachments/assets/1113eacc-252e-4391-8311-0649d632ddea)

## ✨ Features

-   **AI-Powered Descriptions**: Uses AI to understand code context and create clear, concise PR descriptions. 🧠
-   **One-Click Generation**: Generates complete PR descriptions instantly with a single button press. 🖱️
-   **Customizable Instructions**: Allows you to add special instructions to tailor the README generation. 📝
-   **Auto-Fill System**: Automatically populates your GitHub PR description field. 📤
-   **Chrome Extension**: Seamless integration with your GitHub workflow. 🔗
-   **Markdown Support**: Formats descriptions properly for readability. ✅

## 🖥️ Tech Stack

-   [Next.js](https://nextjs.org/) - React framework for building performant web applications
-   [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development
-   [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible React components
-   [Firebase](https://firebase.google.com/) - Backend-as-a-Service (BaaS) for authentication and data storage
-   [Lucide React](https://lucide.dev/) - Beautifully simple, pixel-perfect icons in React
-   [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React

## 📂 Directory Structure

```
└── auto-pr-web/
    ├── README.md
    ├── components.json          # Configuration for Shadcn UI components
    ├── eslint.config.mjs        # ESLint configuration
    ├── next.config.ts           # Next.js configuration
    ├── package.json             # Project dependencies and scripts
    ├── pnpm-lock.yaml           # Dependency lockfile for pnpm
    ├── postcss.config.mjs       # PostCSS configuration
    ├── tsconfig.json            # TypeScript configuration
    ├── public/                  # Static assets
    └── src/
        ├── app/                 # Next.js application directory
        │   ├── globals.css      # Global CSS styles
        │   ├── layout.tsx       # Root layout for the application
        │   ├── (auth)/          # Authentication routes
        │   │   └── login/       # Login page
        │   │       └── page.tsx # Login page component
        │   ├── (pages)/         # Application pages
        │   │   ├── layout.tsx   # Layout for main pages
        │   │   ├── page.tsx     # Home page component
        │   │   ├── privacy/     # Privacy Policy page
        │   │   │   └── page.tsx # Privacy Policy page component
        │   │   ├── readme/      # README generator page
        │   │   │   └── page.tsx # README generator page component
        │   │   ├── settings/    # Settings page
        │   │   │   └── page.tsx # Settings page component
        │   │   └── terms/       # Terms of Service page
        │   │       └── page.tsx # Terms of Service page component
        │   └── api/             # API routes
        │       └── auth/        # Authentication API routes
        │           └── route.ts # Authentication route handler
        ├── components/          # React components
        │   ├── faq.tsx          # FAQ component
        │   ├── features-1.tsx   # Features section component
        │   ├── hero-section.tsx # Hero section component
        │   ├── hero8-header.tsx # Header component
        │   ├── login.tsx        # Login component
        │   ├── logo.tsx         # Logo component
        │   ├── pricing.tsx        # Pricing component
        │   ├── testimonials.tsx   # Testimonials component
        │   ├── magicui/           # Magic UI components
        │   │   └── border-beam.tsx # Border beam component
        │   └── ui/                # Shadcn UI components
        │       ├── accordion.tsx    # Accordion component
        │       ├── avatar.tsx       # Avatar component
        │       ├── button.tsx       # Button component
        │       ├── card.tsx         # Card component
        │       ├── cover.tsx        # Cover component
        │       ├── dialog.tsx       # Dialog component
        │       ├── input.tsx        # Input component
        │       ├── label.tsx        # Label component
        │       ├── progressive-blur.tsx # Progressive Blur component
        │       ├── sparkles.tsx      # Sparkles component
        │       ├── switch.tsx         # Switch component
        │       ├── text-hover-effect.tsx # Text Hover Effect component
        │       └── textarea.tsx       # Textarea component
        ├── hook/                # Custom React hooks
        │   └── useClarity.tsx     # Clarity tracking hook
        └── lib/                 # Utility and library files
            ├── AuthContext.tsx    # Authentication context provider
            ├── admin.ts           # Firebase admin SDK initialization
            ├── auth.ts            # Authentication utilities
            ├── firebase.ts        # Firebase client SDK initialization
            └── utils.ts           # Utility functions

```

## 🛠️ Installation

1.  Install the Chrome Extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/auto-pr/dgajcddckegcnooalnkgflofpplghfpn).
2.  Log in with your Google Account.
3.  Navigate to a GitHub pull request.
4.  Click the "Generate README" button and watch the magic happen! ✨

## 🚀 Getting Started

1.  Install the Chrome Extension
2.  Create or Open a new pull request
3.  Add your github URL to README generator page
4.  Click Generate and done 🎉

## 📝 Configuration

-   `components.json`: Configuration for Shadcn UI components.
-   `eslint.config.mjs`: ESLint configuration.
-   `next.config.ts`: Next.js configuration.
-   `postcss.config.mjs`: PostCSS configuration.
-   `tsconfig.json`: TypeScript configuration.

## 🤝 Contributing

Contributions are always welcome! Feel free to fork the repository and submit pull requests.

## 📝 License

[MIT](LICENSE)
