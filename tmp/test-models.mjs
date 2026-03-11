import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

async function listModels() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
    
    if (!apiKeyMatch) {
      console.error('API Key not found in .env.local');
      return;
    }
    
    const apiKey = apiKeyMatch[1].trim();
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // The SDK doesn't have a direct listModels, we have to use the low level fetch if we want that
    // but we can try to get the model info for a few common ones to see what exists
    const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro', 'gemini-2.0-flash-exp', 'gemini-pro'];
    
    console.log('Testing model availability...');
    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        // Just try to initialize a chat to see if it throws immediately
        console.log(`- ${modelName}: Initialized`);
      } catch (e) {
        console.log(`- ${modelName}: FAILED`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
