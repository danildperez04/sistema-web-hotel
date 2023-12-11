const { Reservation: reservationModel } = require('../models/reservation');
const { jsPDF } = require('jspdf');
const { default: autoTable } = require('jspdf-autotable');
const { Op } = require('sequelize');

class Report {
  async generatePDF({ limit, date }) {
    const pdfDoc = new jsPDF();

    const reservations = await reservationModel.findAll({
      include:
      {
        all: true
      },
      where: {
        createdAt: {
          [Op.substring]: date
        }
      },
      limit
    });

    const formatedReservations = reservations.map(reservation => {
      return [
        reservation.id,
        reservation?.user?.username,
        reservation?.client?.fullName,
        this.formatDate(reservation.startDate),
        this.formatDate(reservation.endDate),
        reservation.cancelled ? 'si' : 'no'
      ];
    });

    autoTable(pdfDoc, {
      head: [['ID', 'Usuario', 'Cliente', 'Fecha Inicio', 'Fecha Salida', 'Cancelada']],
      body: [
        ...formatedReservations
      ],
    });

    await pdfDoc.save('Reporte_Mensual.pdf');
  }

  formatDate(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString(
      'es-ES', options
    );
  }
}
module.exports = Report;