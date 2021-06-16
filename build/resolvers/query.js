"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../config/constants");
const constants_2 = require("../config/constants");
const jwt_1 = __importDefault(require("../lib/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resolversQuery = {
    Query: {
        users(_, __, { db }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return {
                        status: true,
                        message: 'Lista de usuarios cargada correctamente',
                        users: yield db.collection(constants_2.COLLECTIONS.USERS).find().toArray(),
                    };
                }
                catch (error) {
                    console.log(error);
                    return {
                        status: false,
                        message: 'Error al cargar los usuarios. Comprueba que tienes correctamente todo.',
                        users: [],
                    };
                }
            });
        },
        login(_, { email, password }, { db }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield db
                        .collection(constants_2.COLLECTIONS.USERS)
                        .findOne({ email });
                    if (user === null) {
                        return {
                            status: false,
                            message: 'Usuario no existe',
                            token: null,
                        };
                    }
                    const passwordCheck = bcrypt_1.default.compareSync(password, user.password);
                    if (passwordCheck !== null) {
                        delete user.password;
                        delete user.birthday;
                        delete user.registerDate;
                    }
                    return {
                        status: true,
                        message: !passwordCheck
                            ? 'Password y usuario no son correctos, sesión no iniciada'
                            : 'Usuario cargado correctamente',
                        token: !passwordCheck
                            ? null
                            : new jwt_1.default().sign({ user }, constants_1.EXPIRETIME.H24),
                    };
                }
                catch (error) {
                    console.log(error);
                    return {
                        status: false,
                        message: 'Error al cargar el usuario. Comprueba que tienes correctamente todo.',
                        token: null,
                    };
                }
            });
        },
        me(_, __, { token }) {
            let info = new jwt_1.default().verify(token);
            if (info === constants_1.MESSAGES.TOKEN_VERICATION_FAILED) {
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return {
                status: true,
                message: 'Usuario autenticado correctamente mediante el token',
                user: Object.values(info)[0]
            };
        }
    },
};
exports.default = resolversQuery;
