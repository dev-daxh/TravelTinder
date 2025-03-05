const admin = require("firebase-admin");
const serviceAccount = require("./traveltinder-e2e1f-firebase-adminsdk-fbsvc-c84b6886ee.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://traveltinder-e2e1f-default-rtdb.firebaseio.com"
});
const db = admin.database();

module.exports=db;