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
