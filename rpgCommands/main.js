"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.MessageFlags = exports.ActivityType = exports.Partials = exports.GatewayIntentBits = exports.Client = exports.Discord = void 0;
const discord_js_1 = require("discord.js");
const userData_1 = require("./userData");
const userData_2 = require("./userData");
const fs_1 = __importDefault(require("fs"));
const v10_1 = require("discord-api-types/v10");
//require("./enemyMaker.js")
//require("./satus-forest.js")
require("./userData.js");
const seModule = __importStar(require("./enemyFunction.js"));
exports.Discord = require('discord.js');
_a = require('discord.js'), exports.Client = _a.Client, exports.GatewayIntentBits = _a.GatewayIntentBits, exports.Partials = _a.Partials, exports.ActivityType = _a.ActivityType, exports.MessageFlags = _a.MessageFlags;
exports.client = new exports.Client({
    intents: [
        exports.GatewayIntentBits.Guilds,
        exports.GatewayIntentBits.GuildMessages,
        exports.GatewayIntentBits.MessageContent,
        exports.GatewayIntentBits.GuildMembers,
        exports.GatewayIntentBits.DirectMessages,
        exports.GatewayIntentBits.GuildVoiceStates,
        exports.GatewayIntentBits.GuildPresences,
    ], Partials: [exports.Partials.Message, exports.Partials.Channel, exports.Partials.Reaction],
});
const prefix = "%";
let statData;
let UID = Number(fs_1.default.readFileSync("DataBase\\uidData.json", "utf-8"));
let rawStatData = fs_1.default.readFileSync("DataBase\\data.json", "utf-8");
statData = JSON.parse(rawStatData);
exports.client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Ready, wooo!!!");
    for (const user in statData) {
        statData[user] = new userData_2.Stats(statData[user].UID, statData[user].Level, statData[user].EXP, statData[user].MaxHP, statData[user].HP, statData[user].Strength, statData[user].Agility, statData[user].Magic, statData[user].Constitution, statData[user].NANDCoin, statData[user].Location);
    }
}));
class user {
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
}
exports.client.on('messageCreate', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const args = msg.content.trim().split(" ");
    let time = Date.now();
    if (msg.channel.type == v10_1.ChannelType.GuildStageVoice) {
        return;
    }
    if (args[0].toLowerCase() === prefix.concat("ping")) { //thanks euro for the great concat suggestion!
        msg.reply(`replied at ${Date.now() - time}ms`);
    }
    if (args[0].toLowerCase() === prefix.concat("summonboar")) {
        console.log("you ran command for boar");
        let boarSummoned = 0;
        console.log("boar attempted");
        seModule.summonEnemyModule.summonEnemy("boar", 30, 5, 5000, 10, msg, Date.now()); //name,hp,dmg,cd,coinDrop,msgToCreateFrom,time
        boarSummoned = 1;
    }
    if (args[0].toLowerCase() === prefix + ("register")) {
        try {
            let userCheck = (statData[msg.author.id].NANDCoin);
            msg.reply("You're already registered!!!!! You silly goose! ;-)");
        }
        catch (_b) {
            let UID = Number(fs_1.default.readFileSync("DataBase\\uidData.json", "utf-8"));
            userData_1.eurosPineNut[msg.author.id] = new userData_2.Stats(UID, 1, 0, 100, 100, 5, 5, 5, 5, 500, 1);
            fs_1.default.writeFileSync("DataBase\\data.json", JSON.stringify(userData_1.eurosPineNut)); //eurosPineNut is the object w da stats
            fs_1.default.writeFileSync("DataBase\\uidData.json", String(UID + 1), "utf-8");
            msg.reply("Congratulations! You've registered with UID " + UID);
        }
    }
    if (args[0].toLowerCase() === prefix + ("stats")) {
        fs_1.default.writeFileSync("DataBase\\data.json", JSON.stringify(statData));
        if (statData[msg.author.id] === undefined) {
            statData[msg.author.id] = new userData_2.Stats(UID, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        msg.reply("**Level: " + statData[msg.author.id].Level + "**\n"
            + ("Strength: " + statData[msg.author.id].Strength + "\n")
            + ("Agility: " + statData[msg.author.id].Agility + "\n")
            + ("Constitution: " + statData[msg.author.id].Constitution + "\n")
            + ("Magic: " + statData[msg.author.id].Magic + "\n"));
    }
    if (args[0].toLowerCase() === prefix + ("bal")) {
        msg.reply("Balance: " + statData[msg.author.id].NANDCoin + "NANDCoin");
    }
    if (args[0].toLowerCase() === prefix + ("userdata")) {
        let rawdata = JSON.stringify(statData[msg.author.id]);
        msg.reply(rawdata);
    }
    if (args[0].toLowerCase() === prefix + ("buttons")) {
        const buttons = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('battle button :)')
            .setLabel('Primary')
            .setStyle(discord_js_1.ButtonStyle.Primary));
        const embed = new discord_js_1.EmbedBuilder()
            .setColor("#5a42f5")
            //.setDescription("description")
            .setTitle("Battle")
            .addFields([{ name: "hola", value: "hello there" }]);
        //.setImage()
        //@ts-ignore
        msg.channel.send({ components: [buttons], embeds: [embed] });
    }
})); //this closes messageCreate
exports.client.on(exports.Discord.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isButton()) {
        if (interaction.customId === 'battle button :)') {
            const embed = new discord_js_1.EmbedBuilder()
                .setColor("#5a42f5")
                .setTitle("Battle")
                .addFields([{ name: "adios", value: "goodbye." }]);
            yield interaction.update({ components: interaction.message.components, embeds: [embed] });
        }
        if (interaction.customId === 'enemyBattle') {
            if (yield seModule.summonEnemyModule.battleEnemy(interaction, interaction.message)) {
                try {
                    //@ts-ignore
                    yield interaction.message.channel.send("Congratulations");
                }
                catch (_c) {
                    console.log("wrongChannel message error");
                }
                yield interaction.message.delete();
            }
        }
    }
}));
exports.client.on('messageCreate', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (statData[msg.author.id] === undefined) {
        statData[msg.author.id] = new userData_2.Stats(UID, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if (statData[msg.author.id].Location === 2) {
        let random = Math.floor(Math.random() * 1000);
        if (random === 1) {
            console.log("boar attempted");
            seModule.summonEnemyModule.summonEnemy("boar", 30, 5, 5000, 10, msg, Date.now()); //name,hp,dmg,cd,msgToCreateFrom
        }
    }
}));
exports.client.login('MTAyODQ0MzcxOTY0MjM4NjQzMg.Gl0iP8.IuN4MaQnU4AWx-midRFq1m0lVybke0G0ztnhpQ');
