import fs from "fs"

const userData = fs.readFileSync("DataBase\\data.json","utf-8");
export let eurosPineNut = JSON.parse(userData) //eurosPineNut is an object from the json file

const stats = ["Level","EXP","MaxHP","HP","Strength","Agility","Magic","Constitution","NANDCoin","Location"] as const;
const activeInv = ["",""] as const;

export class Stats{
    UID:number
    Level:number
    EXP:number
    MaxHP:number
    HP:number
    Strength:number
    Agility:number
    Magic:number
    Constitution:number
    NANDCoin:number
    Location:number
    
    constructor(UID:number,Level:number,EXP:number,MaxHP:number,HP:number,Strength:number,Agility:number,Magic:number,Constitution:number,NANDCoin:number,Location:number){
        this.UID = UID
        this.Level = Level
        this.EXP = EXP
        this.MaxHP = MaxHP
        this.HP = HP
        this.Strength = Strength
        this.Agility = Agility
        this.Magic = Magic
        this.Constitution = Constitution
        this.NANDCoin = NANDCoin
        this.Location = Location
        
    }

    addStat(stat: string, amount: number){
        //@ts-ignore
        this[stat] += amount
      }

    subtrStat(stat: string, amount: number){
        //@ts-ignore
        this[stat] -= amount
      }


}


