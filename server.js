const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs');

app.use(express.json());
app.use(router);

const readFile = () => {
  const clients = fs.readFileSync('./clients.json');
  return (JSON.parse(clients))
}

const writeFile = (clients) => {
  const updateFile = JSON.stringify(clients);
  fs.writeFileSync('./clients.json', updateFile)
}


router.get('/list', function (req, res) {
  const clients = readFile();
  res.send(clients)
})

router.post('/create', function(req, res){
  const newClients = readFile();
  const {id, name, adress, cep, birth, phone} = req.body;
  newClients.push({ id, name, adress, cep, birth, phone})
  writeFile(newClients)
  res.send(newClients);
})

router.delete('/delete', function(req, res){


})




app.listen(3000);
