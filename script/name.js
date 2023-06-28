export var names=[]

export async function setup(){
  names=await fetch('../neutralNames.json')
  names=await names.json()
  names=names['neutralNames']
}
