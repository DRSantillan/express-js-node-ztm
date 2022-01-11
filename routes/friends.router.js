//
import express from 'express';
//
import {
	postFriend,
	getFriends,
	getFriendByID,
} from '../controllers/friends.controller.js';
const friendsRouter = express.Router();

const logIPAddress = (req, res, next) => {
	console.log('IP Address: ' , req.ip);
	next();
}

// middleware at the router level
friendsRouter.use(logIPAddress)

// POST > Friends
friendsRouter.post('/', postFriend);
// friends route
friendsRouter.get('/', getFriends);
// friends route with params
friendsRouter.get('/:friendId', getFriendByID);

export default friendsRouter;
