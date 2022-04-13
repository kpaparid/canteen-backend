const { nanoid, customAlphabet } = require("nanoid");
var Order = require("../models/order.model");

exports.getOrders = async function (query, page, limit) {
  try {
    var orders = await Order.find(query);
    return orders;
  } catch (e) {
    throw Error("Error while Paginating Orders");
  }
};
exports.createOrder = async function (body) {
  const price = body.items.reduce((a, b) => a + b.calculatedPrice, 0);
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = customAlphabet(alphabet, 6)();
  try {
    var orders = await Order.insertMany({ ...body, price, number });
    return orders;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateOrder = async function (id, body) {
  try {
    var orders = await Order.updateOne({ _id: id }, { ...body });
    return orders;
  } catch (e) {
    throw Error(e);
  }
};
exports.deleteOrder = async function (id) {
  try {
    const ids = id.split(",");
    await Order.deleteMany({ _id: { $in: ids } });
    return true;
  } catch (e) {
    throw Error(e);
  }
};
