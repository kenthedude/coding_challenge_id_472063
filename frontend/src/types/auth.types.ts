import type { CommonResponse } from "./common.types";

export type LoginResponse = CommonResponse & { jwt?: string };
