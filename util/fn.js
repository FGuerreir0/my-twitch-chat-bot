const pointsList = require('../data/points.json');

function  getcurrentdate(){
  let currentdate = new Date();
  let datetime = currentdate.getDate() + (currentdate.getMonth()+1) + currentdate.getFullYear()  
  return datetime;
}

function getJoke(oneLinerJoke){
  try{
    let getRandomJoke = oneLinerJoke.getRandomJoke({'exclude_tags': ['dirty', 'racist', 'insults', 'sex', 'sexual', 'women', 'men', 'flirty', 'rude', 'christian']});
    console.log(getRandomJoke.tags);
    let joke = getRandomJoke.body
    return joke;
  }catch(err){
    console.error(err);
  }
}

function getLeaderboard(){
  const top3 = Object.entries(pointsList)
              .sort(([, value1], [, value2]) => value2 - value1)
              .slice(0, 3)
              .map((user, index) => `${index + 1}. ${user[0]} (${user[1]} pontos)`)
              .join(' | ');

  return top3;
}

module.exports = { getcurrentdate, getJoke, getLeaderboard };