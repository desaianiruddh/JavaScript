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
        surName: 'Desai',
        age: 21,
        city: 'Surat'
      }
      //if get customer data
      resolve(`Customer Name : ${cName} ${cData1.surName}\nAge : ${cData1.age}\nCity : ${cData1.city}`);
      //failed to getting customer data
      reject(`Data not found for ${cName}`);
    }, 2000);

  })
}
//promise consume
//promise success
promiseObj.then((cName) => {
  console.log('Successfully fetch data from server\nCustomer List : ' + cName);
  return customerData(cName[0]);
}).then((data) => {
  console.log(data);
})
  //if promise failed
  .catch((error) => {
    console.log(error);
  })
  //finally function
  .finally(() => {
    console.log('Successfully get data from server');
  });