const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());


app.post('/api/password-history', (req, res) => {
  
  const { password, notes } = req.body;

 
  res.status(200).json({ message: 'Password history saved successfully' });
});


const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
