const fs = require('fs');
const e2019Arr = require('../json/election2019.json');
const e2019 = e2019Arr[0];
const stateParties = {}; 
for(let state in e2019){
    for(let constituency in e2019[state]){
        if(!stateParties[state]){
            stateParties[state] = {}
        }
        if(!stateParties[state][e2019[state][constituency]["candidates"][0].prty]){
            stateParties[state][e2019[state][constituency]["candidates"][0].prty] = 0;
        }
        stateParties[state][e2019[state][constituency]["candidates"][0].prty] += 1;
    }
}
console.log(stateParties);

//fs.writeFileSync('../json/state-parties.json',JSON.stringify(stateParties,null,2),(err)=>{});
// let inc = 0;
// const incStatewise = {};
// for(let state in stateParties){
//     for(let itm in stateParties[state]){
//         if(itm == "INC"){
//             // inc += stateParties[state][itm];
//             incStatewise[state] = stateParties[state][itm];
//         }
//     }
// }
// console.log(inc);

//fs.writeFileSync('../json/statewiseinc.json',JSON.stringify(incStatewise,null,2),(err)=>{});