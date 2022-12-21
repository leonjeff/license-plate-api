const mongoose = require("mongoose");

const VehicleModel = mongoose.model("vehicles", {
  licensePlate: String,
  vin: String,
  make: String,
  model: String,
  cylinderCapacity: String,
  numberOfDoors: String,
  sixMonthRate: String,
  twelveMonthRate: String,
  dateOfFirstRegistration: String,
  yearOfManufacture: String, 
  co2Emissions: String,
  fuelType: String,
  taxStatus: String,
  transmission: String,
  colour: String,
  typeApproval: String,
  wheelPlan: String,
  revenueWeight: String,
  taxDetails: String,
  motDetails: String,
  taxed: Boolean,
  mot: Boolean,
});

module.exports = VehicleModel;
