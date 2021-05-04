import axios from 'axios';
import moment from 'moment';


const getTurkeyData = async () => {
    const result = await axios(`https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json`);
    let turkeyData = result.data;

    let tasks = Object.values(turkeyData); //JSONObject to JSONArray. Object.values -> get an object values.
    tasks = tasks.map((item) => {
        var res = item.date.split("/");
        item.date = res[1] + "-" + res[0] + "-" + res[2];
        //item.Date = moment(item.date).format("MMM Do");
        item.Date = (res[0] + turkishMotnhFormatter(res[1]));

        //Datas all are string, must convert numbers
        item.Confirmed = Number.parseInt(item.totalPatients);
        item.Recovered = Number.parseInt(item.totalRecovered);
        item.Deaths = Number.parseInt(item.totalDeaths);
        item.dailyConfirmed = Number.parseInt(item.cases);
        item.test = Number.parseInt(item.tests);
        item.testCaseRate = calculateRate(Number.parseInt(item.cases), Number.parseInt(item.tests));
        item.caseDeathRate = calculateRate(Number.parseInt(item.totalDeaths), Number.parseInt(item.totalPatients));
        item.totalIntubated = Number.parseInt(item.totalIntubated);
        item.totalIntensiveCare = Number.parseInt(item.totalIntensiveCare);

        return item;
    });

    return tasks;
};


const getTurkeyStatsData = async () => {
    const result = await axios(`https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json`);
    let turkeyData = result.data;
    let yesterDayCritical = 0;
    let tasks = Object.values(turkeyData); //JSONObject to JSONArray. Object.values -> get an object values.
    tasks = tasks.map((item, index, arr) => {
        var res = item.date.split("/");
        index > 0 ? yesterDayCritical = arr[index - 1].totalIntensiveCare : yesterDayCritical = 0;
        item.date = res[1] + "-" + res[0] + "-" + res[2];
        //item.Date = moment(item.date).format("MMM Do");
        item.Date = (res[0] + turkishMotnhFormatter(res[1]));

        //Datas all are string, must convert numbers
        item.testCaseRate = calculateRate(Number.parseInt(item.cases), Number.parseInt(item.tests));
        item.todayRecovered = Number.parseInt(item.recovered);
        item.todayDeaths = Number.parseInt(item.deaths);
        item.todayCases = Number.parseInt(item.cases);
        item.todayTests = Number.parseInt(item.tests);
        item.todayCritical = Number.parseInt(item.totalIntensiveCare - yesterDayCritical);
        item.cases = Number.parseInt(item.totalCases);
        item.recovered = Number.parseInt(item.totalRecovered);
        item.deaths = Number.parseInt(item.totalDeaths);
        item.dailyConfirmed = Number.parseInt(item.cases);
        item.tests = Number.parseInt(item.totalTests);
        item.caseDeathRate = calculateRate(Number.parseInt(item.totalDeaths), Number.parseInt(item.totalCases));
        item.totalIntubated = Number.parseInt(item.totalIntubated);
        item.critical = Number.parseInt(item.totalIntensiveCare);


        return item;
    });

    return tasks[tasks.length - 1];
};


const getWorldData = async (country) => {
    let usRecoveryArr;

    if (!country) {
        return [];
    }
    const result = await axios(`https://api.covid19api.com/total/dayone/country/${country}`);

    if (country ===  "US") { //US does not share recovery data to JH, the data is getting available source
        let usResult = await axios('https://corona.lmao.ninja/v2/historical/US?lastdays=100');
        let usResultData = usResult.data;
        usRecoveryArr = Object.values(usResultData.timeline.recovered);
    }
    
    let worldData = result.data;
    worldData = worldData.map((item, index, arr) => {
        if (country ===  "US" && usRecoveryArr) {
            item.Recovered = usRecoveryArr[index + 1];
        }
        item.Date = moment(item.Date).format("MMM Do");
        item.caseDeathRate = calculateRate(Number.parseInt(item.Deaths), Number.parseInt(item.Confirmed));
        item.recoveryRate = calculateRate(Number.parseInt(item.Recovered), Number.parseInt(item.Confirmed));

        if (index > 0) {
            if(item.Recovered === 0){
                    item.Recovered =  arr[index - 1].Recovered;
            }
            if(item.Deaths === 0){
                item.Deaths = arr[index - 1].Deaths;
            }
            if(item.Confirmed === 0){
                item.Confirmed = arr[index - 1].Confirmed;
            }

            item.dailyConfirmed = item.Confirmed - arr[index - 1].Confirmed;
            item.deaths = item.Deaths - arr[index - 1].Deaths;
            item.recovered = item.Recovered - arr[index - 1].Recovered;
        }

        return item;
    });
    return worldData;
};


