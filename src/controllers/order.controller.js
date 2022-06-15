var OrderService = require("../services/order.service");
var utils = require("../utils/utils");

exports.getOrders = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var orders = await OrderService.getOrders(
      utils.getFilter(req.query),
      page,
      limit
    );
    return res.status(200).json({
      status: 200,
      data: orders,
      message: "Successfully Retrieved orders",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createOrder = async function (req, res, next) {
  try {
    // console.log("creating order", req?.body);
    var orders = await OrderService.createOrder(req.body);
    return res.status(200).json({
      status: 201,
      data: orders,
      message: "Successfully Created order",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.updateOrder = async function (req, res, next) {
  try {
    var orders = await OrderService.updateOrder(req.params.id, req.body);
    return res.status(200).json({
      status: 201,
      data: orders,
      message: "Successfully Created order",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.deleteOrder = async function (req, res, next) {
  try {
    var orders = await OrderService.deleteOrder(req.params.id);
    return res.status(200).json({
      status: 201,
      data: orders,
      message: "Successfully Created order",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
