const { format } = require("date-fns");
const { zonedTimeToUtc } = require("date-fns-tz");
var mongoose = require("mongoose");

const OptionsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  price: { type: Number, required: true },
});
const ExtrasSchema = new mongoose.Schema(
  {
    price: Number,
    title: { type: String, required: true },
    options: [{ type: OptionsSchema, required: true }],
  },
  {
    _id: false,
  }
);
const ItemsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    count: { type: String, required: true },
    price: { type: Number, required: true },
    comment: { type: String },
    itemId: { type: String, required: true },
    menuId: { type: String, required: true },
    calculatedPrice: { type: String, required: true },
    extras: [ExtrasSchema],
  },
  {
    _id: false,
  }
);
const UsersSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String },
  displayName: { type: String },
  phoneNumber: { type: String },
});
const OrdersSchema = new mongoose.Schema(
  {
    items: { type: [ItemsSchema], required: true },
    time: { type: String },
    status: { type: String, required: true, default: "pending" },
    user: { type: UsersSchema, required: true },
    number: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    meta: Object,
  },
  {
    // timestamps: false,
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Order = mongoose.model("Order", OrdersSchema);

module.exports = Order;
