import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Interaction, InteractionResponse, Message } from "discord.js"
import { client, Discord } from './main.js'
import fs from "fs"


async function sleep(time: number) {
  await new Promise(res => setTimeout(res, time))
}

let enemyHp: number
let enemyCd: number
let enemyName: string
let enemyCoin: number
let userAction: string
let enemyAction: string
let eDamage: number;
let isMade: number = 0;
let globalTime: number = 0;
let runNum : number = 0;

let statData: { [x: string]: any }

let UID = Number(fs.readFileSync("DataBase\\uidData.json", "utf-8"));

let rawStatData: string = fs.readFileSync("DataBase\\data.json", "utf-8");
statData = JSON.parse(rawStatData);

export module summonEnemyModule {
  export function summonEnemy(name: string, hp: number, dmg: number, cd: number, coin: number, msg: any, time: number) {
    globalTime = time;

    //client.on('messageCreate', async (msg: Message) => {
    //   const args = msg.content.trim().split(" ");

    enemyHp = hp
    enemyCd = cd
    enemyName = name
    eDamage = dmg
    enemyCoin = coin

    //}
    //)


    //create buttons 

    const buttons = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId('enemyBattle')
          .setLabel('Attack')
          .setStyle(ButtonStyle.Primary)
      )

    const embed = new EmbedBuilder()
      .setColor("#5a42f5")
      .setTitle(enemyName + " Battle")
      .addFields([{ name: enemyName, value: "HP: " + enemyHp.toString() + "\n >" }])
      .addFields([{ name: "user has yet to join battle", value: "..." }])
    //.setImage()



    if (isMade === 0) {
      msg.channel.send({ components: [buttons], embeds: [embed] });
      isMade = 1;
    }


  }//1st function end

  //when Attack button is clicked ->


  export async function battleEnemy(interact: Interaction, msg: Message) {
    await sleep(247.3);

    let userCd: number = 69420;
    try {

      //add +agilitymod for modifier w items

      userCd = (statData[interact.user.id].Agility) * 1000.0
      
    } catch {


      
      console.log("user doesn't exist apparently")
      try{
      //@ts-ignore
      await interact.reply({ content: "please use %register", ephemeral: true })
      return;
    }catch{
      console.log("not registered..")
      return;
    }
    }

    let userDamage: number = (statData[interact.user.id].Strength / 2.5)

    if (Date.now() - globalTime >= userCd) {
      enemyHp -= userDamage
      userAction = "you attack the " + enemyName + " for " + userDamage
    } else {
      userAction = "you are too tired to attack"
    }

    if (enemyHp <= 0) {
      try {
        if(runNum === 0){
        //@ts-ignore
        msg.channel.send(enemyName + " has died")
        enemyCoin = enemyCoin + Math.random()*(0.4*enemyCoin)
        //@ts-ignore
        msg.channel.send("+ " + enemyCoin + "NANDCoin")
        statData[interact.user.id].NANDCoin += enemyCoin;
        fs.writeFileSync("DataBase\\data.json", JSON.stringify(statData))
        isMade = 0
      
        //item Drops here




        //end
        runNum = 1
      }
      } catch {
        console.log("channelType msg error")
      }
      runNum = 0
      return true;
    }

    if (statData[interact.user.id].HP <= 0) {
      try {
        //@ts-ignore
        msg.channel.send("you have died")
        //@ts-ignore
        msg.channel.send("final stats:" + statData[interact.user.id])
        delete statData[interact.user.id]
      } catch {
        console.log("channelType msg error")
      }
    }

    if (Date.now() - globalTime >= enemyCd) {
      let enemyDamage = Math.floor((Math.random() * 10)) + eDamage

      statData[interact.user.id].HP -= enemyDamage

      fs.writeFileSync("DataBase\\data.json", JSON.stringify(statData));

      enemyAction = "the " + enemyName + " attacks you for " + enemyDamage
    } else {
      enemyAction = "the " + enemyName + " is too tired to attack"
    }
    globalTime = Date.now()


    const embed = new EmbedBuilder()
      .setColor("#5a42f5")
      .setTitle(enemyName + " Battle")
      .addFields([{ name: enemyName, value: "HP: " + enemyHp.toString() + "\n >" + userAction }])

      .addFields([{ name: interact.user.username, value: "HP: " + (statData[interact.user.id].HP).toString() + "\n >" + enemyAction }])
    //.setImage()


    if (isMade === 1) {

try{
      //@ts-ignore
      await interact.update({ components: msg.components, embeds: [embed] })
    }catch{
      "error on line 156 in enemyfunctions"
    }
    }
    return false;
  }

}
          //here