const Service = require('../services/services.service');
const servicesService = new Service();

const getAll = async(req, res) =>{
  const service = await servicesService.getAll();

  res.send(service);
};

const getOne = async(req, res) =>{
  const {id} = req.params;
  res.send(`Get Service {${id}} `);
};

const create = async(req, res) =>{
  const { name, price, details } = req.body;
  const service = await servicesService.create({
    name,
    price,
    details,
  });
  res.send(service);  
}; 

const update = async(req, res) =>{
  const {id} = req.params;
  res.send(`Update Service {${id}}`);
};

const remove = async (req, res)=>{  
  const {id} = req.params;
  res.send(`Remove Service {${id}}`);
};

module.export = {
  getAll,
  getOne,
  create,
  update,
  remove,
};