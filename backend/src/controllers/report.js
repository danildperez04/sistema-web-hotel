const path = require('path');
const Report = require('../services/report.service');
const reportServices = new Report();

const getReport = async ( req, res ) => {
  const { limit, date } = req.query;
  reportServices.generatePDF( 10, '10-12-2023' );


  res.sendFile('Reporte_Mensual.pdf', { root: path.join(__dirname) } );

};

module.exports = { getReport };