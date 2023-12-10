const { Reservation } = require('../models/reservation');
const { PDFDocument } = require('pdf-lib');
const { Op } = require('sequelize');
const fs = require('fs').promises;



class Report {

  async generatePDF(limit , date) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const reservations = await Reservation.findAll( { include: { all: true }, where: { [Op.like]: date }, limit } );

    reservations.forEach(reservation => {
      page.drawText(`fecha de inicio: ${reservation.startDate}`);
      page.drawText(`fecha de de salida: ${reservation.endDate}`);
    });

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile('Reporte_Mensual.pdf', pdfBytes);
    return pdfDoc;
  }
}
module.exports = Report;