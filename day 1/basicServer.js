const http = require('http');
const url = require('url');

const port = process.env.PORT || 4001;

// Create Server

// http.createServer((req, res) => {
// 	console.log(req.headers);
// 	res.end(req.method);
// }).listen(port);

// Instantiate Server

const server = http.createServer();

server.on('request', (req, res) => {
	// Parse request url and query string optional params is set to true
	var parsedUrl = url.parse(req.url, true);
	console.log(req)
	console.log(parsedUrl)
	var urlinit = req.url
	var requestObject = {
		urlinit: req.url,
		method: req.method,
		headers: req.headers, 
		path: parsedUrl.pathname,
		queryString: parsedUrl.query
	};
	var convertedToString = JSON.stringify(requestObject);
	res.setHeader('Content-Type', 'application/json');
	res.writeHead(200);
	// res.statusCode = 200;
	res.end(convertedToString);
});

// Listen on specific port
server.listen(port, () => {
	console.log('Server listening on port:'+port);
});



// const product_create = function (req, res) {
//     let product = new Product(
//         {
//             name: req.body.name,
//             price: req.body.price
//         }
//     );

//     product.save(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.send('Product Created successfully')
//     })
// };


// const product_details = function (req, res) {
//     Product.findById(req.params.id, function (err, product) {
//         if (err) return next(err);
//         res.send(product);
//     })
// };

// const product_update = function (req, res) {
//     Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
//         if (err) return next(err);
//         res.send('Product udpated.');
//     });
// };


// const product_delete = function (req, res) {
//     Product.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };