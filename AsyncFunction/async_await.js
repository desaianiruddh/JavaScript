//get customer list (Promise Produce)
//Promises Constructor
const promiseObj = new Promise((resolve, reject) => {
  setTimeout(() => {
    const customerName = ['Ani', 'Mahesh', 'Kishan', 'Urvish']; //suppose we take data from server
    //if successfully get data from server
    resolve(customerName);
    //if server can't respond and not gettting data
    reject('Can not get data from Database');
  }, 2000);
})
//other data about customer
//promise as object
const customerData = (cName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cData1 = {
        sName: 'Desai',
        age: 21,
        city: 'Surat'
      }
      //if get customer data
      resolve(`Customer Name : ${cName} ${cData1.sName}\nAge : ${cData1.age}\nCity : ${cData1.city}`);
      //failed to getting customer data
      reject(`Data not found for ${cName}`);
    }, 2000);

  })
}
//async_await for consume promises
async function getdata() {
  //for error handling
  try {
    const customer = await promiseObj;
    console.log(customer);
    const cData = await customerData(customer[0])
    console.log(cData);
  }
  //catch the error
  catch(error){
    console.log(error);
  }
}
getdata();