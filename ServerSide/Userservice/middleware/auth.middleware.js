const jwt = require("jsonwebtoken");
const sql = require("mssql");
const sqlConfig = require("../config/database");
const lodash = require("lodash");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        let pool = await sql.connect(sqlConfig);
        pool
          .request()
          .input("email", sql.VarChar, decoded.email)
          .execute("checkEmail", (err, results) => {
            if (err) {
              res.status(500).send("Database error");
            }
            res.locals.user = lodash.pick(results.recordset[0], [
              "username",
              "email",
              "is_admin",
            ]);
            next();
          });
      } catch (error) {
        console.log(error);
        res.status(401).send("Authorization failed, token expired");
      }
    }
    if (!token) {
      res.status(401).send({ message: "Token required" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.admin = (req, res, next) => {
  if (res.locals.user && res.locals.iser.is_admin) {
    next();
  } else {
    res.status(401).send({ message: "Admin access required for this action" });
  }
};
