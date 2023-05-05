import $http from "axios";
import Router from "next/router";

/**
 * **************************************************************************
 * **************************************************************************
 * Author: Isaiah Abiodun ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: isaiah.abiodun@fairmoney.io
 *
 * filename: client.ts
 *
 * @description: This is axios client for TSM Dashboard
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <client></client>
 *
 * ? Local & Shared Imports
 */
import { TSM_URL, X_REQ } from "@mecho/env";

const client = $http.create({
  timeout: 60000,
  headers: {
    "X-REQUEST-LOCK": X_REQ,
    "App-Id": "xH1pQ3lVXNT0wsUqGJ/s/vGCAKuy9uNR",
  },
});

// Set up response interceptor
client.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response && [401, 307, 403].includes(error.response.status)) {
      // Clear the expired token and reject the promise

      Router.push("/");
      return Promise.reject({
        status: 401,
        message: "Login session expired, please login again",
      });
    }
    return Promise.reject(error);
  }
);

// Set up request interceptor
client.interceptors.request.use((config) => {
  const regex = /^\/(login)?$/;
  if (!regex.test(config.url as string)) {
    // Set the authorization header
    // config.headers.Authorization = `Bearer ${getAuthToken()}`;
  }
  return config;
});

export default client;

// Get the authorization header
export const setAuthorization = () => ({
  //   Authorization: `Bearer ${getAuthToken()}`,
});

type ResponseKeys = "result";
type ErrorKeys = "error_message" | "error_details";

export const pickErrorKey =
  (key: ErrorKeys = "error_message") =>
  (error: { request: any; response?: { data: Record<ErrorKeys, string> } }) => {
    if (error?.response?.data) {
      const { error_message, error_details } = error.response.data;

      switch (key) {
        case "error_message":
          return Promise.reject(error_message ?? "An error occurred.");
        case "error_details":
          return Promise.reject(error_details ?? "An error occurred.");
      }
    } else if (error.request) {
      throw new Error(`Unexpected request error`);
    } else {
      throw new Error(`Client error`);
    }
  };

export const pickResponseKey: any =
  (key: ResponseKeys = "result") =>
  (response: { data: Record<ResponseKeys, any> }) =>
    response.data?.[key] ?? response.data;

export const pickResult = pickResponseKey("result");
export const pickErrorMessage = pickErrorKey("error_message");
