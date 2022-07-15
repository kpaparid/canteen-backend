var admin = require("firebase-admin");

var serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
});
exports.admin = function () {
  return admin;
};
exports.getRoles = async function (uid) {
  try {
    return admin
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        return userRecord.customClaims?.roles || null;
      });
  } catch (e) {
    throw Error(e);
  }
};
exports.addRoles = async function (uid, body) {
  try {
    admin.auth().setCustomUserClaims(uid, { roles: body });
  } catch (e) {
    throw Error(e);
  }
};
exports.addClaims = async function (uid, body) {
  try {
    admin.auth().setCustomUserClaims(uid, body);
  } catch (e) {
    throw Error(e);
  }
};
exports.createUser = async function (body) {
  try {
    const user = await admin.auth().createUser(body);
    return user;
  } catch (e) {
    throw Error(e);
  }
};

// module.exports = admin;
