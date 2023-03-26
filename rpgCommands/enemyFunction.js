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
exports.summonEnemyModule = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
function sleep(time) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(res => setTimeout(res, time));
    });
}
let enemyHp;
let enemyCd;
let enemyName;
let enemyCoin;
let userAction;
let enemyAction;
let eDamage;
let isMade = 0;
let globalTime = 0;
let runNum = 0;
let statData;
let UID = Number(fs_1.default.readFileSync("DataBase\\uidData.json", "utf-8"));
let rawStatData = fs_1.default.readFileSync("DataBase\\data.json", "utf-8");
statData = JSON.parse(rawStatData);
var summonEnemyModule;
(function (summonEnemyModule) {
    function summonEnemy(name, hp, dmg, cd, coin, msg, time) {
        globalTime = time;
        //client.on('messageCreate', async (msg: Message) => {
        //   const args = msg.content.trim().split(" ");
        enemyHp = hp;
        enemyCd = cd;
        enemyName = name;
        eDamage = dmg;
        enemyCoin = coin;
        //}
        //)
        //create buttons 
        const buttons = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('enemyBattle')
            .setLabel('Attack')
            .setStyle(discord_js_1.ButtonStyle.Primary));
        const embed = new discord_js_1.EmbedBuilder()
            .setColor("#5a42f5")
            .setTitle(enemyName + " Battle")
            .addFields([{ name: enemyName, value: "HP: " + enemyHp.toString() + "\n >" }])
            .addFields([{ name: "user has yet to join battle", value: "..." }]);
        //.setImage()
        if (isMade === 0) {
            msg.channel.send({ components: [buttons], embeds: [embed] });
            isMade = 1;
        }
    } //1st function end
    summonEnemyModule.summonEnemy = summonEnemy;
    //when Attack button is clicked ->
    function battleEnemy(interact, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sleep(247.3);
            let userCd = 69420;
            try {
                //add +agilitymod for modifier w items
                userCd = (statData[interact.user.id].Agility) * 1000.0;
            }
            catch (_a) {
                console.log("user doesn't exist apparently");
                try {
                    //@ts-ignore
                    yield interact.reply({ content: "please use %register", ephemeral: true });
                    return;
                }
                catch (_b) {
                    console.log("not registered..");
                    return;
                }
            }
            let userDamage = (statData[interact.user.id].Strength / 2.5);
            if (Date.now() - globalTime >= userCd) {
                enemyHp -= userDamage;
                userAction = "you attack the " + enemyName + " for " + userDamage;
            }
            else {
                userAction = "you are too tired to attack";
            }
            if (enemyHp <= 0) {
                try {
                    if (runNum === 0) {
                        //@ts-ignore
                        msg.channel.send(enemyName + " has died");
                        enemyCoin = enemyCoin + Math.random() * (0.4 * enemyCoin);
                        //@ts-ignore
                        msg.channel.send("+ " + enemyCoin + "NANDCoin");
                        statData[interact.user.id].NANDCoin += enemyCoin;
                        fs_1.default.writeFileSync("DataBase\\data.json", JSON.stringify(statData));
                        isMade = 0;
                        //item Drops here
                        //end
                        runNum = 1;
                    }
                }
                catch (_c) {
                    console.log("channelType msg error");
                }
                runNum = 0;
                return true;
            }
            if (statData[interact.user.id].HP <= 0) {
                try {
                    //@ts-ignore
                    msg.channel.send("you have died");
                    //@ts-ignore
                    msg.channel.send("final stats:" + statData[interact.user.id]);
                    delete statData[interact.user.id];
                }
                catch (_d) {
                    console.log("channelType msg error");
                }
            }
            if (Date.now() - globalTime >= enemyCd) {
                let enemyDamage = Math.floor((Math.random() * 10)) + eDamage;
                statData[interact.user.id].HP -= enemyDamage;
                fs_1.default.writeFileSync("DataBase\\data.json", JSON.stringify(statData));
                enemyAction = "the " + enemyName + " attacks you for " + enemyDamage;
            }
            else {
                enemyAction = "the " + enemyName + " is too tired to attack";
            }
            globalTime = Date.now();
            const embed = new discord_js_1.EmbedBuilder()
                .setColor("#5a42f5")
                .setTitle(enemyName + " Battle")
                .addFields([{ name: enemyName, value: "HP: " + enemyHp.toString() + "\n >" + userAction }])
                .addFields([{ name: interact.user.username, value: "HP: " + (statData[interact.user.id].HP).toString() + "\n >" + enemyAction }]);
            //.setImage()
            if (isMade === 1) {
                try {
                    //@ts-ignore
                    yield interact.update({ components: msg.components, embeds: [embed] });
                }
                catch (_e) {
                    "error on line 156 in enemyfunctions";
                }
            }
            return false;
        });
    }
    summonEnemyModule.battleEnemy = battleEnemy;
})(summonEnemyModule = exports.summonEnemyModule || (exports.summonEnemyModule = {}));
//here
