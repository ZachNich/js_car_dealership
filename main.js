import data from './data.js'

let sales2017 = data.cars.filter(c => c.purchase_date.includes('2017'))

// gross profit 2017

let profit = 0
for (let i = 0; i < sales2017.length; i++) {
    profit += sales2017[i].gross_profit
}

// month in which most cars were sold
let bestMonth = 0;
const monthlySales = sales2017.flatMap(car => car.purchase_date).map(date => date.slice(5, 7)).reduce((a, b) => {
    a[b] = (a[b] || 0) + 1; 
    return a
}, {})
for (let i = 0; i < Object.keys(monthlySales).length; i++) {
    if (i === 0 || Object.keys(monthlySales)[i - 1] < Object.keys(monthlySales)[i]) {
        bestMonth = Object.keys(monthlySales)[i];
    }
}

// counts how many of each repeated value is in an array, then creates an object with { value: timesRepeated } for each value

const dupeCounter = (array) => {
    let counts = {}
    array.forEach(i => {
        counts[i] = (counts[i] || 0) + 1;
    })
    return counts;
}

// returns the key most repeated item in an object as a string

const findMostRepeatedItem = (object, emptyVariable) => {
    for (let i = 0; i < Object.keys(object).length; i++) {
        if (i === 0 || Object.keys(object)[i - 1] < Object.keys(object)[i]) {
            emptyVariable = Object.keys(object)[i];
        }
    }    
}

// agent who sold most cars

let bestAgent = ''

const agents = dupeCounter(sales2017.map(car => car.sales_agent.first_name + ' ' + car.sales_agent.last_name))

console.log(findMostRepeatedItem(agents, bestAgent));
