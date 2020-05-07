import data from './data.js'

let sales2017 = data.cars.filter(c => c.purchase_date.includes('2017'))

// gross profit 2017
let profit = 0
for (let i = 0; i < sales2017.length; i++) {
    profit += sales2017[i].gross_profit
}

// counts how many of each repeated value is in an array, then creates an object with { value: timesRepeated } for each value
const dupeCounter = (array) => {
    let counts = {}
    array.forEach(i => {
        counts[i] = (counts[i] || 0) + 1;
    })
    return counts;
}

// returns the key with most repeated items in an object as a string
const findMostRepeatedItem = object => Object.entries(object).sort((a, b) => a[1] - b[1]).pop()[0]

// month in which most cars were sold
const monthlySales = dupeCounter(sales2017.flatMap(car => car.purchase_date).map(date => date.slice(5, 7)))
const bestMonth = findMostRepeatedItem(monthlySales);

// agent who sold most cars
const agents = dupeCounter(sales2017.map(car => car.sales_agent.first_name + ' ' + car.sales_agent.last_name))
const bestAgent = findMostRepeatedItem(agents);
