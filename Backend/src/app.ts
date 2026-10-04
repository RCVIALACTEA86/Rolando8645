import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import snailpayRoutes from "./routes/snailpay.routes.js";

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("Proceso API CaracolRace Iniciado");
});

app.use(morgan("dev"));
app.use(express.json());

app.use("/apicaracolrace/", authRoutes);
app.use("/apicaracolrace/snailpay", snailpayRoutes);

export default app;
