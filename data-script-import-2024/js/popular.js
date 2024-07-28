const fs = require('fs');
const csv = require('csv-parser');

const popular = {};
fs.createReadStream('../csvdata/BigFights.csv')
    .pipe(csv({ skipLines: 0 }))
    .on('data', (row) => {
        if(row["Popular"]){
            const selectedColumn = {
                state: row["state"],
                Constituency: row["const_name"],
                cand_id: row["cand_id"]
            };
            if(!popular[selectedColumn.state]){
                popular[selectedColumn.state] = {};
            }
            if(!popular[selectedColumn.state][selectedColumn.Constituency]){
                popular[selectedColumn.state][selectedColumn.Constituency] = [];
            }
            popular[selectedColumn.state][selectedColumn.Constituency].push(selectedColumn.cand_id);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(popular);
        fs.writeFileSync('../json/popular.json',JSON.stringify(popular,null,2),(err)=>{
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File has been written');
            }
        });
    });
