export function roll(min,max){return Math.floor(Math.random()*(max-min+1))+min}

export function pick(array){return array[roll(0,array.length-1)]}

export function shuffle(array){
  for(let i=0;i<array.length-1;i++){
    let j=roll(i,array.length-1)
    if(i==j) continue
    let a=array[i]
    let b=array[j]
    array[i]=b
    array[j]=a
  }
  return array
}
