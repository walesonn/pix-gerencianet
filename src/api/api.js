"use strict";
const https = require("https");
const axios = require("axios").default;
const fs = require("fs");
const path = require("path");

const endpoint =
  process.env.GN_ENDPOINT.indexOf("https://") != -1
    ? process.env.GN_ENDPOINT
    : `https://${process.env.GN_ENDPOINT}`;

var certificado = fs.readFileSync(path.join(`cert/${process.env.CERT_NAME}`));

//Insira os valores de suas credenciais em desenvolvimento do pix
var credenciais = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

var data = JSON.stringify({ grant_type: "client_credentials" });
var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;

// Codificando as credenciais em base64
var auth = Buffer.from(data_credentials).toString("base64");

const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});

const config = {
  baseURL: process.env.GN_ENDPOINT,
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
};

module.exports.authorizationToken = () => {
  return axios.post(`${endpoint}/oauth/token`, data, config);
};

module.exports.api = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
});
