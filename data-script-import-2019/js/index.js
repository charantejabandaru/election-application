// const fs = require('fs');
// const csv = require('csv-parser');
// const mysql = require('mysql');
// require('dotenv').config();

// // Create a connection to the MySQL database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: process.env.MYSQL_PASSWORD,
//   database: 'e_2024'
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database as id ' + connection.threadId);
// });


// // fs.createReadStream('../csvdata/party.csv')
// //   .pipe(csv({skipLines: 1}))
// //   .on('data', (row) => {
// //     const selectedColumns = {
// //       party_id: row['PARTY_ID'],
// //       name: row['PARTY_NAME'],
// //       symbol: row['PARTY_SYMBOL']
// //     };

// //     const sql = 'INSERT INTO party (party_id, name, symbol) VALUES (?, ?, ?)'; 
// //     if(selectedColumns.symbol.length > 10){
// //       selectedColumns.symbol = null;
// //     }
// //     const values = [selectedColumns.party_id.toUpperCase(), selectedColumns.name, selectedColumns.symbol]; 

// //     connection.query(sql, values, (err, result) => {
// //       if (err) {
// //         console.error('Error inserting row: ' + err.stack);
// //         return;
// //       }
// //       console.log('Row inserted with ID: ' + result.insertId);
// //     });
// //   })
// //   .on('end', () => {
// //     console.log('CSV file successfully processed');
// //      connection.end(); 
// //   });



  const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };

  const contests = [];

  fs.createReadStream('../csvdata/ConstituencyDetailedInfo.csv')
  .pipe(csv({skipLines: 2}))
  .on('data', (row) => {
     new Promise(async (resolve, reject) =>{
      const selectedColumns = {
        cand_name: row['CANDIDATES NAME'],
        const_name: row['PC NAME'],
        age: row['AGE'],
        state: row['STATE'],
        party_id: row['PARTY NAME'],
        spl_attribute_id: row['SPL_ATTRIBUTE_ID'],
        votes: row['VOTES']
      };

      if(selectedColumns.cand_name != 'NOTA'){
        contests.push(selectedColumns);
        resolve();
      }
      else{
        reject();
      }
    })
    .catch(()=>{});
  })
  .on('end',async () => {
    console.log('CSV file successfully processed');
    for(let item of contests){
      if(item.const_name.charAt(item.const_name.length-1) == " "){
        let str = "";
        for(let i = 0 ; i<item.const_name.length -1 ; i++){
          str += item.const_name.charAt(i);
        }
        item.const_name = str;
      }
      let cand = await executeQuery(`select cand_id from candidates where name = "${item.cand_name}" and age = ${item.age}`);
      let cons = await executeQuery(`select const_id from constituency where name = "${item.const_name}" and state = "${item.state}"`);
      console.log(item);
      let sql = `INSERT INTO contests (const_id, cand_id, votes) VALUES (${cons[0].const_id},'${cand[0].cand_id}',${item.votes})`;
      let result = await executeQuery(sql);
      console.log(result);
    }
    connection.end(); 
  });

//   // fs.createReadStream('../csvdata/special.csv')
//   // .pipe(csv({skipLines: 1}))
//   // .on('data', (row) => {
//   //   const selectedColumns = {
//   //     spl_attribute_id:row['SPECIAL_ID'],
//   //     cand_id:row['CAND_ID']
//   //   };


//   //   const sql = 'INSERT INTO spl_attributes (spl_attribute_id, cand_id) VALUES (?, ?)'; 
//   //   const values = [selectedColumns.spl_attribute_id, selectedColumns.cand_id]; 

//   //   connection.query(sql, values, (err, result) => {
//   //     if (err) {
//   //       console.error('Error inserting row: ' + err.stack);
//   //       return;
//   //     }
//   //     console.log('Row inserted with ID: ' + result.insertId);
//   //   });
//   // })
//   // .on('end', () => {
//   //   console.log('CSV file successfully processed');
//   //    connection.end(); 
//   // });

