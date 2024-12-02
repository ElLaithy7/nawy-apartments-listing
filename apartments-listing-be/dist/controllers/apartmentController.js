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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addApartment = exports.getApartmentDetails = exports.getApartments = void 0;
const apartmentService_1 = require("../services/apartmentService");
// get all apartments
const getApartments = (supabase) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, apartmentService_1.fetchApartments)(supabase);
        res.json(data);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
});
exports.getApartments = getApartments;
// get apartment details
const getApartmentDetails = (supabase) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield (0, apartmentService_1.fetchApartmentById)(supabase, id);
        res.json(data);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
});
exports.getApartmentDetails = getApartmentDetails;
// add apartment
const addApartment = (supabase) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, apartmentService_1.createApartment)(supabase, req.body);
        res.status(201).json(data);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
});
exports.addApartment = addApartment;
