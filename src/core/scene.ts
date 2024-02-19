import { Stage } from "./stage";

export type Scene = (stage: Stage) => Generator;