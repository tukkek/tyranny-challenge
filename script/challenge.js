import * as rpg from './rpg.js'

const ALLIES=['Disfavored','none','Scarlet Chorus','rebels']
const HEROES=['Verse','Barik','Lantry','Eb','Sirin','Kills-in-shadow']
const HERO=document.querySelector('template#hero').content.children[0]
const PARTY=document.querySelector('#party')
const PRIORITY=document.querySelector('#priority')
const CLAUSE=document.querySelector('template#clause').content.children[0]
const CLAUSES=document.querySelector('#clauses')
const BACKGROUNDS=['Pit fighter','Hunter','Guild apprentice','Noble scion','Soldier','Lawbreaker','War mage','Diplomat']
const RANGED=['Heart shot','Hobble']
const MAGIC=['Charged strike','Energy shield']
const EXPERTISE={
  'Sword and shield':['Shield slam','Sunder'],
  'Greatsword':['Sunder','Cleave'],
  'Dual-wielding':['Flurry of blows','Slice'],
  'Unarmed attacks':['Flurry of blows','Palm strike'],
  'Shortbow':RANGED,
  'Javelin':RANGED,
  'Shock spells':MAGIC,
  'Frost spells':MAGIC,
  'Vigor spells':MAGIC,
  'Atrophy spells':MAGIC,
}

function update(){
  for(let s of Array.from(PARTY.querySelectorAll('.priority')))
    s.remove()
  for(let h of HEROES){
    if(!PARTY.querySelector(`*[hero="${h}"] input`).checked)
      continue
    let s=document.createElement('span')
    s.textContent=h
    s.classList.add('priority')
    PARTY.appendChild(s)
  }
}

function add(clause,value){
  let c=CLAUSE.cloneNode(true)
  c.querySelector('strong').textContent=clause
  c.querySelector('span').textContent=value
  CLAUSES.appendChild(c)
}

function specialize(){
  let e=rpg.pick(Object.keys(EXPERTISE))
  return `${e} (${rpg.pick(EXPERTISE[e])})`
}

export function setup(){
  add('History',rpg.pick(BACKGROUNDS))
  add('Primary expertise',specialize())
  add('Secondary expertise',specialize())
  add('Alliance',rpg.pick(ALLIES))
  for(let h of HEROES){
    let control=HERO.cloneNode(true)
    control.querySelector('.name').textContent=h
    control.onchange=update
    control.setAttribute('hero',h)
    PARTY.insertBefore(control,PRIORITY)
  }
  rpg.shuffle(HEROES)
  update()
}
