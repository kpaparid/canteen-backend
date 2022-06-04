const { format } = require("date-fns");
const { zonedTimeToUtc } = require("date-fns-tz");
const { customAlphabet } = require("nanoid");
var Order = require("../models/order.model");

exports.getOrders = async function (query, page, limit) {
  try {
    var orders = await Order.find(query);
    return orders;
  } catch (e) {
    throw Error(e);
  }
};
exports.createOrder = async function (body) {
  const price = body.items.reduce((a, b) => a + b.calculatedPrice, 0);
  // const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // const number = customAlphabet(alphabet, 6)();

  const date = format(new Date(), "yyyy-MM-dd") + "T00:00:00.000+02:00";
  const query = { createdAt: { $gte: date } };
  var count = await Order.countDocuments(query);
  const number = "#" + (count + 101);

  const createdAt =
    format(
      zonedTimeToUtc(new Date(), "Europe/Berlin"),
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    ) + "";

  try {
    var orders = await Order.insertMany({
      ...body,
      price,
      number,
      createdAt,
      updatedAt: createdAt,
    });
    return orders;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateOrder = async function (id, body) {
  try {
    const updatedAt =
      format(
        zonedTimeToUtc(new Date(), "Europe/Berlin"),
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      ) + "";
    var orders = await Order.updateOne({ _id: id }, { ...body, updatedAt });
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
