import cors from "cors";
import "dotenv/config";
import express from "express";
import { errorHandler } from "./http/middleware/error-handler";
import routes from "./http/routes";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '' : '*',
  credentials: true,
}));

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Servidor iniciado na porta ${PORT}`);
});
