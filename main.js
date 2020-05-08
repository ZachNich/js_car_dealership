import data from './data.js'

// array with only sales from 2017
let sales2017 = data.cars.filter(c => c.purchase_date.includes('2017'))

// gross profit 2017
let profit = 0
for (let i = 0; i < sales2017.length; i++) {
    profit += sales2017[i].gross_profit
}
console.log('Gross Profit for 2017: ', profit);

// counts how many of each repeated value is in an array, then creates an object with { value: timesRepeated } for each value
const dupeCounter = (array) => {
    let counts = {}
    array.forEach(i => {
        counts[i] = (counts[i] || 0) + 1;
    })
    return counts;
}

// returns the key with most repeated items in an object as a string
const findHighestKeyValue = object => {
    let finalReturn = []
    const sorted = Object.entries(object).sort((a, b) => b[1] - a[1])
    const allMaxes = sorted.filter(array => array[1] == sorted[0][1])
    for (let i = 0; i < allMaxes.length; i++) {
        finalReturn.push(allMaxes[i][0])
    }
    return finalReturn;
}

// month in which most cars were sold
const monthlySales = dupeCounter(sales2017.flatMap(car => car.purchase_date).map(date => date.slice(5, 7)))
const bestMonth = findHighestKeyValue(monthlySales);
console.log('Monthly Sales: ', monthlySales);
console.log('Best Month: ', bestMonth);

// agent who sold most cars
const agents = dupeCounter(sales2017.map(car => car.sales_agent.first_name + ' ' + car.sales_agent.last_name))
const bestAgent = findHighestKeyValue(agents);
console.log('Agents and Amount of Cars Sold: ', agents);
console.log('Agent with Most Sales: ', bestAgent);

// agent who made most gross profit
const uniqueEmails = Array.from(new Set(sales2017.map((car => car.sales_agent.email))))
let agentSales = {}
for (let i = 0; i < sales2017.length; i++) {
    uniqueEmails.forEach(email => {
        if (email == sales2017[i].sales_agent.email) {
            agentSales[`${sales2017[i].sales_agent.first_name} ${sales2017[i].sales_agent.last_name}`] = (sales2017[i].gross_profit || 0) + sales2017[i].gross_profit;
        }
    })
}
console.log('Agents and Total Gross Profit: ', agentSales)
console.log('Highest Grossing Agent: ', findHighestKeyValue(agentSales))

// car model sold most
const modelsSold = dupeCounter(sales2017.map(sale => sale.vehicle.model))
const modelSoldMost = findHighestKeyValue(modelsSold)
console.log(modelsSold)
console.log(modelSoldMost)

// banks that provided most loans
const banks = dupeCounter(sales2017.map(sale => sale.credit.credit_provider))
const bankUsedMost = findHighestKeyValue(banks)
console.log('All Banks: ', banks)
console.log('Bank Used Most: ', bankUsedMost)