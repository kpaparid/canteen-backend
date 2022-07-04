var OrderService = require("../services/order.service");
var ArchivedOrder = require("./../models/archived-order.model");

exports.moveOrders = async function () {
  try {
    var orders = await OrderService.getOrders();
    await ArchivedOrder.insertMany(orders);
    await OrderService.deleteAll();
    return true;
  } catch (e) {
    throw Error(e);
  }
};
