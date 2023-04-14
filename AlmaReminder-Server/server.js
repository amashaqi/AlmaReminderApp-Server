import { handleError } from "./src/middleware/errorHandling.js";
import { createServer } from "./src/common/utils/createServer.js";

const port = 3000;
const app = createServer();

app.listen(port, () => console.log("Server Started"));
app.use(handleError);
