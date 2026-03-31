const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.JOBNIMBUS_API_KEY;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/jobs', async (req, res) => {
  try {
    const response = await axios.get('https://app.jobnimbus.com/api1/jobs', {
      headers: {
        Authorization: `bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('STATUS:', err.response?.status);
    console.error('DATA:', err.response?.data);
    console.error('MESSAGE:', err.message);

    res.status(err.response?.status || 500).json({
      error: 'Error fetching jobs',
      status: err.response?.status,
      data: err.response?.data || null
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
