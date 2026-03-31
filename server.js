const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.JOBNIMBUS_API_KEY;

// Current JobNimbus Platform API base URL
const BASE_URL = 'https://api.jobnimbus.com';

// You may need to adjust the service/endpoint after the first test
const SERVICE = 'jobs';
const ENDPOINT = 'jobs';

app.get('/api/jobs', async (req, res) => {
  try {
    const url = `${BASE_URL}/${SERVICE}/v1/${ENDPOINT}`;
    console.log('Requesting:', url);
    console.log('API key present:', !!API_KEY);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Status:', err.response?.status);
    console.error('Data:', err.response?.data);
    console.error('Message:', err.message);

    res.status(500).json({
      message: 'Error fetching jobs',
      status: err.response?.status,
      data: err.response?.data || null
    });
  }
});

app.get('/', (req, res) => {
  res.send('MasterCraft Dashboard API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
