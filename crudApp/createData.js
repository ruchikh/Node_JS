const path = require('path')
const fs = require('fs')

const pathfile = path.join(__dirname, 'data')

// fs.open(pathfile + '/' + 'details.json', 'wx', (err, fd) => {
//  if(err){
//     console.log("err")
//  }
//  fs.writeFile(fd, 'body', (err) => {
//     if(!err){
//     fs.close(fd, (err) => {
//         console.log('write success')
//     })
//     } else{
        
//         console.error('err')
//     }
//   })
// })

fs.readFile(pathfile + '/' + 'details.json', (err, data) => {
	if(err){
		console.log(err);
	}else {
    console.log(data.toString())
	}
})


fs.open(pathfile + '/' + 'details.json', 'r+', (err, fd) => {
if(!err){
fs.ftruncate(fd,  (err)=>{
	console.log('not exist')
})
 }else{
 	console.log('file exist')
 }
 fs.writeFile(fd, 'Hello World', (err) => {
 		if(!err){
 			fs.close(fd, (err) => {
 				console.log('write successfully')
 			})
 		}else {
 				console.log(err)
 		} 		
 	})
})

// fs.unlink(pathfile + '/' + 'details.json', (err) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log("deleted")
// 	}
// })







