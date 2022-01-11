import express from 'express';
import {
	showMessage,
	serverListening,
} from './controllers/messages.controller.js';
// can also import the whole file like so but I think I prefer the way above.
// this may also depend on how big the app is...
import * as messageController from './controllers/messages.controller.js';
import {
	insertFriend,
	getFriends,
	getFriendByID,
} from './controllers/friends.controller.js';
// 
import { friends } from './models/friends.model.js';
// initial the express library to manipulate
const app = express();
// set the port for production and development
const PORT = process.env.PORT || 8888;


// Middleware - a simple middleware
app.use((req, res, next) => {
	console.log(`${req.method}: ${req.url} ${req.headers}`);
	// if you dont add this the app will stall need to add next so that other middlewares can
	// do there work if needed
	next();
});
// so we want the body of the request to be in json so we can process it
app.use(express.json());
// Routes  ===-===
// POST > Friends
app.post('/friends', insertFriend(friends));
// friends route
app.get('/friends', getFriends(friends));
// friends route with params
app.get('/friends/:friendId', getFriendByID(friends));
// default route
app.get('/', showMessage);

// listen for client requests on the port specified.
app.listen(PORT, serverListening(PORT));
