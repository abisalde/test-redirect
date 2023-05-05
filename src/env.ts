export const isProd = process.env.NODE_ENV === "production";
export const isLocal = process.env.NODE_ENV === "development";

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === "true" ?? false;

export const TSM_URL = process.env.BASE_URL;
export const X_REQ = process.env.X_REQUEST_LOCK;

export const AUTH_TOKEN = "__TSM_DASH_@PayForce___By_FairMoney#Token";
export const AUTH_APP_STATE = `__TSM_DASH_@PayForce___By_FairMoney___Context#state`;
