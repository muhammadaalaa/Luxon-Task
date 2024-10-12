/*
assumbtions:
- csv file contains data for persons
- birth date in the csv file formated as MM/DD/YYYY
- birth time formated as 12 hour (am, pm)

Task requirements:
- change the birth date format to match the person country format (as possible)
- calculate the age of the person in 1st October 2025
- add the calculated age to the person data
- create a paragraph from the formatted data
- save new data in a new file

*/

/**
    split the comming test each \n
    split each sentence every , 
    loop on each index 
        calculate the age 
        the format of every country 
 */

import { DateTime, Zone } from "luxon";
import * as fs from "fs";

let data = fs.readFileSync("./text.txt", { encoding: "utf-8", flag: "r" }); 
let newData =''// to get the code to the ide to be able to modify on this code
let splittedData = data.split("\n");

splittedData.forEach((item) => {
  let line = item.split(",");
  /**
     * [
  '1',
  'male',
  'Tawnya Grimwood',
  'tgrimwood0@123-reg.co.uk',
  '01/24/1981',
  '04:15 AM',
  'UZ',
  'Uzbekistan',
  'uz',
  'UTC+5\r'
]

=====indexes

[0]==>id
[1]==>gender
[2]==>fulName
[3]==>email
[4]==>dateOfBirth
[5]==>hour
[6]==>country code
[7]==>country
[8]==>langue
[9]==>time zone
     */

  // - birth date in the csv file formated as MM/DD/YYYY

  let datteOfBirth = DateTime.fromFormat(
    `${line[4]} ${line[5]}`,
    "MM/dd/yyyy t",
    { Zone: line[9] }
  );
  //   console.log(datteOfBirth);

  // localDateTime at each specific place
  let localDateTime = datteOfBirth
    .setLocale(`${line[8]}-${line[6]}`)
    .toLocaleString(DateTime.DATETIME_FULL);
  // age on coming october
  let ageOnOctober = DateTime.fromFormat(
    "2025-10-01 00:00:00",
    "yyyy-MM-dd hh:mm:ss",
    { zone: line[9].trim() }
  );
//   console.log(ageOnOctober);

  //   let ageOnOctober = DateTime.local(2025 - 10 - 1);

  let diff = ageOnOctober.diff(datteOfBirth, "year");
  //   console.log(diff);
  //TEMPLATE
  let g = line[1] == "male" ? "male" : "her";
  let templeate = `id with num ${line[0]} with name ${line[2]} is born in ${line[7]} on ${localDateTime} 
${g} age in october 2025 will be almost ${diff} years 
${g} contact info :${line[3]}
-------------------------\n`;

newData+=templeate
});
try {
  // console.log(newData);

  fs.writeFileSync("./newData.txt", newData, { encoding: "utf-8" });
  console.log("file created successfully ");
} catch (error) {
    console.log(error);
    
}


// [0]==>id
// [1]==>gender
// [2]==>fulName
// [3]==>email
// [4]==>dateOfBirth
// [5]==>hour
// [6]==>country code
// [7]==>country
// [8]==>langue
// [9]==>time zone
//      */
