const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.JOBNIMBUS_API_KEY;
const BASE_URL = 'https://api.jobnimbus.com';

app.get('/api/test', async (req, res) => {
  try {
    // Use a known documented endpoint shape first
    const url = `${BASE_URL}/v1/activities/list`;

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Status:', err.response?.status);
    console.error('Data:', err.response?.data);
    console.error('Message:', err.message);

    res.status(500).json({
      message: 'Error calling JobNimbus',
      status: err.response?.status,
      data: err.response?.data || null
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
