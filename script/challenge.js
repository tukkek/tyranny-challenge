import * as rpg from './rpg.js'
import * as background from './background.js'

const ALLIES=['Disfavored','none','Scarlet Chorus','rebels']
const HEROES=['Verse','Barik','Lantry','Eb','Sirin','Kills-in-shadow']
const HERO=document.querySelector('template#hero').content.children[0]
const PARTY=document.querySelector('#party')
const PRIORITY=document.querySelector('#priority')
const CLAUSE=document.querySelector('template#clause').content.children[0]
const CLAUSES=document.querySelector('#clauses')

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

export function setup(){
  let b=background.live()
  add('History',b[0])
  add('Primary expertise',b[1])
  add('Secondary expertise',b[2])
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
