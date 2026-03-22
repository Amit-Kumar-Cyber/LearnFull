const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.JUDGE0_API_KEY;
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

const executeCode = async (sourceCode, languageId) => {
  try {
    const response = await axios.post(
      `${JUDGE0_URL}/submissions`,
      {
        source_code: Buffer.from(sourceCode).toString('base64'),
        language_id: languageId,
        stdin: '',
      },
      {
        params: { base64_encoded: 'true', wait: 'true', fields: '*' },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      }
    );

    const { stdout, stderr, compile_output, status } = response.data;
    
    return {
      output: stdout ? Buffer.from(stdout, 'base64').toString() : '',
      error: stderr ? Buffer.from(stderr, 'base64').toString() : 
             compile_output ? Buffer.from(compile_output, 'base64').toString() : '',
      status: status.description
    };

  } catch (error) {
    console.error('Judge0 Execution Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to execute code on sandbox.');
  }
};

module.exports = {
  executeCode,
};
