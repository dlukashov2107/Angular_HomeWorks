const fs = require("fs");
const cors = require("cors");
const express = require("express");
const { log } = require("console");

// user
//const userJson = "./src/app/shared/mocks/users.json";
const userJson = "./server-data/users.json";
const toursJson = "./server-data/tours.json";
const ordersJson = "./server-data/orders.json";
const countriesJson = "./server-data/countries.json";
const jsonFileData = fs.readFileSync(userJson, "utf-8");
let parseJsonData = JSON.parse(jsonFileData);

const app = express();
const port = 3000;
// cors logic
app.use(cors());
// add parser for post body
app.use(express.json());

// route logic
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//************************ */ register****************************
app.post("/register", (req, res) => {
  // find users
  if (req.body?.login) {
    const isUserExist = parseJsonData.users.find(
      (user) => user.login === req.body?.login,
    );

    if (!isUserExist && req.body.password) {
      parseJsonData.users.push(req.body);
      const json = JSON.stringify(parseJsonData);
      fs.writeFileSync(
        userJson,
        json,
        "utf-8",
        (data) => {},
        (err) => {
          console.log("err write file", err);
        },
      );

      // send response
      res.send({ status: "Пользователь успешно зарегестрирован" });
      // res.send({
      //   status: "OK",
      //   error: false,
      //   message: "Пользователь успешно зарегестрирован",
      // });
    } else {
      // throw new Error("Пользователь уже зарегестрирован");
      res.status(500).json({ error: "Пользователь уже зарегестрирован" });
      // res.send({
      //   status: "500",
      //   error: true,
      //   message: "Пользователь уже зарегестрирован",
      // });
    }
  } else {
    throw new Error("не найдено свойство login");
  }
  console.log("parseJsonData Registration", parseJsonData);
});

//************** */ auth**************************************
app.post("/auth", (req, res) => {
  log("req.body", req.body);

  if (req.body?.login && req.body.password) {
    // read file
    const jsonFileData = fs.readFileSync(
      userJson,
      "utf-8",
      (err, data) => {},
      (err) => {
        console.log("err read file", err);
      },
    );

    // parse data
    const parseJsonData = JSON.parse(jsonFileData);
    console.log("parseJsonData auth", parseJsonData);

    if (Array.isArray(parseJsonData?.users)) {
      // check psw and login -- must contains password and login  field name
      const isUserExist = parseJsonData?.users.find(
        (user) =>
          user.login === req.body?.login &&
          user.password === req.body?.password,
      );

      if (isUserExist) {
        res.send(isUserExist);
        // res.send({
        //   status: "isUserExist",
        //   error: false,
        //   message: "Вы успешно вошли в систему!",
        // });
      } else {
        // или отправить обьект с текстом ошибки

        // res.send({
        //   status: "500",
        //   error: true,
        //   message: "Ошибка - пользователь не найден",
        // });

        // или явно выбросить исключения
        throw new Error("Ошибка - пользователь не найден");
      }
    }
  } else {
    throw new Error("не найдено свойство login или password");
    // res.send({
    //   status: "500",
    //   error: true,
    //   message: "не найдено свойство login или password",
    // });
  }
});

//************** */ tours**************************************

app.get("/tours", (req, res) => {
  const jsonFileData = fs.readFileSync(
    toursJson,
    "utf-8",
    (err, data) => {},
    (err) => {
      console.log("err read file tours", err);
    },
  );
  res.send(jsonFileData);
});

/*******************get tour */
app.get("/tour/:id", (req, res) => {
  const jsonFileData = fs.readFileSync(
    toursJson,
    "utf-8",
    (err, data) => {},
    (err) => {
      console.log("err read file tours", err);
    },
  );
  // parse data
  const parseJsonData = JSON.parse(jsonFileData);
  const paramId = req.params.id;
  const item = parseJsonData.tours.find((tour) => tour.id === paramId);
  if (item) {
    let obj = { tour: item };
    res.send(obj);
    // res.send(item);
    //res.send(JSON.stringify(item));
  } else {
    throw new Error("Тур не найден по id:", paramId);
  }
});

/*******************post order */

app.post("/order", (req, res) => {
  const jsonFileData = fs.readFileSync(
    ordersJson,
    "utf-8",
    (err, data) => {},
    (err) => {
      console.log("err read orderJson tours", err);
    },
  );
  //parse data
  const parseJsonData = JSON.parse(jsonFileData);
  const order = req.body;
  parseJsonData.orders.push(order);

  const json = JSON.stringify({ orders: parseJsonData.orders });

  fs.writeFileSync(
    ordersJson,
    json,
    (data) => {},
    (err) => {
      console.log("err write file", err);
    },
  );
  res.send("ok");
});

/*******************get nearest tour */
app.get("/nearestTours", (req, res) => {
  const jsonFileData = fs.readFileSync(
    toursJson,
    "utf-8",
    (err, data) => {},
    (err) => {
      console.log("err read file tours", err);
    },
  );

  // parse data
  const parseJsonData = JSON.parse(jsonFileData);
  const locationId = req.query?.locationId;
  console.log("req.query", req.query);

  const items = parseJsonData.tours.filter(
    (tour) => tour.locationId === locationId,
  );
  res.send(items);
});

/*******************get countries */
app.get("/countries", (req, res) => {
  const jsonFileData = fs.readFileSync(
    countriesJson,
    "utf-8",
    (err, data) => {},
    (err) => {
      console.log("err read file tours", err);
    },
  );

  // parse data
  const parseJsonData = JSON.parse(jsonFileData);

  res.send(parseJsonData);
});

// run and listen serve
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
