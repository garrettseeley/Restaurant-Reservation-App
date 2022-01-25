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
  const errorMsgs = [];
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
      errorMsgs.push(
        "Please enter " +
          (field === "people" ? `the number of people` : `a ${field}`) +
          " for the reservation."
      );
    }
  });

  let reservationDate = new Date(
    `${data.reservation_date} ${data.reservation_time}`
  );
  if (reservationDate.getDay() === 2) {
    errorMsgs.push(`Restaurant is closed on Tuesdays.`);
  }

  if (!Number.isInteger(data.people) || data.people < 1) {
    errorMsgs.push("The number of people must be a number greater than zero.");
  }
  if (data.reservation_date && data.reservation_time) {
    if (!data.reservation_date.match(dateFormat)) {
      errorMsgs.push(
        `The reservation_date must be a valid date in the format 'YYYY-MM-DD'.`
      );
    }

    if (!data.reservation_time.match(timeFormat)) {
      errorMsgs.push(
        `The reservation_time must be a valid date in the format '12:30'.`
      );
    }
  }
  let backToday = new Date();
  if (reservationDate <= data.today || reservationDate < backToday) {
    errorMsgs.push(`The reservation date and time must be in the future.`);
  }
  if (data.reservation_time) {
    // console.log(data.reservation_time.replace(/[:]/g, ""))
    let resTime = Number(data.reservation_time.replace(/[:]/g, ""));
    if (resTime < 1030 || resTime > 2130) {
      errorMsgs.push(
        `Please select a reservation time between 10:30 AM and 9:30 PM.`
      );
    }
  }

  if (errorMsgs.length) {
    next({
      status: 400,
      message: errorMsgs.join(" "),
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  let { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (!reservation) {
    next({
      status: 404,
      message: `reservation_id ${reservation_id} does not exist`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function notSeated(req, res, next) {
  const { status, reservation_id } = req.body.data;
  if (status === "seated") {
    next({
      status: 400,
      message: `${reservation_id} is already seated.`,
    });
  }
  if (status === "finished") {
    next({
      status: 400,
      message: `${reservation_id} is already finished.`,
    });
  }
  next();
}

function validStatusUpdate(req, res, next) {
  let reservation = res.locals.reservation;

  if (req.body.data.status === "unknown") {
    next({
      status: 400,
      message: `The status is unknown.`,
    });
  }
  if (reservation.status === "finished") {
    next({
      status: 400,
      message: `${reservation.reservation_id} is already finished.`,
    });
  }
  next();
}

// CRUD functions
async function list(req, res) {
  console.log("hello");
  const { date } = req.query;
  console.log(date);
  const data = await service.list(date);
  res.status(200).json({ data });
}

async function read(req, res) {
  let reservation = res.locals.reservation;
  res.status(200).json({ data: reservation });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function statusUpdate(req, res) {
  const { reservation_id } = res.locals.reservation;
  const { status } = req.body.data;

  const data = await service.statusUpdate(reservation_id, status);

  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validReservation, notSeated, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  statusUpdate: [
    asyncErrorBoundary(reservationExists),
    validStatusUpdate,
    asyncErrorBoundary(statusUpdate),
  ],
};
