import { ViteRunner } from "vite-runner";
import path from "path";

new ViteRunner({
    port: 8080,
    https: false,
    projectDirectory: path.join(__dirname, ".."),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    useReact: true,
}).startServer();
