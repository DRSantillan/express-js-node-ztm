import express from "express";

import {
	getMessage,
	showMessage
} from '../controllers/messages.controller.js';

const messageRouter = express.Router();
messageRouter.get('/', showMessage);
messageRouter.get('/messages', getMessage)

export default messageRouter;