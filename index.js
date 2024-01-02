const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'pablo'; // Kunci yang digunakan untuk verifikasi

app.use(express.static(path.join(__dirname, 'public')));

app.get('/API/get-key', (req, res) => {
  res.json({ apiKey: 'pablo' });
});

app.use((req, res, next) => {
  const apiKey = req.query.key;

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized. Invalid API Key.' });
  }

  next();
});

app.get('/API/samp', async (req, res) => {
  const { host, port } = req.query;

  if (!host || !port) {
    return res.status(400).json({ error: 'Missing host or port parameters' });
  }

  try {
    const apiUrl = `https://tokyosamp.cyclic.app/API/samp?ip=${host}&port=${port}`;
    const response = await axios.get(apiUrl);

    if (response.data.error) {
      return res.status(500).json({ error: 'Something Went Wrong. Please Check Parameters or Try Again Later.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/API/samp/ping', async (req, res) => {
  const { host, port } = req.query;

  if (!host || !port) {
    return res.status(400).json({ error: 'Missing host or port parameters' });
  }

  try {
    const apiUrl = `https://xalbador.cyclic.app/API/ping?ip=${host}&port=${port}`;
    const response = await axios.get(apiUrl);

    if (response.data.error) {
      return res.status(500).json({ error: 'Something Went Wrong. Please Check Parameters or Try Again Later.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/API/samp/portscan', async (req, res) => {
  const { host, port } = req.query;

  if (!host || !port) {
    return res.status(400).json({ error: 'Missing host or port parameters' });
  }

  try {
    const apiUrl = `https://xalbador.cyclic.app/API/scan?ip=${host}&port=${port}`;
    const response = await axios.get(apiUrl);

    if (response.data.error) {
      return res.status(500).json({ error: 'Something Went Wrong. Please Check Parameters or Try Again Later.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/API/samp/ipinfo', async (req, res) => {
  const { host } = req.query;

  if (!host) {
    return res.status(400).json({ error: 'Missing host parameter' });
  }

  try {
    const apiUrl = `http://ip-api.com/json/${host}`;
    const response = await axios.get(apiUrl);

    if (response.data.status === 'fail') {
      return res.status(500).json({ error: 'Failed to retrieve IP information. Please check the host parameter.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/API/ddos/samp', async (req, res) => {
  const { host, time } = req.query;

  if (!host || !time) {
    return res.status(400).json({ error: 'Missing host or time parameters' });
  }

  try {
    const apiUrl = `https://flask-production-1db9.up.railway.app/?host=${host}&time=${time}`;
    const response = await axios.get(apiUrl);

    if (response.data.error) {
      return res.status(500).json({ error: 'Something Went Wrong. Please Check Parameters or Try Again Later.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint baru untuk API Minecraft Java
app.get('/API/mc/jav', async (req, res) => {
  const { host } = req.query;

  if (!host) {
    return res.status(400).json({ error: 'Missing host parameter' });
  }

  try {
    const apiUrl = `https://api.mcsrvstat.us/3/${host}`;
    const response = await axios.get(apiUrl);

    if (response.data.error) {
      return res.status(500).json({ error: 'Something Went Wrong. Please Check Parameters or Try Again Later.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint baru untuk API Minecraft Bedrock
app.get('/API/mc/bed', async (req, res) => {
  const { host } = req.query;

  if (!host) {
    return res.status(400).json({ error: 'Missing host parameter' });
  }

  try {
    const apiUrl = `https://api.mcsrvstat.us/bedrock/3/${host}`;
    const response = await axios.get(apiUrl);

    if (response.data.error) {
      return res.status(500).json({ error: 'Something Went Wrong. Please Check Parameters or Try Again Later.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});