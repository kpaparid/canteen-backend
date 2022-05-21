var FirebaseService = require("../services/firebase.service");

exports.addRoles = async function (req, res, next) {
  try {
    const uid = "HiJM1Y7rTFdTIm2xQpCquY9nIB32";
    const roles = await FirebaseService.addRoles(uid, req.body);
    return res.status(200).json({
      status: 201,
      data: roles,
      message: "Successfully Added Roles",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getRoles = async function (req, res, next) {
  try {
    const uid = "HiJM1Y7rTFdTIm2xQpCquY9nIB32";
    const roles = await FirebaseService.getRoles(uid);
    return res.status(200).json({
      status: 200,
      data: roles,
      message: "Successfully Retrieved Roles",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
