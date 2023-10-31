const User = require('../services/users.service');
const userService = new User();

const getAll = async (req, res)=>{  
  const users = await userService.getAll();
  
  res.send(users);
};

const getOne = async (req, res)=>{  
  const {id} = req.params;
  res.send(`Get User {${id}}`);
};

const create = async (req, res)=>{  
  const {firstName,lastName, username, password} = req.body;

  const user = await userService.create({
    firstName,
    lastName, 
    username, password
  });

  res.send(user);
};

const update = async (req, res)=>{  
  const {id} = req.params;
  res.send(`Update User {${id}}`);
};

const remove = async (req, res)=>{  
  const {id} = req.params;
  res.send(`Remove User {${id}}`);
};

module.exports = {
  getAll, 
  getOne,
  create, 
  update, 
  remove
};