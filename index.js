//onload
window.addEventListener('load', (event) => {
  console.log('page loaded');
});
//event delegation
const showData = document.querySelector('#show-data');
showData.addEventListener('click', e => {
  console.log('You are clicked on',e.target.innerHTML);
  alert('You are clicked item ID is '+e.target.id)
})

//fetch with async-await
async function fetchApiFromWeb() {
  //getting data from web
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  console.log(response);
  const data = await response.json();
  console.log(data);
  console.log('response.ok>> ' + response.ok);
  console.log('response.status>> ' + response.status);
  return data;
}
const userToDoList = (data) => {
  //empty array and obj
  const dataArray = [];
  const obj = {}
  //create obj property save the data and 
  //put obj as array element
  for (let i = 0; i < 10; i++) {
    obj.id = data[i].id;
    obj.task = data[i].title;
    dataArray[i] = { ...obj };
  }
  return dataArray;
}
//catch the async function
fetchApiFromWeb().then(data => {
  let userData=userToDoList(data);
  console.log(userData);
})
.catch(error => {
  console.log(error);
})
//axios
async function makeGetRequest() {
  let res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  console.log(res);
  let data = res.data;
  console.log('axios >>',userToDoList(data));
}
makeGetRequest();