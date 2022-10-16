import { ModuleGenerator } from "@iamyth/devtool-utils";
import path from "path";

new ModuleGenerator({
    moduleDirectory: path.join(__dirname, "../src"),
}).run();
