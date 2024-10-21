# QuikCommit

QuikCommit is a CLI tool that automatically generates git commit messages based on the last file changes using AI (Google Gemini API).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/enigma-137/quikcommit.git
    ```

2. Navigate to the project directory:
    ```bash
    cd quikcommit
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Make the script executable:
    ```bash
    chmod +x index.js
    ```

5. Add your Google Gemini API key in `index.js`:
    ```js
    const apiKey = 'YOUR_GEMINI_API_KEY';
    ```

6. Initialize a Git repository in your project:
    ```bash
    git init
    ```

## Usage

Once the setup is complete, you can run the tool with:
```bash
node index.js
