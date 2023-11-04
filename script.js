
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    // console.log(data.ip);
    const IP = data.ip;
    const apihere = document.querySelector(".textIP"); // Note: I've added a '#' before 'textIP' assuming it's an element with an ID.
    apihere.innerHTML = `Your Current IP Address is ${data.ip}`;

    localStorage.setItem("mydata", IP)

  })
  .catch(error => {
    console.error("Error fetching data: " + error);
  });

//   const Next = (data) => {
//     console.log(data);
//   }
