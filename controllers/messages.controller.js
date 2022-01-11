import path from 'path';

export const showMessage = (req, res) => {
	res.send({ message: 'you are accessing an express server.' });
};

export const getMessage = (req, res) => {
    const __dirname = path.resolve(path.resolve('public/images'))
	const filePath = path.join(__dirname, 'skimountain.jpeg');
    
	res.sendFile(filePath);
};

export const serverListening = port => () => {
	console.log(`Server is listening on ${port}...`);
};
