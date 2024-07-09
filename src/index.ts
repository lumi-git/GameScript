import express from 'express';
import path from 'path';
import { run } from './gameConfig';
const app = express();
const port = 3000;


// Run the game
run();

// Serve static files (e.g., HTML)
app.use(express.static(path.join(__dirname)));

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
