
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Interaction, Message, StageChannel } from "discord.js";
import { eurosPineNut } from "./userData"
import { Stats } from "./userData"
import fs from "fs"
import { ChannelType } from "discord-api-types/v10";
import { getModeForFileReference } from "typescript";
//require("./enemyMaker.js")
//require("./satus-forest.js")
require("./userData.js")
import * as seModule from "./enemyFunction.js"

export const Discord = require('discord.js')
export const { Client, GatewayIntentBits, Partials, ActivityType, MessageFlags } = require('discord.js');

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,

  ], Partials: [Partials.Message, Partials.Channel, Partials.Reaction],
})

const prefix = "%";
let statData: { [x: string]: any }
let UID = Number(fs.readFileSync("DataBase\\uidData.json", "utf-8"));
let rawStatData: string = fs.readFileSync("DataBase\\data.json", "utf-8");
statData = JSON.parse(rawStatData);


client.on('ready', async () => {
  console.log("Ready, wooo!!!")
})


client.on('messageCreate', async (msg: Message) => {
  const args = msg.content.trim().split(" ");
  let time = Date.now();

  if (msg.channel.type == ChannelType.GuildStageVoice) {
    return
  }

  if (args[0].toLowerCase() === prefix.concat("ping")) { //thanks euro for the great concat suggestion!
    msg.reply(`replied at ${Date.now() - time}ms`);
  }

  if (args[0].toLowerCase() === prefix.concat("summonboar")) {
    console.log("you ran command for boar")
    let boarSummoned: number = 0;
    console.log("boar attempted");
    seModule.summonEnemyModule.summonEnemy("boar", 30, 5, 5000,10, msg, Date.now()) //name,hp,dmg,cd,coinDrop,msgToCreateFrom,time
    boarSummoned = 1;
  }


  if (args[0].toLowerCase() === prefix + ("register")) {
    try {
      let userCheck = (statData[msg.author.id].NANDCoin)
      msg.reply("You're already registered!!!!! You silly goose! ;-)")
    } catch {
      let UID = Number(fs.readFileSync("DataBase\\uidData.json", "utf-8"));

      eurosPineNut[msg.author.id] = new Stats(UID, 1, 0, 100, 100, 5, 5, 5, 5, 500, 1);
      fs.writeFileSync("DataBase\\data.json", JSON.stringify(eurosPineNut)); //eurosPineNut is the object w da stats
      fs.writeFileSync("DataBase\\uidData.json", String(UID + 1), "utf-8");

      msg.reply("Congratulations! You've registered with UID " + UID);
    }


  }

  if (args[0].toLowerCase() === prefix + ("stats")) {

    fs.writeFileSync("DataBase\\data.json", JSON.stringify(statData));

    if (statData[msg.author.id] === undefined) {
      statData[msg.author.id] = new Stats(UID, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    msg.reply("**Level: " + statData[msg.author.id].Level + "**\n"
      + ("Strength: " + statData[msg.author.id].Strength + "\n")
      + ("Agility: " + statData[msg.author.id].Agility + "\n")
      + ("Constitution: " + statData[msg.author.id].Constitution + "\n")
      + ("Magic: " + statData[msg.author.id].Magic + "\n")
    );

  } if (args[0].toLowerCase() === prefix + ("bal")) {

    msg.reply("Balance: " + statData[msg.author.id].NANDCoin + "NANDCoin")

  } if (args[0].toLowerCase() === prefix + ("userdata")) {
    let rawdata: string = JSON.stringify(statData[msg.author.id])
    msg.reply(rawdata);

  } if (args[0].toLowerCase() === prefix + ("buttons")) {
    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('battle button :)')
          .setLabel('Primary')
          .setStyle(ButtonStyle.Primary)
      )

    const embed = new EmbedBuilder()
      .setColor("#5a42f5")
      //.setDescription("description")
      .setTitle("Battle")
      .addFields([{ name: "hola", value: "hello there" }])
    //.setImage()

    //@ts-ignore

    msg.channel.send({ components: [buttons], embeds: [embed] });

  }
}
)//this closes messageCreate

client.on(Discord.Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'battle button :)') {

      const embed = new EmbedBuilder()
        .setColor("#5a42f5")
        .setTitle("Battle")
        .addFields([{ name: "adios", value: "goodbye." }])

      
      await interaction.update({ components: interaction.message.components, embeds: [embed] })

    }
    if (interaction.customId === 'enemyBattle') {
     
      if (await seModule.summonEnemyModule.battleEnemy(interaction, interaction.message)) {

        try {
          //@ts-ignore
          await interaction.message.channel.send("Congratulations");
        } catch {
          console.log("wrongChannel message error")
        }
        await interaction.message.delete();

      }
    }
  }

})










client.on('messageCreate', async (msg: Message) => {

  if (statData[msg.author.id] === undefined) {
    statData[msg.author.id] = new Stats(UID, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  if (statData[msg.author.id].Location === 2) {
    let random: number = Math.floor(Math.random() * 1000)

    if (random === 1) {
      console.log("boar attempted");
      seModule.summonEnemyModule.summonEnemy("boar", 30, 5, 5000, 10, msg, Date.now()) //name,hp,dmg,cd,msgToCreateFrom
    }
  }


})













client.login('MTAyODQ0MzcxOTY0MjM4NjQzMg.Gl0iP8.IuN4MaQnU4AWx-midRFq1m0lVybke0G0ztnhpQ');


