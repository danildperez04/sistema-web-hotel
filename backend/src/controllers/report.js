const Report = require('../services/report.service');
const reportServices = new Report();

const getReport = async (req, res) => {
  const { limit, date } = req.query;

  await reportServices.generatePDF({ limit: Number.parseInt(limit), date });

  res.sendFile('Reporte_Mensual.pdf', { root: '.' });
};

module.exports = { getReport };