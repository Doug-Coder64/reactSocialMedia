import { builder } from "./builder";
import "./types/User";
import "./types/Link";
import "./types/Post";
export const schema = builder.toSchema();