// const const_code = {
//     "Andaman and Nicobar Islands": {
//         "andaman and nicobar islands": 3501
//     },
//     "Andhra Pradesh": {
//         "amalapuram": 2824,
//         "anakapalli": 2822,
//         "anantapur": 2836,
//         "araku": 2818,
//         "bapatla": 2832,
//         "chittoor": 2842,
//         "eluru": 2827,
//         "guntur": 2830,
//         "hindupur": 2837,
//         "kadapa": 2838,
//         "kakinada": 2823,
//         "kurnool": 2835,
//         "machilipatnam": 2828,
//         "nandyal": 2834,
//         "narasaraopet": 2831,
//         "narsapuram": 2826,
//         "nellore": 2839,
//         "ongole": 2833,
//         "rajahmundry": 2825,
//         "rajampet": 2841,
//         "srikakulam": 2819,
//         "tirupati": 2840,
//         "vijayawada": 2829,
//         "visakhapatnam": 2821,
//         "vizianagaram": 2820
//     },
//     "Arunachal Pradesh": {
//         "arunachal east": 1202,
//         "arunachal west": 1201
//     },
//     "Assam": {
//         "barpeta": 1806,
//         "darrang - udalguri": 1808,
//         "dhubri": 1804,
//         "dibrugarh": 1813,
//         "diphu": 1803,
//         "guwahati": 1807,
//         "jorhat": 1812,
//         "karimganj": 1801,
//         "kaziranga": 1811,
//         "kokrajhar": 1805,
//         "lakhimpur": 1814,
//         "nowgong": 1810,
//         "silchar": 1802,
//         "sonitpur": 1809
//     },
//     "Bihar": {
//         "araria": 1009,
//         "arrah": 1032,
//         "aurangabad": 1037,
//         "banka": 1027,
//         "begusarai": 1024,
//         "bhagalpur": 1026,
//         "buxar": 1033,
//         "darbhanga": 1014,
//         "gaya": 1038,
//         "gopalganj": 1017,
//         "hajipur": 1021,
//         "jahanabad": 1036,
//         "jamui": 1040,
//         "jhanjharpur": 1007,
//         "karakat": 1035,
//         "katihar": 1011,
//         "khagaria": 1025,
//         "kishanganj": 1010,
//         "madhepura": 1013,
//         "madhubani": 1006,
//         "maharajganj": 1019,
//         "munger": 1028,
//         "muzaffarpur": 1015,
//         "nalanda": 1029,
//         "nawada": 1039,
//         "paschim champaran": 1002,
//         "pataliputra": 1031,
//         "patna sahib": 1030,
//         "purnia": 1012,
//         "purvi champaran": 1003,
//         "samastipur": 1023,
//         "saran": 1020,
//         "sasaram": 1034,
//         "sheohar": 1004,
//         "sitamarhi": 1005,
//         "siwan": 1018,
//         "supaul": 1008,
//         "ujiarpur": 1022,
//         "vaishali": 1016,
//         "valmiki nagar": 1001
//     },
//     "Chandigarh": {
//         "chandigarh": 401
//     },
//     "Chhattisgarh": {
//         "bastar": 2210,
//         "bilaspur": 2205,
//         "durg": 2207,
//         "janjgir-champa": 2203,
//         "kanker": 2211,
//         "korba": 2204,
//         "mahasamund": 2209,
//         "raigarh": 2202,
//         "raipur": 2208,
//         "rajnandgaon": 2206,
//         "surguja": 2201
//     },
//     "Dadra and Nagar Haveli": {
//         "dadra and nagar haveli": 2601,
//     },
//     "Daman and Diu": {
//         "daman and diu": 2501
//     },
//     "Goa": {
//         "north goa": 3001,
//         "south goa": 3002
//     },
//     "Gujarat": {
//         "ahmedabad east": 2407,
//         "ahmedabad west": 2408,
//         "amreli": 2414,
//         "anand": 2416,
//         "banaskantha": 2402,
//         "bardoli": 2423,
//         "bharuch": 2422,
//         "bhavnagar": 2415,
//         "chhota udaipur": 2421,
//         "dahod": 2419,
//         "gandhinagar": 2406,
//         "jamnagar": 2412,
//         "junagadh": 2413,
//         "kachchh": 2401,
//         "kheda": 2417,
//         "mahesana": 2404,
//         "navsari": 2425,
//         "panchmahal": 2418,
//         "patan": 2403,
//         "porbandar": 2411,
//         "rajkot": 2410,
//         "sabarkantha": 2405,
//         "surat": 2424,
//         "surendranagar": 2409,
//         "vadodara": 2420,
//         "valsad": 2426
//     },
//     "Haryana": {
//         "ambala": 601,
//         "bhiwani-mahendragarh": 608,
//         "faridabad": 610,
//         "gurgaon": 609,
//         "hisar": 604,
//         "karnal": 605,
//         "kurukshetra": 602,
//         "rohtak": 607,
//         "sirsa": 603,
//         "sonipat": 606
//     },
//     "Himachal Pradesh": {
//         "hamirpur": 203,
//         "kangra": 201,
//         "mandi": 202,
//         "shimla": 204
//     },
//     "Jammu and Kashmir": {
//         "anantnag": 103,
//         "baramulla": 101,
//         "jammu": 106,
//         "srinagar": 102,
//         "udhampur": 105
//     },
//     "Jharkhand": {
//         "chatra": 2004,
//         "dhanbad": 2007,
//         "dumka": 2002,
//         "giridih": 2006,
//         "godda": 2003,
//         "hazaribagh": 2014,
//         "jamshedpur": 2009,
//         "khunti": 2011,
//         "kodarma": 2005,
//         "lohardaga": 2012,
//         "palamu": 2013,
//         "rajmahal": 2001,
//         "ranchi": 2008,
//         "singhbhum": 2010
//     },
//     "Karnataka": {
//         "bagalkot": 2903,
//         "bangalore central": 2925,
//         "bangalore north": 2924,
//         "bangalore rural": 2923,
//         "bangalore south": 2926,
//         "belagavi": 2902,
//         "bellary": 2909,
//         "bidar": 2907,
//         "bijapur": 2904,
//         "chamarajanagar": 2922,
//         "chikballapur": 2927,
//         "chikodi": 2901,
//         "chitradurga": 2918,
//         "dakshina kannada": 2917,
//         "davangere": 2913,
//         "dharwad": 2911,
//         "gulbarga": 2905,
//         "haasan": 2916,
//         "haveri": 2910,
//         "kolar": 2928,
//         "koppal": 2908,
//         "mandya": 2920,
//         "mysore": 2921,
//         "raichur": 2906,
//         "shimoga": 2914,
//         "tumkur": 2919,
//         "udupi chikmagalur": 2915,
//         "uttara kannada": 2912
//     },
//     "Kerala": {
//         "alappuzha": 3215,
//         "alathur": 3209,
//         "attingal": 3219,
//         "chalakudy": 3211,
//         "ernakulam": 3212,
//         "idukki": 3213,
//         "kannur": 3202,
//         "kasaragod": 3201,
//         "kollam": 3218,
//         "kottayam": 3214,
//         "kozhikode": 3205,
//         "malappuram": 3206,
//         "mavelikara": 3216,
//         "palakkad": 3208,
//         "pathanamthitta": 3217,
//         "ponnani": 3207,
//         "thiruvananthapuram": 3220,
//         "thrissur": 3210,
//         "vadakara": 3203,
//         "wayanad": 3204
//     },
//     "Ladakh": {
//         "ladakh": 104
//     },
//     "Lakshadweep": {
//         "lakshadweep": 3101
//     },
//     "Madhya Pradesh": {
//         "balaghat": 2315,
//         "betul": 2329,
//         "bhind": 2302,
//         "bhopal": 2319,
//         "chhindwara": 2316,
//         "damoh": 2307,
//         "dewas": 2321,
//         "dhar": 2325,
//         "guna": 2304,
//         "gwalior": 2303,
//         "hoshangabad": 2317,
//         "indore": 2326,
//         "jabalpur": 2313,
//         "khajuraho": 2308,
//         "khandwa": 2328,
//         "khargone": 2327,
//         "mandla": 2314,
//         "mandsour": 2323,
//         "morena": 2301,
//         "rajgarh": 2320,
//         "ratlam": 2324,
//         "rewa": 2310,
//         "sagar": 2305,
//         "satna": 2309,
//         "shahdol": 2312,
//         "sidhi": 2311,
//         "tikamgarh": 2306,
//         "ujjain": 2322,
//         "vidisha": 2318
//     },
//     "Maharashtra": {
//         "ahmednagar": 2737,
//         "akola": 2706,
//         "amravati": 2707,
//         "aurangabad": 2719,
//         "baramati": 2735,
//         "beed": 2739,
//         "bhandara gondiya": 2711,
//         "bhiwandi": 2723,
//         "buldhana": 2705,
//         "chandrapur": 2713,
//         "dhule": 2702,
//         "dindori": 2720,
//         "gadchiroli-chimur": 2712,
//         "hatkanangle": 2748,
//         "hingoli": 2715,
//         "jalgaon": 2703,
//         "jalna": 2718,
//         "kalyan": 2724,
//         "kolhapur": 2747,
//         "latur": 2741,
//         "madha": 2743,
//         "maval": 2733,
//         "mumbai north": 2726,
//         "mumbai north central": 2729,
//         "mumbai north east": 2728,
//         "mumbai north west": 2727,
//         "mumbai south": 2731,
//         "mumbai south central": 2730,
//         "nagpur": 2710,
//         "nanded": 2716,
//         "nandurbar": 2701,
//         "nashik": 2721,
//         "osmanabad": 2740,
//         "palghar": 2722,
//         "parbhani": 2717,
//         "pune": 2734,
//         "raigad": 2732,
//         "ramtek": 2709,
//         "ratnagiri - sindhudurg": 2746,
//         "raver": 2704,
//         "sangli": 2744,
//         "satara": 2745,
//         "shirdi": 2738,
//         "shirur": 2736,
//         "solapur": 2742,
//         "thane": 2725,
//         "wardha": 2708,
//         "yavatmal-washim": 2714
//     },
//     "Manipur": {
//         "inner manipur": 1401,
//         "outer manipur": 1402
//     },
//     "Meghalaya": {
//         "shillong": 1701,
//         "tura": 1702
//     },
//     "Mizoram": {
//         "mizoram": 1501
//     },
//     "Nagaland": {
//         "nagaland": 1301
//     },
//     "NCT OF Delhi": {
//         "chandni chowk": 701,
//         "east delhi": 703,
//         "new delhi": 704,
//         "north east delhi": 702,
//         "north west delhi": 705,
//         "south delhi": 707,
//         "west delhi": 706
//     },
//     "Odisha": {
//         "aska": 2119,
//         "balasore": 2106,
//         "bargarh": 2101,
//         "berhampur": 2120,
//         "bhadrak": 2107,
//         "bhubaneswar": 2118,
//         "bolangir": 2110,
//         "cuttack": 2114,
//         "dhenkanal": 2109,
//         "jagatsinghpur": 2116,
//         "jajpur": 2108,
//         "kalahandi": 2111,
//         "kandhamal": 2113,
//         "kendrapara": 2115,
//         "keonjhar": 2104,
//         "koraput": 2121,
//         "mayurbhanj": 2105,
//         "nabarangpur": 2112,
//         "puri": 2117,
//         "sambalpur": 2103,
//         "sundargarh": 2102
//     },
//     "Puducherry": {
//         "puducherry": 3401
//     },
//     "Punjab": {
//         "amritsar": 302,
//         "anandpur sahib": 306,
//         "bathinda": 311,
//         "faridkot": 309,
//         "fatehgarh sahib": 308,
//         "firozpur": 310,
//         "gurdaspur": 301,
//         "hoshiarpur": 305,
//         "jalandhar": 304,
//         "khadoor sahib": 303,
//         "ludhiana": 307,
//         "patiala": 313,
//         "sangrur": 312
//     },
//     "Rajasthan": {
//         "ajmer": 813,
//         "alwar": 808,
//         "banswara": 820,
//         "barmer": 817,
//         "bharatpur": 809,
//         "bhilwara": 823,
//         "bikaner": 802,
//         "chittorgarh": 821,
//         "churu": 803,
//         "dausa": 811,
//         "ganganagar": 801,
//         "jaipur": 807,
//         "jaipur rural": 806,
//         "jalore": 818,
//         "jhalawar-baran": 825,
//         "jhunjhunu": 804,
//         "jodhpur": 816,
//         "karauli-dholpur": 810,
//         "kota": 824,
//         "nagaur": 814,
//         "pali": 815,
//         "rajsamand": 822,
//         "sikar": 805,
//         "tonk-sawai madhopur": 812,
//         "udaipur": 819
//     },
//     "Sikkim": {
//         "sikkim": 1101
//     },
//     "Tamil Nadu": {
//         "arakkonam": 3307,
//         "arani": 3312,
//         "chennai central": 3304,
//         "chennai north": 3302,
//         "chennai south": 3303,
//         "chidambaram": 3327,
//         "coimbatore": 3320,
//         "cuddalore": 3326,
//         "dharmapuri": 3310,
//         "dindigul": 3322,
//         "erode": 3317,
//         "kallakurichi": 3314,
//         "kancheepuram": 3306,
//         "kanniyakumari": 3339,
//         "karur": 3323,
//         "krishnagiri": 3309,
//         "madurai": 3332,
//         "mayiladuthurai": 3328,
//         "nagapattinam": 3329,
//         "namakkal": 3316,
//         "nilgiris": 3319,
//         "perambalur": 3325,
//         "pollachi": 3321,
//         "ramanathapuram": 3335,
//         "salem": 3315,
//         "sivaganga": 3331,
//         "sriperumbudur": 3305,
//         "tenkasi": 3337,
//         "thanjavur": 3330,
//         "theni": 3333,
//         "thiruvallur": 3301,
//         "thoothukudi": 3336,
//         "tiruchirappalli": 3324,
//         "tirunelveli": 3338,
//         "tiruppur": 3318,
//         "tiruvannamalai": 3311,
//         "vellore": 3308,
//         "viluppuram": 3313,
//         "virudhunagar": 3334
//     },
//     "Telangana": {
//         "adilabad": 2801,
//         "bhongir": 2814,
//         "chevella": 2810,
//         "hyderabad": 2809,
//         "karimnagar": 2803,
//         "khammam": 2817,
//         "mahabubabad": 2816,
//         "mahabubnagar": 2811,
//         "malkajgiri": 2807,
//         "medak": 2806,
//         "nagarkurnool": 2812,
//         "nalgonda": 2813,
//         "nizamabad": 2804,
//         "peddapalle": 2802,
//         "secunderabad": 2808,
//         "warangal": 2815,
//         "zahirabad": 2805
//     },
//     "Tripura": {
//         "tripura east": 1602,
//         "tripura west": 1601
//     },
//     "Uttar Pradesh": {
//         "agra": 918,
//         "akbarpur": 944,
//         "aligarh": 915,
//         "allahabad": 952,
//         "ambedkar nagar": 955,
//         "amethi": 937,
//         "amroha": 909,
//         "aonla": 924,
//         "azamgarh": 969,
//         "badaun": 923,
//         "baghpat": 911,
//         "bahraich": 956,
//         "ballia": 972,
//         "banda": 948,
//         "bansgaon": 967,
//         "barabanki": 953,
//         "bareilly": 925,
//         "basti": 961,
//         "bhadohi": 978,
//         "bijnor": 904,
//         "bulandshahr": 914,
//         "chandauli": 976,
//         "deoria": 966,
//         "dhaurahra": 929,
//         "domariyaganj": 960,
//         "etah": 922,
//         "etawah": 941,
//         "faizabad": 954,
//         "farrukhabad": 940,
//         "fatehpur": 949,
//         "fatehpur sikri": 919,
//         "firozabad": 920,
//         "gautam buddha nagar": 913,
//         "ghaziabad": 912,
//         "ghazipur": 975,
//         "ghosi": 970,
//         "gonda": 959,
//         "gorakhpur": 964,
//         "hamirpur": 947,
//         "hardoi": 931,
//         "hathras": 916,
//         "jalaun": 945,
//         "jaunpur": 973,
//         "jhansi": 946,
//         "kairana": 902,
//         "kaiserganj": 957,
//         "kannauj": 942,
//         "kanpur": 943,
//         "kaushambi": 950,
//         "kheri": 928,
//         "kushi nagar": 965,
//         "lalganj": 968,
//         "lucknow": 935,
//         "machhlishahr": 974,
//         "maharajganj": 963,
//         "mainpuri": 921,
//         "mathura": 917,
//         "meerut": 910,
//         "mirzapur": 979,
//         "misrikh": 932,
//         "mohanlalganj": 934,
//         "moradabad": 906,
//         "muzaffarnagar": 903,
//         "nagina": 905,
//         "phulpur": 951,
//         "pilibhit": 926,
//         "pratapgarh": 939,
//         "rae bareli": 936,
//         "rampur": 907,
//         "robertsganj": 980,
//         "saharanpur": 901,
//         "salempur": 971,
//         "sambhal": 908,
//         "sant kabir nagar": 962,
//         "shahjahanpur": 927,
//         "shrawasti": 958,
//         "sitapur": 930,
//         "sultanpur": 938,
//         "unnao": 933,
//         "varanasi": 977
//     },
//     "Uttarakhand": {
//         "almora": 503,
//         "garhwal": 502,
//         "haridwar": 505,
//         "nainital-udhamsingh nagar": 504,
//         "tehri garhwal": 501
//     },
//     "West Bengal": {
//         "alipurduars": 1902,
//         "arambagh": 1929,
//         "asansol": 1940,
//         "baharampur": 1910,
//         "balurghat": 1906,
//         "bangaon": 1914,
//         "bankura": 1936,
//         "barasat": 1917,
//         "bardhaman durgapur": 1939,
//         "bardhaman purba": 1938,
//         "barrackpore": 1915,
//         "basirhat": 1918,
//         "birbhum": 1942,
//         "bishnupur": 1937,
//         "bolpur": 1941,
//         "cooch behar": 1901,
//         "darjeeling": 1904,
//         "diamond harbour": 1921,
//         "dum dum": 1916,
//         "ghatal": 1932,
//         "hooghly": 1928,
//         "howrah": 1925,
//         "jadavpur": 1922,
//         "jalpaiguri": 1903,
//         "jangipur": 1909,
//         "jaynagar": 1919,
//         "jhargram": 1933,
//         "kanthi": 1931,
//         "kolkata dakshin": 1923,
//         "kolkata uttar": 1924,
//         "krishnanagar": 1912,
//         "maldaha dakshin": 1908,
//         "maldaha uttar": 1907,
//         "mathurapur": 1920,
//         "medinipur": 1934,
//         "murshidabad": 1911,
//         "purulia": 1935,
//         "raiganj": 1905,
//         "ranaghat": 1913,
//         "srerampur": 1927,
//         "tamluk": 1930,
//         "uluberia": 1926
//     }
// };

