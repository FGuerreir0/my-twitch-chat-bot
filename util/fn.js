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


module.exports = { getcurrentdate, getJoke };