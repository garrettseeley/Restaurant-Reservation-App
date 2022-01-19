const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
// Middleware validation
async function validReservation(req, res, next) {
  const { data } = req.body;
  const errorMsgs = []
  if (!data) {
    return next({ status: 400, message: "Data is missing" });
  }
  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  requiredFields.forEach((field) => {
    if (!data[field]) {
      errorMsgs.push(`Please enter a ${field} for the reservation.`)
    }
  });

  let reservationDate = new Date(`${data.reservation_date} ${data.reservation_time}`)
  if (reservationDate.getDay() === 2) {
    errorMsgs.push(`Restaurant is closed on Tuesdays.`)
  }

  if (!Number.isInteger(data.people)) {
      errorMsgs.push("people must be a number.")
  }
  if (data.reservation_date && data.reservation_time) {
    if (!data.reservation_date.match(dateFormat)) {
      errorMsgs.push(`The reservation_date must be a valid date in the format 'YYYY-MM-DD'.`)
    }

    if (!data.reservation_time.match(timeFormat)) {
      errorMsgs.push(`The reservation_time must be a valid date in the format '12:30'.`)
    }
  }
  const today = new Date();

  if(reservationDate < today) {
    errorMsgs.push(`The reservation date and time must be in the future.`)
  }
  if (errorMsgs.length) {
    next({
      status: 400,
      message: errorMsgs.join(" ")
    })
  }
  next();
}


// CRUD functions
async function list(req, res) {
  let date = req.query.date;
  const data = await service.list(date);
  res.status(200).json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validReservation, asyncErrorBoundary(create)],
};
