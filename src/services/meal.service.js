var Meal = require("../models/meal.model");

exports.getMeals = async function (query, page, limit) {
  try {
    var meals = await Meal.find(query);
    return meals;
  } catch (e) {
    throw Error(e);
  }
};
exports.createMeal = async function (body) {
  try {
    var meals = await Meal.create(body);
    return meals;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateMeal = async function (id, body) {
  try {
    var meals = await Meal.updateOne({ _id: id }, body);
    return meals;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateAllMeal = async function (ids, body) {
  try {
    const bulkOps = body.map(({ id, ...rest }) => {
      return {
        updateOne: {
          filter: {
            _id: id,
          },
          update: rest,
        },
      };
    });
    Meal.bulkWrite(bulkOps).then((res) => {
      console.log("Documents Updated", res.modifiedCount);
    });
    return true;
  } catch (e) {
    throw Error(e);
  }
};
exports.deleteMeal = async function (ids) {
  try {
    const ids = ids.split(",");
    await Meal.deleteMany({ _id: { $in: ids } });
    return true;
  } catch (e) {
    throw Error(e);
  }
};
