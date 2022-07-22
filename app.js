const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config({ path: "./.env.local" });
const { Server } = require("socket.io");
var cron = require("node-cron");

const port = process.env.PORT || 3005;
const cors = require("cors");
const meal_routes = require("./src/routes/meal.route.js");
const setting_routes = require("./src/routes/setting.route.js");
const order_routes = require("./src/routes/order.route.js");
const firebase_routes = require("./src/routes/firebase.route.js");
const archived_order_services = require("./src/services/archived-order.service.js");

const app = express();

app.set("port", port);
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected");
    cron.schedule("0 0 2 * * *", () => {
      archived_order_services.moveOrders();
      console.log("Orders moved to archive");
    });
    app.use("/meals", meal_routes);
    app.use("/settings", setting_routes);
    app.use("/orders", order_routes);
    app.use("/firebase", firebase_routes);

    app.use("*", (req, res) => {
      return res.status(404).json({
        success: false,
        message: "API endpoint doesn't exist",
      });
    });

    const server = require("http").createServer(app);
    const io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "95.223.108.179",
          "https://incomparable-douhua-be7995.netlify.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    io.on("connection", (socket) => {
      console.log("user connected", socket.id);
      socket.off("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
      socket.on("join_room", (data) => {
        console.log(`${socket.id} joined room ${data}`);
        socket.join(data);
      });
      socket.on("send_order", (data) => {
        console.log(`${socket.id} sending order ${data}`);
        socket.to("admin").emit("received_order", data);
      });
      socket.on("update_order", (data) => {
        console.log(`${socket.id} sending order ${data}`);
        socket.to(data.uid).emit("updated_order", data);
      });
      socket.on("refresh_data", () => {
        console.log("refreshing data");
        socket.to("user").emit("refreshed_data", null);
      });
      socket.on("update_shop", (data) => {
        console.log(`${socket.id} updating shop ${data}`);
        socket.to("user").emit("updated_shop", data);
      });
    });

    server.listen(port);
    server.on("listening", () => {
      console.log(`Listening on port:: http://localhost:${port}/`);
    });
  })
  .catch((e) => console.log("Database Error " + e));
