import { salesData } from './api.js'

async function getData_goal() {
    const res = await salesData(2022);
    const data = res.data
    // console.log(typeof(data[0].data[0].goal));
    let a = data[0].data
    console.log(a);
    let goal = a.map(item => item.goal.toLocaleString())
    console.log(goal);
    d3.select('#goal')
        .selectAll('.table-data')
        .data(goal)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => d)

    let achieve = a.map(item => item.achievement.toLocaleString())
    console.log(achieve);
    d3.select('#achieve')
        .selectAll('.table-data')
        .data(achieve)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => {
            if (d == '0') {
                return '-'
            }
            return d
        })

    let minus = a.map(item => (item.goal - item.achievement).toLocaleString())
    console.log(minus);
    d3.select('#minus')
        .selectAll('.table-data')
        .data(minus)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => d)
}
getData_goal()