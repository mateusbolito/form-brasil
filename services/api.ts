import axios from "axios";

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, GET",
  "Access-Control-Allow-Origin": "*",
  "Authorization": "Basic " + btoa("raft_api:R@ft@pi01"),
  "Accept": "application/json",

};

export const api = axios.create({
  baseURL: `https://raftembalagens184378.protheus.cloudtotvs.com.br:10008/rest/api/raft/v1/`,
  headers,
});
