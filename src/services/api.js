import axios from "axios";
import { authHeader } from "../helpers/auth-header";

export const API = {
    GET: function(api) {
        return axios
            .get(process.env.ROOT_API + api, {
                headers: {
                    Accept: "application/json",
                    Authorization: authHeader()
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    POST: function(api, data) {
        return axios
            .post(process.env.ROOT_API + api, data, {
                headers: {
                    Accept: "application/json",
                    Authorization: authHeader()
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    POSTFILE: function(api, data) {
        return axios
            .post(process.env.ROOT_API + api, data, {
                headers: {
                    Accept: "multipart/form-data",
                    Authorization: authHeader()
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }
};
