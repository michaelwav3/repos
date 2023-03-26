"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = exports.eurosPineNut = void 0;
const fs_1 = __importDefault(require("fs"));
const userData = fs_1.default.readFileSync("DataBase\\data.json", "utf-8");
exports.eurosPineNut = JSON.parse(userData); //eurosPineNut is an object from the json file
const stats = ["Level", "EXP", "MaxHP", "HP", "Strength", "Agility", "Magic", "Constitution", "NANDCoin", "Location"];
const activeInv = ["", ""];
class Stats {
    constructor(UID, Level, EXP, MaxHP, HP, Strength, Agility, Magic, Constitution, NANDCoin, Location) {
        this.UID = UID;
        this.Level = Level;
        this.EXP = EXP;
        this.MaxHP = MaxHP;
        this.HP = HP;
        this.Strength = Strength;
        this.Agility = Agility;
        this.Magic = Magic;
        this.Constitution = Constitution;
        this.NANDCoin = NANDCoin;
        this.Location = Location;
    }
    addStat(stat, amount) {
        //@ts-ignore
        this[stat] += amount;
    }
    subtrStat(stat, amount) {
        //@ts-ignore
        this[stat] -= amount;
    }
}
exports.Stats = Stats;
