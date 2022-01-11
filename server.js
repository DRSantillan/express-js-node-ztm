// built-in imports node_modules
import express from 'express';
import path from 'path';

// application imports
import { serverListening } from './controllers/messages.controller.js';
import friendsRouter from './routes/friends.router.js';
import messageRouter from './routes/messages.router.js';

// init the express library to manipulate
const app = express();

// set the port for production and development
const PORT = process.env.PORT || 8888;

// tell express you are using handlebars templating
const templatingPath = path.resolve('views');
app.set('view engine', 'hbs');
app.set('views', templatingPath);

// so we want the body of the request to be in json so we can process it
app.use(express.json());

// Middleware - a simple middleware
app.use((req, res, next) => {
	const start = Date.now();
	next();
	const delta = Date.now() - start;
	console.log(
		`${req.method}: ${req.baseUrl}${
			req.url
		} ${delta}ms Headers: ${JSON.stringify(req.headers)}`
	);
	// if you dont add this the app will stall need to add next so that other middlewares can
	// do there work if needed
	//next();
});

// serving static files
const staticPath = path.resolve('public');
app.use('/site/', express.static(staticPath));

// render templates
app.get('/', (req, res) => {
	res.render('index', {
		title: 'French Mountain Ranges',
		caption: 'On Top of the World',
	});
});

// Router
app.use('/friends', friendsRouter);
app.use('/', messageRouter);

// listen for client requests on the port specified.
app.listen(PORT, serverListening(PORT));