// let count = 0;

//   fs.createReadStream('../csvdata/ConstituencyDetailedInfo.csv')
//   .pipe(csv({skipLines: 2}))
//   .on('data', (row) => {
//     const selectedColumns = {
//       cand_name:row['CANDIDATES NAME'],
//       const_name:row['PC NAME'].toLowerCase(),
//       votes: row["VOTES"],
//       state : row["STATE"]
//     };
//     let start = 0,end = selectedColumns.const_name.length;
//     for(let i= 0 ; i<selectedColumns.const_name.length ; i++){
//       if(selectedColumns.const_name.charAt(i)==" "){
//         start++;
//       }
//       else{
//         break;
//       }
//     }
//     for(let i = selectedColumns.const_name.length-1 ; i>=0 ; i++){
//       if(selectedColumns.const_name.charAt(i)==" "){
//         end--;
//       }
//       else{
//         break;
//       }
//     }
//     selectedColumns.const_name = selectedColumns.const_name.substring(start,end);
//     start = 0;
//     end = selectedColumns.state.length;
//     for(let i= 0 ; i<selectedColumns.state.length ; i++){
//       if(selectedColumns.state.charAt(i)==" "){
//         start++;
//       }
//       else{
//         break;
//       }
//     }
//     for(let i = selectedColumns.state.length-1 ; i>=0 ; i++){
//       if(selectedColumns.state.charAt(i)==" "){
//         end--;
//       }
//       else{
//         break;
//       }
//     }
//     selectedColumns.state = selectedColumns.state.substring(start,end);
//       if (selectedColumns.cand_name == "NOTA") {
//           const sql = 'INSERT INTO contests (cand_id, const_id,votes) VALUES (?, ?, ?)';
//           const values = ["cand8039",const_code[selectedColumns.state][selectedColumns.const_name], selectedColumns.votes];
//           if(selectedColumns.const_name == "ladakh"){
//             values[1] = 104;
//           }
//           connection.query(sql, values, (err, result) => {
//               if (err) {
//                   console.error('Error inserting row: ' + err.stack);
//                   return;
//               }
//               console.log('Row inserted with ID: ' + result.insertId);
//           });
//       }
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//      connection.end(); 
//   });



  
