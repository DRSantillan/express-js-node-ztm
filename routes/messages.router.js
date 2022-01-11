import express from "express";

import {
	showMessage
} from '../controllers/messages.controller.js';

const messageRouter = express.Router();
messageRouter.get('/', showMessage);

export default messageRouter;