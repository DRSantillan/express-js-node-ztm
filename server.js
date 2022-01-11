// built-in imports node_modules
import express from 'express';

// application imports
import { serverListening } from './controllers/messages.controller.js';
import friendsRouter from './routes/friends.router.js';
import messageRouter from './routes/messages.router.js';

// init the express library to manipulate
const app = express();

// set the port for production and development
const PORT = process.env.PORT || 8888;

// Middleware - a simple middleware
app.use((req, res, next) => {
	const start = Date.now();
	next()
	const delta = Date.now() - start;
	console.log(`${req.method}: ${req.baseUrl}${req.url} ${delta}ms Headers: ${JSON.stringify(req.headers)}`);
	// if you dont add this the app will stall need to add next so that other middlewares can
	// do there work if needed
	//next();
});
// so we want the body of the request to be in json so we can process it
app.use(express.json());

// Router
app.use('/friends', friendsRouter);
app.use('/', messageRouter);

// listen for client requests on the port specified.
app.listen(PORT, serverListening(PORT));
