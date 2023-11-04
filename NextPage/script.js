const ipAddress = localStorage.getItem("mydata");
const inputarr = [];

fetchIPInformation(ipAddress)

function fetchIPInformation(ipAddress) {
    const apiUrl = `https://ipapi.co/${ipAddress}/json/`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            firstRow(data)
            mapApply(data)
            moreInfo(data)
            pinCode(data)
        })
        .catch(error => {
            console.error("Error fetching IP information:", error);
        });

}

const firstRow = (data) => {
    const ipadds = document.querySelector(".ipaddress");
    ipadds.innerHTML = `IP ADDRESS : ${data.ip}`

    const row1 = document.querySelector(".row1");
    row1.innerHTML = `<div> <h1>Lat: ${data.latitude}</h1><h1>Long: ${data.longitude}</h1></div>
    <div><h1>City: ${data.city}</h1><h1>Region: ${data.region}</h1></div>
    <div><h1>Organisation: ${data.org}</h1><h1>Hostname: Samiksha</h1></div>`
}


const mapApply = (data) => {

    const mapimg = document.querySelector(".row2")
    mapimg.innerHTML = `<h1>Your Current Location</h1>
    <iframe
    src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&z=15&output=embed"
    width="80%" height="667" frameborder="0" style="border:0">
    </iframe>`

}
const moreInfo = (data) => {

    // datetime in "America/Chicago" timezone in the "en-US" locale
    let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });


    const Info = document.querySelector("#info");
    Info.innerHTML = `
    <div class="info">
    <h1>Time Zone: ${data.timezone}</h1>
    <h1>Date And Time: ${chicago_datetime_str}</h1>
    <h1>Pincode: ${data.postal}</h1>
    <h1 id="msg"></h1>
    </div>`
}

const msg = (massage) => {
    const massag = document.querySelector("#msg");
    massag.innerHTML = `Massage ${massage}:`
}

const pinCode = (data) => {
    const apiUrl = `https://api.postalpincode.in/pincode/${data.postal}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(pinCode => {
            const massage = pinCode[0].Message;
            msg(massage)

            const postoffices = pinCode[0].PostOffice;
            officeCode(postoffices);

        })
        .catch(error => {
            console.error("Error fetching IP information:", error);
        });
}
const officeCode = (postoffices) => {
    for (let i = 0; i < postoffices.length; i++) {

        const postOfficeCode = postoffices[i]
        inputarr.push(postOfficeCode);

        const cardContainer = document.querySelector(".row5");
        cardContainer.innerHTML += ` <div class="card">
        <h1>Name : ${postOfficeCode.Name}</h1>
        <h1>Branch Type : ${postOfficeCode.BranchType}</h1>
        <h1>Delivery Status : ${postOfficeCode.DeliveryStatus}</h1>
        <h1>District : ${postOfficeCode.District}</h1>
        <h1>Division : ${postOfficeCode.Division}</h1>
        </div>`


        //Search Bar

        
    }
}

const searchInput = document.querySelector(".searchInput");
// console.log(inputarr);

searchInput.addEventListener('input', (e) => {
    const val = e.target.value;

    inputarr.map((currElem) => {
        console.log(currElem)
    })
});