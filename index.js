#!/usr/bin/env node

require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const simpleGit = require('simple-git');
const git = simpleGit();

const apiKey = process.env.GEMINI_API_KEY;

// Initialize the GoogleGenerativeAI
const client = new GoogleGenerativeAI({
  apiKey: apiKey,  
});

async function generateCommitMessageUsingAI(diff) {
  try {
    const request = {
      prompt: {
        text: `Please generate a concise and meaningful commit message for the following git diff:\n\n${diff}`
      },
      model: 'gemini-1.5-flash',
    };

    // Call the API to get the commit message
    const [response] = await client.generateText(request);
    return response.generated_text;  
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
    if (!commitMessage) {
      console.log('Failed to generate a commit message. Aborting commit.');
      return; 
    }
  
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
  
  // Execute the main function and handle errors
  (async () => {
    try {
      await main();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  })();
  
