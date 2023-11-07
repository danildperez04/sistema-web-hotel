
const Client = require('../services/client.service');
const clientService = new Client();

const getAll = async (req, res) =>{
  const clients = await clientService.getAll();

  res.send(clients);
};

const getOne = async (req, res) => {
  const {id} = req.params;
  res.send(`Get Client {${id}}`);
};

const create = async (req, res) => {
  const { dni, fullName, email, phoneNumber, address, birthDate, municipalityId } = req.body;

  const client = await clientService.create({
    dni,
    fullName,
    email,
    phoneNumber,
    address,
    birthDate,
    municipalityId
  });

  res.send(client);
};

const update = async( req, res ) => {
  const {id} = req.params;
  // const dataClient = req.body;
  // const updateClient = await clientService.update({
  //   dni:  dataClient.dni,
  //   fullName: dataClient.fullName,
  //   email:  dataClient.email,
  //   phoneNumber: dataClient.phoneNumber,
  //   address: dataClient.address,
  //   birthDate: dataClient.birthDate,
  // },
  // );

  res.send(`Update Client {${id}}`);
};

const remove = async (req, res)=>{  
  const {id} = req.params;
  res.send(`Remove User {${id}}`);
};

module.exports={
  getAll,
  getOne,
  create,
  update,
  remove,
};
