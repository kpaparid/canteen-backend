const { nanoid } = require("nanoid");
var Setting = require("../models/setting.model");
var MealService = require("../services/meal.service");
var utils = require("../utils/utils");

exports.getSettings = async function (query, page, limit) {
  try {
    var Settings = await Setting.find(query);
    return Settings;
  } catch (e) {
    throw Error("Error while Paginating Orders");
  }
};
exports.createSetting = async function (body) {
  try {
    const old = await Setting.findOne({ uid: body?.uid });
    const entities = {
      ...old?.entities,
      [body.entity.id]: body.entity,
    };
    const ids = Object.keys(entities);
    const Settings = Setting.findOneAndUpdate(
      { uid: body?.uid },
      { ...body, ids, entities },
      {
        upsert: true,
      }
    );
    return Settings;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateSetting = async function (uid, body) {
  try {
    const ids = Object.keys(body);
    const settings = await Setting.findOneAndUpdate(
      { uid },
      { entities: { ...body }, ids },
      {
        upsert: true,
      }
    );
    return settings;
  } catch (e) {
    throw Error(e);
  }
};
exports.updateCategoriesAndMeals = async function ({ entities, ids }) {
  try {
    const { ids: pr, entities: oldEntities } = await Setting.findOne({
      uid: "meal-category",
    });
    const oldIds = Object.values(pr);
    if (oldIds !== ids) {
      // return null;
      const arr = ids.reduce((a, b, index) => {
        return b !== oldIds[index] ? [...a, { id: b, index }] : [...a];
      }, []);
      const meals = await MealService.getMeals(
        utils.getFilter({ category: { $in: arr.map(({ id }) => id) } })
      ).then((r) =>
        r.map((m) => {
          const uid =
            (arr.find(({ id }) => id === m.category).index + 1) * 100 +
            (m.uid % 100);
          return { id: m.id, uid };
        })
      );
      const se = await MealService.updateAllMeal(null, meals);

      console.log("hi");
    }
    // const ent = ids.reduce((a, b) => {
    //   const id = nanoid();
    //   return { ...a, [id]: { ...entities[b], id } };
    // }, {});

    const settings = await Setting.findOneAndUpdate(
      { uid: "meal-category" },
      { entities, ids },
      {
        upsert: true,
      }
    );
    return null;
  } catch (e) {
    throw Error(e);
  }
};
exports.deleteSetting = async function (id) {
  try {
    const ids = id.split(",");
    await Setting.deleteMany({ _id: { $in: ids } });
    return true;
  } catch (e) {
    throw Error(e);
  }
};
