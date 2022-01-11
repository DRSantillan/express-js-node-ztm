import { friends } from '../models/friends.model.js';

export const postFriend = (req, res) => {
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
};

export const getFriends = (req, res) => {
	res.send(friends);
};

export const getFriendByID = (req, res) => {
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
};
