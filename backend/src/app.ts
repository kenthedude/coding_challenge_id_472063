import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from './routes/auth.route';
import { tasksRouter } from './routes/tasks.route';
import { rateLimiterUsingThirdParty } from './middleware/rateLimiter';
import { connectDB } from './db';
import { expressPort } from './utils/environment';

// Create a new express application instance
const app = express();

// Set the network port

app.use(bodyParser.urlencoded({ extended: true }))

// Can also use express.json() instead, but body-parser contains more validations.
app.use(bodyParser.json()); app.use(cors());

app.use(rateLimiterUsingThirdParty);
app.use('/api/tasks/', tasksRouter);
app.use('/api/auth/', authRouter);

connectDB();

// Start the Express server
app.listen(expressPort, () => {
  console.log(`The server is running at http://localhost:${expressPort}`);
});
