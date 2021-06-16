"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRETIME = exports.MESSAGES = exports.COLLECTIONS = exports.SECRET_KEY = void 0;
const environments_1 = __importDefault(require("./environments"));
if (process.env.NODE_ENV !== 'production') {
    const env = environments_1.default;
}
exports.SECRET_KEY = process.env.SECRET || 'AnartzMugikaCursoGraphQLTiendaOnline';
var COLLECTIONS;
(function (COLLECTIONS) {
    COLLECTIONS["USERS"] = "users";
})(COLLECTIONS = exports.COLLECTIONS || (exports.COLLECTIONS = {}));
var MESSAGES;
(function (MESSAGES) {
    MESSAGES["TOKEN_VERICATION_FAILED"] = "token no valido, inicia sesion de nuevo";
})(MESSAGES = exports.MESSAGES || (exports.MESSAGES = {}));
var EXPIRETIME;
(function (EXPIRETIME) {
    EXPIRETIME[EXPIRETIME["H1"] = 3600] = "H1";
    EXPIRETIME[EXPIRETIME["H24"] = 86400] = "H24";
    EXPIRETIME[EXPIRETIME["M15"] = 900] = "M15";
    EXPIRETIME[EXPIRETIME["M20"] = 1200] = "M20";
    EXPIRETIME[EXPIRETIME["D3"] = 259200] = "D3";
})(EXPIRETIME = exports.EXPIRETIME || (exports.EXPIRETIME = {}));
