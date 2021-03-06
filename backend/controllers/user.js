const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectdb = require("../connectdb.js");
const mysql = require("mysql2");
const UserManager = require("../managers/UserManager.js");

let userManager = new UserManager();

exports.signup = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      let sqlInserts = [lastName, firstName, email, hash];
      userManager
        .signup(sqlInserts)
        .then((response) => {
          res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json(error));
};

// exports.setAvatar = (req, res, next) => {
//   console.log(req.file.filename);
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//   const userId = decodedToken.userId;
//   let avatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
// //  //let avatar = 'http://localhost:3000/images/' + req.file.filename;
// //   // let avatar = `${req.file/images}/${req.file.filename}`;
//   let sqlInserts = [avatar, userId];
//   userManager
//     .setAvatar(sqlInserts)
//     .then((response) => {
//       res.status(200).json(JSON.stringify(response));
//     })
//     .catch((error) => {
//       res.status(400).json(error);
//     });
//   // TODO: handle db update... (req.file.filename) `${req.file/destination}/${req.file.filename}`
// };

exports.setAvatar = (req, res, next) => {
  console.log(req.file.filename);
  const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
  let avatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  let sqlInserts = [avatar, userId];
    userManager
      .setAvatar(sqlInserts)
      .then((response) => {
        res.status(200).json(JSON.stringify(response));
      })
      .catch((error) => {
        res.status(400).json(error);
      });
};

exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let sqlInserts = [email];
  userManager
    .login(sqlInserts, password)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
exports.seeMyProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let sqlInserts = [userId];
  userManager
    .seeMyProfile(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};
exports.updateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let sqlInserts = [firstName, lastName, email, userId];
  userManager
    .updateUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let sqlInserts = [userId];
  userManager
    .deleteUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};
