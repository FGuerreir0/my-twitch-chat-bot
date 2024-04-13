function  getcurrentdate(){
  let currentdate = new Date();
  let datetime = currentdate.getDate() + (currentdate.getMonth()+1) + currentdate.getFullYear()  
  return datetime;

}
/*
function getRandomItem() {
  let jokes = ['dad', 'Chuck Norris'];
  return jokes[Math.floor(Math.random() * jokes.length)];
}*/

function getJoke(oneLinerJoke){
  try{
    let getRandomJoke = oneLinerJoke.getRandomJoke({'exclude_tags': ['dirty', 'racist', 'insults', 'sex', 'sexual', 'women', 'men', 'flirty']});
    console.log(getRandomJoke.tags);
    let joke = getRandomJoke.body
    return joke;
  }catch(err){
    console.error(err);
  }
}


module.exports = { getcurrentdate, getJoke };