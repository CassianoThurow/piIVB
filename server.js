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

router.get('/list',  (req, res) => {
  const clients = readFile();
  res.send(clients)
})

router.post('/create', (req, res) =>{
  const newClients = readFile();
  const {name, adress, cep, birth, phone} = req.body;
  const id = Math.random().toString(32).substr(2, 9)
  newClients.push({ id, name, adress, cep, birth, phone})
  writeFile(newClients)
  res.send(newClients);
})

router.put('/:id', (req, res) => {
  const { id } = req.params;

  const {name, adress, cep, birth, phone} = req.body;

  const currentClient = readFile();

  const selectedItem = currentClient.findIndex((item)=> item.id === id)

  const {id: cId, name: cName, adress: cAdress, cep: cCep, birth: cBirth, phone: cPhone} = currentClient[selectedItem];

  const newObjects = {
    id: cId,
    name: name ? name: cName,
    adress: adress ? adress: cAdress,
    cep: cep ? cep: cCep,
    birth: birth ? birth: cBirth,
    phone: phone ? phone: cPhone,
  };

  currentClient[selectedItem] = newObjects

  writeFile(currentClient);

  res.send(newObjects)

})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const currentClient = readFile()
  const selectedItem = currentClient.findIndex((item)=> item.id === id)
  currentClient.splice(selectedItem, 1)
  writeFile(currentClient)
  res.send("Cliente Excluido !")
})

app.listen(3000);
