#!/usr/bin/env node

require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const simpleGit = require('simple-git');

const git = simpleGit();
const apiKey = process.env.GEMINI_API_KEY;

let aiEnabled = true;
if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set. Falling back to default commit messages.');
  aiEnabled = false; // Disable AI if no API key is set
}

let genAI, model;
if (aiEnabled) {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
}

async function generateCommitMessageUsingAI(diff) {
  if (!aiEnabled) {
    return 'Default commit message: Changes made'; // Fallback message
  }

  try {
    const prompt = `Please generate a concise and meaningful commit message for the following git diff:\n\n${diff}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    if (generatedText) {
      return generatedText.trim();
    } else {
      console.error('AI generated an empty response.');
      return 'AI could not generate a message; using default message: New commit';
    }
  } catch (error) {
    console.error('Error generating commit message with AI:', error);
    return 'AI could not generate a message; using default message: New commit';
  }
}

// Fetch the latest git diff
async function getGitDiff() {
  try {
    const diff = await git.diff();
    return diff;
  } catch (error) {
    console.error('Error fetching git diff:', error);
    return null;
  }
}

// Main function to handle the CLI logic
async function main() {
  const diff = await getGitDiff();
  if (!diff) {
    console.log('No changes detected in the repository.');
    return;
  }

  const commitMessage = await generateCommitMessageUsingAI(diff);
  console.log('Generated Commit Message:', commitMessage);

  // Optionally, automatically commit the changes
  try {
    await git.add('.'); // Stage all changes
    console.log('Changes staged for commit.');

    await git.commit(commitMessage);
    console.log('Changes committed with message:', commitMessage);
  } catch (error) {
    console.error('Error during git add or commit:', error);
  }
}

// Execute the main function and handle unknown errors
(async () => {
  try {
    await main();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
