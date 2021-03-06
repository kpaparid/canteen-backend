const { formatInTimeZone } = require("date-fns-tz");
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

  const date = formatInTimeZone(
    new Date(),
    "Europe/Berlin",
    "yyyy-MM-dd'T'HH:mm zzz"
  );
  const queryDate =
    formatInTimeZone(new Date(), "Europe/Berlin", "yyyy-MM-dd") + "T00:00";
  const query = { createdAt: { $gte: queryDate } };
  var count = await Order.countDocuments(query);
  const number = "#" + (count + 101);
  try {
    var orders = await Order.insertMany({
      ...body,
      price,
      number,
      createdAt: date,
      updatedAt: date,
    });
    return orders;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateOrder = async function (id, body) {
  try {
    const updatedAt = formatInTimeZone(
      new Date(),
      "Europe/Berlin",
      "yyyy-MM-dd'T'HH:mm zzz"
    );
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
exports.deleteAll = async function () {
  try {
    await Order.deleteMany({});
    return true;
  } catch (e) {
    throw Error(e);
  }
};
