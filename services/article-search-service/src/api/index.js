const express = require('express');
const axios = require('axios');

const articleUrl = 'http://articleservice:3001/article/';
const router = express.Router();
router.get('/', async (req, res) => {
  const data = await axios.get(articleUrl).then((data) => data.data).catch((error) => ({
    pesan: 'error',
    error,
  }));
  // console.log(data);
  res.json(data);
});

module.exports = router;
