import express from 'express';
// initial the express library to manipulate
const app = express();
// set the port for production and development
const PORT = process.env.PORT || 8888;
// state.
const friends = [
	{
		id: 0,
		name: 'Harumi Santillan',
	},
	{
		id: 1,
		name: 'Akira Santillan',
	},
];

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

app.post('/friends', (req, res) => {
	// grab the posted input
	let { name } = req.body;
	// error checking
	if (!name || name.length === 0) {
		res.status(400).json({ error: 'You did not provide a name.' });
	}
	// create an id for the new record
	let id = friends.length;
	// create an object to insert into the friends object
	const friend = { id, name };
	// check if the friend object already exists
	const filteredFriends = friends.filter(friend => friend.name === name);
	console.log(filteredFriends.length);
	if (filteredFriends.length > 0) {
		return res.status(400).json({
			error: 'The name already exists in the database.',
		});
	}
	friends.push(friend);
	// return to client.
	res.status(200).json(friend);
});
// friends route
app.get('/friends', (req, res) => {
	res.send(friends);
});
// friends route with params
app.get('/friends/:friendId', (req, res) => {
	// get the id from the params and explicitly convert to a number if using integers as ids
	const friendId = Number(req.params.friendId);
	//const friendId = +req.params.friendId;
	// with the id find the friend in the array
	const friend = friends[friendId];
	// check to see if the friendid is valid and available
	if (friend) {
		res.status(200).json(friend);
	} else {
		// if no id found send a response to the client with an error mesage
		res.status(404).json({
			error: 'That friend does not exist in our database.',
		});
	}
});
// default route
app.get('/', (req, res) => {
	res.send({ message: 'you are accessing an express server.' });
});

// listen for client requests on the port specified.
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});
