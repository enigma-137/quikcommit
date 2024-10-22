
# QuikCommit

**QuikCommit** is a command-line tool that automatically generates concise commit messages based on your git changes. You can use either a default non-AI message or integrate with Google's Generative AI to generate smarter commit messages.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
  - [Install as a Dependency](#install-as-a-dependency)
  - [Clone the Repository](#clone-the-repository)
- [Usage](#usage)
  - [Without AI Key](#usage-without-ai-key)
  - [With AI Key](#usage-with-ai-key)
  - [CLI Commands](#cli-commands)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Introduction

QuikCommit streamlines your Git workflow by auto-generating commit messages based on your recent file changes. You can either use a default message or, for more intelligent suggestions, leverage Google's Generative AI.

## Features

- Auto-generates commit messages based on the recent git `diff`.
- Optional integration with Google's Generative AI for smarter, context-aware commit messages.
- Supports a fallback to non-AI commit messages if no API key is provided.
- Simple and easy to integrate into your workflow.

---

## Installation

### Install as a Dependency

1. **Install globally via npm:**

   ```bash
   npm install -g quikcommit
   ```

2. **Initialize a Git repository** (if not already done):

   ```bash
   git init
   ```

3. **Optional**: Add your Google Generative AI API key for smarter commit messages:
   - Create a `.env` file in your project’s root folder and add:
     ```bash
     GEMINI_API_KEY=your_google_ai_api_key
     ```

4. Run `quikcommit` in your Git repository to auto-generate commit messages.

### Clone the Repository

Alternatively, you can clone and run the project directly:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/quikcommit.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd quikcommit
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Optional**: Set up the AI API key in a `.env` file as described earlier for smarter commit messages.

5. Run the script:

   ```bash
   node index.js
   ```

---

## Usage

### Without AI Key

If you do not set an API key, **QuikCommit** will use a fallback commit message. Simply run:

```bash
quikcommit
```

The tool will:
1. Check for changes using `git diff`.
2. Generate a default message like "Changes made" if no AI key is provided.
3. Stage and commit the changes automatically.

### With AI Key

For AI-powered commit messages, ensure your API key is set in the environment variables:

1. Add your `GEMINI_API_KEY` in a `.env` file.
2. Run:

   ```bash
   quikcommit
   ```

With the API key, QuikCommit will:
1. Use Google's Generative AI to analyze the `git diff`.
2. Generate an AI-suggested commit message based on the changes.
3. Stage and commit the changes with the AI-generated message.

### CLI Commands

- **Generate Commit and Push Changes**:

   ```bash
   quikcommit
   ```

- If you are not in a Git repository, initialize it first:

   ```bash
   git init
   ```

---

## Environment Variables

If you want AI-generated commit messages, set up your environment variables:

1. Create a `.env` file in your project’s root directory.
2. Add your API key:

   ```bash
   GEMINI_API_KEY=your_google_ai_api_key
   ```

Without this key, QuikCommit will fall back to using default non-AI commit messages.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Summary

- **Option 1**: Use default commit messages (no API key needed).
- **Option 2**: Set up a `GEMINI_API_KEY` for AI-powered commit messages.
