

export function Random(num:Number){
 let str="uilhfbvjbdfjvkebrvjkerbnvjkernvb"
let len=str.length

let ans=""

for(let i=0;i<len;i++){
     ans+=str[Math.floor((Math.random()*len))]
}
return ans
}
