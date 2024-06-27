import axios from "axios";

const mealClient = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1/",
});

export default mealClient;
