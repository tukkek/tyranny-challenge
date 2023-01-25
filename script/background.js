import * as rpg from './rpg.js'

const RANGED=['Heart shot','Hobble']
const CANTRIPS=['Charged strike','Energy shield']
const SWORD='Sword and shield'
const GREATSWORD='Greatsword'
const DUAL='Dual-wielding'
const UNARMED='Unarmed attacks'
const BOW='Shortbow'
const JAVELIN='Javelin'
const SHOCK='Shock spells'
const FROST='Frost spells'
const VIGOR='Vigor spells'
const ATROPHY='Atrophy spells'
const MAGIC=[SHOCK,FROST,VIGOR,ATROPHY]
const EXPERTISE=new Map([
  [SWORD,['Shield slam','Sunder']],
  [GREATSWORD,['Sunder','Cleave']],
  [DUAL,['Flurry of blows','Slice']],
  [UNARMED,['Flurry of blows','Palm strike']],
  [BOW,RANGED],
  [JAVELIN,RANGED],
  [SHOCK,CANTRIPS],
  [FROST,CANTRIPS],
  [VIGOR,CANTRIPS],
  [ATROPHY,CANTRIPS]])

class Background{
  constructor(n,p,s=[]){
    this.name=n
    this.primary=p
    this.secondary=s
  }
  
  live(){
    let hero=[this.name]
    for(let skills of [this.primary,this.secondary]){
      if(skills.length==0) continue
      let s=rpg.pick(skills)
      hero.push(`${s} (${rpg.pick(EXPERTISE.get(s))})`)
    }
    if(hero.length<3) hero.push(hero[1])
    return hero
  }
}

var backgrounds=[
  new Background('Noble scion',[GREATSWORD]),
  new Background('Soldier',[SWORD]),
  new Background('Hunter',[BOW]),
  new Background('Lawbreaker',[JAVELIN]),
  new Background('Pit fighter',[DUAL,UNARMED]),
  new Background('War mage',MAGIC,[SWORD,JAVELIN]),
  new Background('Diplomat',MAGIC,MAGIC)
  new Background('Guild apprentice',MAGIC),
]

export function live(){return rpg.pick(backgrounds).live()}
