const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url');

const pathfile = path.join(__dirname, 'data');

http.createServer((req, res) => {
	var parsedUrl = url.parse(req.url, true);

		var buffer = '';
		req.on('data', (chunk) => {
			buffer += chunk.toString();
		});
		
		req.on('end', () => {			

			if (req.method === 'POST' && parsedUrl.pathname === '/user') {
				var userData = JSON.parse(buffer);
				fs.open(pathfile + '/' + userData.name+ '.json', 'wx', (err, fd) => {
				 if(err){
				    console.log(err)
				 }
				 	fs.writeFile(fd, buffer, (err) => {
				    if(!err){
				    fs.close(fd, (err) => {
			        console.log('write success')
							res.end(buffer);
						});
				    } else{
				        
				        console.error('err')
				    }
				  })
				})
	  } else if (req.method === 'GET' && parsedUrl.pathname === '/user') {
			var username = parsedUrl.query.name;
			fs.readFile(pathfile + '/' + username + '.json', (err, data) => {
				if(err){
					console.log(err);
					}else {
  				res.end(data);
				}
			})
		} else if (req.method === 'PUT' && parsedUrl.pathname === '/user'){

				var username = parsedUrl.query.name;

				fs.open(pathfile + '/' + username + '.json', 'r+', (err, fd) => {
					if(!err){
						fs.ftruncate(fd,  (err)=>{
							console.log('not exist')
						})
	 				}else{
	 					console.log('file exist')
	 				}
	 					fs.writeFile(fd, buffer , (err) => {
	 						if(!err){
	 							fs.close(fd, (err) => {
	 								console.log('write successfully')
	 							})
	 						}else {
	 							console.log(err)
	 					} 		
	 				})
				})
			} else if(req.method === 'DELETE' && parsedUrl.pathname === '/user'){
					var username = parsedUrl.query.name;
					fs.unlink(pathfile + '/' + username + '.json', (err) => {
						if(err){
							console.log(err)
						}else{
							console.log(`deleted ${username}`)
						}
					})
				}
	})
}).listen(8000, () => {
  	console.log('Server running on port 8000')
  })


