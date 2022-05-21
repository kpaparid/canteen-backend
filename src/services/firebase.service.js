var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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

// module.exports = admin;
