function shortenNumber(num) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

// There is a problem with this function
// It says both 5th and 6th month are july
function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4]));
}

function getTimeChange(date) {
	var presentTime = new Date(),
	presentYear = presentTime.getUTCFullYear(),
	presentMonth = presentTime.getUTCMonth(),
	presentDay = presentTime.getUTCDate(),
	presentHour = presentTime.getUTCHours(),
	presentMinute = presentTime.getUTCMinutes();
	
	var calcDate = parseISOString(date),	
	calcYear = calcDate.getUTCFullYear(),
	calcMonth = calcDate.getUTCMonth(),
	calcDay = calcDate.getUTCDate(),
	calcHour = calcDate.getUTCHours(),
	calcMinute = calcDate.getUTCMinutes();
	
	if (calcYear !== presentYear) {return String(presentYear - calcYear) + " Years"}
	if (calcMonth !== presentMonth) {return String(presentMonth - calcMonth) + " Months"}
	if (calcDay !== presentDay) {return String(presentDay - calcDay) + " Days"}
	if (calcHour !== presentHour) {return String(presentHour - calcHour) + " Hours"}
	return String(presentMinute - calcMinute) + " Minutes"
}

function getDurationObj(duration) {
	var durationP = duration.substring(duration.indexOf("P") + 1, duration.indexOf("T") - 1)
	if (durationP === "P") {durationP = "0"}
	
	var durationT = duration.substring(duration.indexOf("T") + 1	, duration.length)
	var durationH = durationT.substring(0, durationT.indexOf('H'))
	
	var durationM;
	if (durationH === "") {
		durationM = durationT.substring(0, durationT.indexOf('M'))
		durationH = "0"
	}
	else { durationM = durationT.substring(durationT.indexOf('H') + 1, durationT.indexOf('M')) }
	
	var durationS;
	if (durationM === "")  {
		durationS = durationT.substring(0, durationT.length - 1)
		durationM = "00"
	}
	else {durationS = durationT.substring(durationT.indexOf('M') + 1, durationT.length - 1)}
	if (durationS.length === 1) {durationS = "0" + durationS}
	if (isNaN(durationS)) {durationS = "00"}
	
	if (durationP !== "0") (durationH = String(Number(durationH) + Number(durationP) * 24))
	if (durationH !== "0" && durationM.length === 1) {durationM = "0" + durationM}
	
	var durationObj = {
			Hours: durationH,
			Minutes: durationM,
			Seconds: durationS,
		}

	return durationObj
}

function getRandomObjects(count, jsonObj) {

	var randomObjects = [];
	
	//Creating an array of objects in json
	let arr = Object.keys(jsonObj)
	
	//Creating a for loop for selecting specific number of objects
	for (let i=0; i< count; i++) {
		//Choosing a random element
		let randomEntry = arr[Math.floor(Math.random() * arr.length)]
		
		//Appending object to randomObjects array
		randomObjects = [...randomObjects, randomEntry]
		
		//Deleting chosen object from array in order to prevent selecting any object twice or more
		arr.splice(arr.indexOf(randomEntry), 1)
	}
	
	return randomObjects;
}


//Function for getting random elements from an array
//Works just like getRandomObjects function above

function getRandomElements(elementCount, array) {
	
	let returnArr = []
	let closureArr = array

	for (let i=0; i<elementCount; i++) {
		let randomElement = closureArr[Math.floor(Math.random() * (closureArr.length - 1))]
		returnArr = [...returnArr, randomElement]
		closureArr.splice(closureArr.indexOf(randomElement), 1)
	}
	
	return returnArr
}

export {shortenNumber, parseISOString, getTimeChange, getDurationObj, getRandomObjects, getRandomElements}
