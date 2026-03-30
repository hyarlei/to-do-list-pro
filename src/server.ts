declare function require(moduleName: string): any;
declare const process: { env: { PORT?: string } };

const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
	console.log(`Servidor iniciado na porta ${PORT}`);
});