const getCompareData = async (country1, country2) => {
    if (!country1 && !country2) {
        return [];
    }
    const result = await axios(`https://corona.lmao.ninja/v2/countries/${country1},${country2}`);
    let compareData = result.data;
    return compareData;
};

const getHistoricalData = async (country1, country2) => {
    if (!country1 && !country2) {
        return [];
    }
    const result = await axios(`https://corona.lmao.ninja/v2/historical/${country1},${country2}?lastdays=all`);
    let historyData = result.data;
    let activeGraphArray = [];
    let deathGraphArray = [];
    let recoveredGraphArray = [];
    let activeArray = [];
    let recoveryArray = [];
    let deathArray = [];

    historyData.forEach( (item, index) => {
        activeGraphArray.push(item.timeline.cases)
    } )

    historyData.forEach( (item, index) => {
        deathGraphArray.push(item.timeline.deaths)
    } )

    historyData.forEach( (item, index) => {
        recoveredGraphArray.push(item.timeline.recovered)
    } )

    let graphArray1 = activeGraphArray[0];
    let graphArray2 = activeGraphArray[1];

    Object.entries(graphArray1).forEach(  ([key,value]) => {
        var res = key.split("/");
        var date = res[1] + "." + res[0] + "." + res[2];
        activeArray.push({ "date":date, "country1" : value, "country2": graphArray2[key] !== undefined ? graphArray2[key] :0 })
    })

    graphArray1 = deathGraphArray[0];
    graphArray2 = deathGraphArray[1];

    Object.entries(graphArray1).forEach(  ([key,value]) => {
        var res = key.split("/");
        var date = res[1] + "." + res[0] + "." + res[2];
        deathArray.push({ "date":date, "country1" : value, "country2": graphArray2[key] !== undefined ? graphArray2[key] :0 })
    })


    graphArray1 = recoveredGraphArray[0];
    graphArray2 = recoveredGraphArray[1];

    Object.entries(graphArray1).forEach(  ([key,value]) => {
        var res = key.split("/");
        var date = res[1] + "." + res[0] + "." + res[2];
        recoveryArray.push({ "date":date, "country1" : value, "country2": graphArray2[key] !== undefined ? graphArray2[key] :0 })
    })
    
    return {activeArray, deathArray, recoveryArray};
};


const calculateRate = (num, totalNum) => {
    if (totalNum ===  0) {
        return 0;
    }
    var num1 = parseInt(num);
    var num2 = parseInt(totalNum);
    var rate = (num1 / num2) * 100
    return (Math.round(rate * 1e2) / 1e2)
}

const turkishMotnhFormatter = (month) => {
    var monthname;
    switch (month) {
        case "01":
            monthname = " Oca";
            break;
        case "02":
            monthname = " Şub";
            break;
        case "03":
            monthname = " Mar";
            break;
        case "04":
            monthname = " Nis";
            break;
        case "05":
            monthname = " May";
            break;
        case "06":
            monthname = " Haz";
            break;
        case "07":
            monthname = " Tem";
            break;
        case "08":
            monthname = " Ağu";
            break;
        case "09":
            monthname = " Eyl";
            break;
        case '10':
            monthname = ' Eki';
            break;
        case '11':
            monthname = ' Kas';
            break;
        case '12':
            monthname = ' Ara';
            break;
        default:
            monthname = ' Oca';
            break;
    }
    return monthname;
}


export { getTurkeyData, getWorldData, getTurkeyStatsData, getCompareData, getHistoricalData };
