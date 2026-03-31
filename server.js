const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 THIS is your API key from Render
const API_KEY = process.env.JOBNIMBUS_API_KEY;

const BASE_URL = 'https://app.jobnimbus.com/api1';

app.get('/api/jobs', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    const jobs = response.data.map(job => ({
      jobNumber: job.number,
      name: job.name,
      status: job.status,
      dueDate: job.end_date,
      sub: job.assigned_to
    }));

    res.json(jobs);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching jobs');
  }
});

app.get('/', (req, res) => {
  res.send('MasterCraft Dashboard API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
