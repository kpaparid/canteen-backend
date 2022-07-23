const SettingService = require("../services/setting.service");
const ArchivedOrderService = require("../services/archived-order.service");
const { formatInTimeZone } = require("date-fns-tz");

exports.getSettings = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var Settings = await SettingService.getSettings(req.query, page, limit);
    var updatedAt = (
      await SettingService.getSettings({
        uid: "updatedAt",
      })
    ).map((o) => o.toObject())[0].entities.value.value;
    const date = formatInTimeZone(new Date(), "Europe/Berlin", "yyyy-MM-dd");

    if (date !== updatedAt) {
      await SettingService.updateSetting("updatedAt", {
        value: { value: date, id: "value" },
      });
      await SettingService.updateSetting("shopIsOpen", {
        value: { value: true, id: "value" },
      });
      await ArchivedOrderService.moveOrders();
    }

    return res.status(200).json({
      status: 200,
      data: Settings,
      message: "Successfully Retrieved Settings",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createSetting = async function (req, res, next) {
  try {
    var Settings = await SettingService.createSetting(req.body);
    return res.status(200).json({
      status: 201,
      data: Settings,
      message: "Successfully Created Setting",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.updateSetting = async function (req, res, next) {
  try {
    var Settings =
      req.params.id === "categories"
        ? await SettingService.updateCategoriesAndMeals(req.body)
        : await SettingService.updateSetting(req.params.id, req.body);
    return res.status(200).json({
      status: 201,
      data: Settings,
      message: "Successfully Updated Setting",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.deleteSetting = async function (req, res, next) {
  try {
    var Settings = await SettingService.deleteSetting(req.params.id);
    return res.status(200).json({
      status: 201,
      data: Settings,
      message: "Successfully Created Setting",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
