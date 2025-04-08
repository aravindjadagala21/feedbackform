const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'feedback.json');
 
app.use(cors());
app.use(bodyParser.json());
     

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}
   

app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
    

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  try {
    const feedbacks = JSON.parse(fs.readFileSync(DATA_FILE));
    const newFeedback = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };
    
    feedbacks.push(newFeedback);
    fs.writeFileSync(DATA_FILE, JSON.stringify(feedbacks, null, 2));
    
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.get('/feedbacks', (req, res) => {
  try {
    const feedbacks = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve feedbacks' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});