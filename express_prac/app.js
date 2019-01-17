var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var path = require('path')
let ejs = require('ejs')
var app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(cookieParser());


// app.use((req, res, next) => {
//   res.cookie('name', 'ruchi');
// 	next();
// })


// app.get('/', (req, res) => {
//   console.log(req.cookies, "cookies here");
//   res.send('hello world');
// })

// app.get('/me' ,(req, res) => {
// 	res.send('Hello world!!!!!!!')
// })
// app.use((req, res, next) =>{
// 	console.log(new Date())
// 	next()
// })

app.get('/', (req, res) => {
	// console.log(req.body)
res.render('index.ejs')

})


app.listen(4000, ()=> {
	console.log('listen on port 4000')
})



// app.get('/' ,(req, res) => {
// 	res.send('index.html')
// })-+




// res.sendFile('index.html')
