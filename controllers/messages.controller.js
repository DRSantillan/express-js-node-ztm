export const showMessage = (req, res) => {
	res.send({ message: 'you are accessing an express server.' });
};

export const serverListening = port => () => {
	console.log(`Server is listening on ${port}...`);
};
