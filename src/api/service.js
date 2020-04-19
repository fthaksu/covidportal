import axios from 'axios';
import moment from 'moment';

const getTurkeyData = async () => {
  const result = await axios(
    `https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json`
  );
  let turkeyData = result.data;

  let tasks = Object.values(turkeyData); //aldığımız data JSONObject, JSONarray değil. O yüzden Object.values kullanmak gerekiyor.
  tasks = tasks.map(item => {
    var res = item.date.split('/');
    item.date = res[1] + '-' + res[0] + '-' + res[2];
    //item.Date = moment(item.date).format("MMM Do");
    item.Date = res[0] + turkishMotnhFormatter(res[1]);

    //veri çekilen yerde bu değerler string olarak tanımlı, convert etmek gerekiyor!.
    item.Confirmed = Number.parseInt(item.totalCases);
    item.Recovered = Number.parseInt(item.totalRecovered);
    item.Deaths = Number.parseInt(item.totalDeaths);
    item.dailyConfirmed = Number.parseInt(item.cases);
    item.test = Number.parseInt(item.tests);
    item.testCaseRate = calculateRate(
      Number.parseInt(item.cases),
      Number.parseInt(item.tests)
    );
    item.caseDeathRate = calculateRate(
      Number.parseInt(item.totalDeaths),
      Number.parseInt(item.totalCases)
    );
    item.totalIntubated = Number.parseInt(item.totalIntubated);
    item.totalIntensiveCare = Number.parseInt(item.totalIntensiveCare);

    return item;
  });

  return tasks;
};

const getTurkeyStatsData = async () => {
  const result = await axios(
    `https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json`
  );
  let turkeyData = result.data;
  let yesterDayCritical = 0;
  let tasks = Object.values(turkeyData); //aldığımız data JSONObject, JSONarray değil. O yüzden Object.values kullanmak gerekiyor.
  tasks = tasks.map((item, index, arr) => {
    var res = item.date.split('/');
    index > 0
      ? (yesterDayCritical = arr[index - 1].totalIntensiveCare)
      : (yesterDayCritical = 0);
    item.date = res[1] + '-' + res[0] + '-' + res[2];
    //item.Date = moment(item.date).format("MMM Do");
    item.Date = res[0] + turkishMotnhFormatter(res[1]);

    //veri çekilen yerde bu değerler string olarak tanımlı, convert etmek gerekiyor!.
    item.testCaseRate = calculateRate(
      Number.parseInt(item.cases),
      Number.parseInt(item.tests)
    );
    item.todayRecovered = Number.parseInt(item.recovered);
    item.todayDeaths = Number.parseInt(item.deaths);
    item.todayCases = Number.parseInt(item.cases);
    item.todayTests = Number.parseInt(item.tests);
    item.todayCritical = Number.parseInt(
      item.totalIntensiveCare - yesterDayCritical
    );
    item.cases = Number.parseInt(item.totalCases);
    item.recovered = Number.parseInt(item.totalRecovered);
    item.deaths = Number.parseInt(item.totalDeaths);
    item.dailyConfirmed = Number.parseInt(item.cases);
    item.tests = Number.parseInt(item.totalTests);
    item.caseDeathRate = calculateRate(
      Number.parseInt(item.totalDeaths),
      Number.parseInt(item.totalCases)
    );
    item.totalIntubated = Number.parseInt(item.totalIntubated);
    item.critical = Number.parseInt(item.totalIntensiveCare);

    return item;
  });

  return tasks[tasks.length - 1];
};

const getWorldData = async country => {
  const result = await axios(
    `https://api.covid19api.com/total/dayone/country/${country}`
  );
  let worldData = result.data;
  worldData = worldData.map(item => {
    if (country === 'US') {
      item.Recovered = 67158;
    }
    item.Date = moment(item.Date).format('MMM Do');
    item.caseDeathRate = calculateRate(
      Number.parseInt(item.Deaths),
      Number.parseInt(item.Confirmed)
    );
    item.recoveryRate = calculateRate(
      Number.parseInt(item.Recovered),
      Number.parseInt(item.Confirmed)
    );
    return item;
  });
  return worldData;
};

const calculateRate = (num, totalNum) => {
  if (totalNum === 0) {
    return 0;
  }
  var num1 = parseInt(num);
  var num2 = parseInt(totalNum);
  var rate = (num1 / num2) * 100;
  return Math.round(rate * 1e2) / 1e2;
};

const turkishMotnhFormatter = month => {
  var monthname;
  switch (month) {
    case '01':
      monthname = ' Oca';
      break;
    case '02':
      monthname = ' Şub';
      break;
    case '03':
      monthname = ' Mar';
      break;
    case '04':
      monthname = ' Nis';
      break;
    case '05':
      monthname = ' May';
      break;
    case '06':
      monthname = ' Haz';
      break;
    case '07':
      monthname = ' Tem';
      break;
    case '08':
      monthname = ' Ağu';
      break;
    case '09':
      monthname = ' Eyl';
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
};

export { getTurkeyData, getWorldData, getTurkeyStatsData };
