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
const constants_1 = require("../config/constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const resolversMutation = {
    Mutation: {
        register(_, { user }, { db }) {
            return __awaiter(this, void 0, void 0, function* () {
                const userCheck = yield db.collection(constants_1.COLLECTIONS.USERS).
                    findOne({ email: user.email });
                if (userCheck !== null) {
                    return {
                        status: false,
                        message: `El email ${user.email} está registrado y no puedes registrarte con este email`,
                        user: null
                    };
                }
                const lastUser = yield db
                    .collection(constants_1.COLLECTIONS.USERS)
                    .find()
                    .limit(1)
                    .sort({ registerDate: -1 })
                    .toArray();
                if (lastUser.length === 0) {
                    user.id = 1;
                }
                else {
                    user.id = lastUser[0].id + 1;
                }
                user.registerDate = new Date().toISOString();
                user.password = bcrypt_1.default.hashSync(user.password, 10);
                return yield db
                    .collection(constants_1.COLLECTIONS.USERS)
                    .insertOne(user)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        status: true,
                        message: `El usuario con el email ${user.email} está registrado correctamente`,
                        user
                    };
                }))
                    .catch((err) => {
                    console.log(err.message);
                    return {
                        status: false,
                        message: `Error inesperado, prueba de nuevo`,
                        user: null
                    };
                });
            });
        },
    },
};
exports.default = resolversMutation;
