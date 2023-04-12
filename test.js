const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];
const tableElement = document.getElementById("sales-table");

function CookieStand(
  locationName,
  minCustPerHour,
  maxCustPerHour,
  avgCookiePerSale
) {
  this.locationName = locationName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiePerSale = avgCookiePerSale;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailySales = 0;
}

CookieStand.prototype.calcCustomersEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(
      random(this.minCustPerHour, this.maxCustPerHour)
    );
  }
};

CookieStand.prototype.calcCookiesEachhour = function () {
  for (let i = 0; i < hours.length; i++) {
    const oneHour = Math.ceil(
      this.customersEachHour[i] * this.avgCookiePerSale
    );
    this.cookiesEachHour.push(oneHour);
    this.totalDailySales += oneHour;
  }
};

CookieStand.prototype.render = function () {
  this.calcCustomersEachHour();
  this.calcCookiesEachhour();
  const tableRow = document.createElement("tr");
  let tableDataElement = document.createElement("td");
  tableDataElement.textContent = this.locationName;
  tableRow.appendChild(tableDataElement);
  for (let i = 0; i < hours.length; i++) {
    tableDataElement = document.createElement("td");
    tableDataElement.textContent = this.cookiesEachHour[i];
    tableRow.appendChild(tableDataElement);
  }
  const tableHeader = document.createElement("th");
  tableHeader.textContent = this.totalDailySales;
  tableRow.appendChild(tableHeader);
  tableElement.appendChild(tableRow);
};

//ticked
let seattle = new CookieStand("Seattle", 23, 65, 6.3);
let tokyo = new CookieStand("Tokyo", 3, 24, 1.2);
let dubai = new CookieStand("Dubai", 11, 38, 3.7);
let paris = new CookieStand("Paris", 20, 38, 2.3);
let lima = new CookieStand("Lima", 2, 16, 4.6);

const allCookieStands = [seattle, tokyo, dubai, paris, lima];
// remove this
//state.allCookieStands.push(seattle, tokyo, dubai, paris, lima);

//ticked
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//replace all of this...
// function makeHeaderRow() {
//   const tableRow = document.createElement("tr");
//   let tableHeader = document.createElement("th");
//   tableHeader.textContent = "Locations";
//   tableRow.appendChild(tableHeader);
//   for (let i = 0; i < hours.length; i++) {
//     tableHeader = document.createElement("th");
//     tableHeader.textContent = hours[i];
//     tableRow.appendChild(tableHeader);
//   }
//   tableHeader = document.createElement("th");
//   tableHeader.textContent = "Location Totals";
//   tableRow.appendChild(tableHeader);
//   tableElement.appendChild(tableRow);
// }
//with

let tableRow = document.createElement("tr");
let th = document.createElement("th");
th.textContent = "Location";
tableRow.appendChild(th);

for (let i = 0; i < hours.length; i++) {
  th = document.createElement("th");
  th.textContent = hours[i];
  tableRow.appendChild(th);
}

th = document.createElement("th");
th.textContent = "Totals";
tableRow.appendChild(th);

tableElement.appendChild(tableRow);

for (let i = 0; i < allCookieStands.length; i++) {
  allCookieStands[i].render();
}

// function makeFooterRow() {
//   const tableRow = document.createElement("tr");
//   let tableHeader = document.createElement("th");
//   tableHeader.textContent = "Hourly Totals for All Locations";
//   tableRow.appendChild(tableHeader);
//   let totalOfTotals = 0;
//   for (let i = 0; i < hours.length; i++) {
//     let hourlyTotal = 0;
//     for (let j = 0; j < allCookieStands.length; j++) {
//       hourlyTotal += allCookieStands[j].cookiesEachHour[i];
//       totalOfTotals += allCookieStands[j].cookiesEachHour[i];
//     }
//     tableHeader = document.createElement("th");
//     tableHeader.textContent = hourlyTotal;
//     tableRow.appendChild(tableHeader);
//   }
//   tableHeader = document.createElement("th");
//   tableHeader.textContent = totalOfTotals;
//   tableRow.appendChild(tableHeader);
//   tableElement.appendChild(tableRow);
// }

const totalTR = document.createElement("tr");
function renderTotals() {
  // create a new th
  let totalTHHeading = document.createElement("th");

  // write something in the th and append it
  totalTHHeading.textContent = `Hourly Totals:`;
  totalTR.appendChild(totalTHHeading);
  let total = 0;
  for (let k = 0; k < hours.length; k++) {
    let hourlyTotal = 0;
    for (let i = 0; i < allCookieStands.length; i++) {
      hourlyTotal += allCookieStands[i].cookiesEachHour[k];
    }

    let totalTH = document.createElement("th");
    totalTH.textContent = hourlyTotal;
    totalTR.appendChild(totalTH);
    total += hourlyTotal;
  }
  let finalTotalTH = document.createElement("th");
  finalTotalTH.textContent = total;
  totalTR.appendChild(finalTotalTH);

  tableElement.appendChild(totalTR);
}

// function renderTable() {
//   makeHeaderRow();
//   for (let i = 0; i < allCookieStands.length; i++) {
//     allCookieStands[i].render();
//   }
//   makeFooterRow();
// }

// renderTable();

renderTotals();

// form

const cookieForm = document.getElementById("cookie-form");

cookieForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.newStoreName.value;
  const minCust = event.target.minCust.value;
  const maxCust = event.target.maxCust.value;
  const avgCookies = event.target.avgCookies.value;

  const newStore = new CookieStand(name, minCust, maxCust, avgCookies);

  totalTR.innerHTML = "";
  newStore.render();
  document.getElementById("new-store-name").value = "";
  document.getElementById("min-cust").value = "";
  document.getElementById("max-cust").value = "";
  document.getElementById("avg-cookies").value = "";
  renderTotals();
});
