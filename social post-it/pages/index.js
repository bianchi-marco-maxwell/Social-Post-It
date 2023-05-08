const { writeFile, readFile, readFileSync } = require('fs');
const pathJSON = './data/posts.json';
function appendToJson(object){//funzione per fare il push sull'array di messaggi nel JSON
  readFile(pathJSON, (error, data) => {
    if (error) {return;}
    var parsedData = JSON.parse(data);
    for ( i in parsedData){
      if(JSON.stringify(object) == JSON.stringify(parsedData[i])){
        console.log("copy founded")
        return
      }
    } 
    parsedData.push(object)
    writeFile(pathJSON, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        return;
      }
    });
  });
}
function readJson() {//funzione che restituisce il file JSON
  return JSON.parse(readFileSync(pathJSON, 'utf8', (error, data) => {
    if (error) {
      return null;
    }
  }));
}

var express = require('express');
var path = require("path")
var app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded()); 
app.set('views', path.join(__dirname, './pages'))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=> {//pagina di visualizzazione messaggi
  let data = readJson()
  res.render('home',{data:data});
});
app.get('/postIt', (req, res)=> {//pagina FORM messaggio
  res.render('postIt');
});
app.post('/home', (req, res)=> {//pagina di verifica e visualizzazione messaggi
  let data = readJson()
  username =  req.body.username
  text =  req.body.text
  appendToJson({'nome': username,'messaggio':text})
  data = readJson()
  res.render('home',{data:data});
});

app.listen(8080);

