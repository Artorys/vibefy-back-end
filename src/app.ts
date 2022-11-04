import "express-async-errors"
import express, { Request, Response } from "express";
import sessionRoute  from "./routes/session.routes";
import userRoute  from "./routes/user.routes";
import aswRouter from "./routes/aws.routes"
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import handleErrorMiddleware from "./middleware/error.middleware";

const app = express();
app.use(express.json())

app.use("/user", userRoute);
app.use("/login", sessionRoute);
app.use("/file", aswRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});
app.use(handleErrorMiddleware)


export default app;
