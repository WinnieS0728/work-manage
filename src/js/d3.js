import { getSalesAPI, getSalesByPlaceAPI, getMissionsAPI, getDailyReportAPI, getPPTAPI, getMeetingRecordAPI } from './api.js'

async function setTable_sales() {
    const data = await getSalesAPI()

    // console.log(Object.values(data).slice(1));
    let salesData = Object.values(data).slice(1)
    // console.log({ salesData });

    d3.select('.budget-target .table_goal')
        .selectAll('.table-data')
        .data(salesData)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => d.goal.toLocaleString())


    d3.select('.budget-target .table_achieve')
        .selectAll('.table-data')
        .data(salesData)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => {
            if (d.achievement == 0) {
                return '-'
            }
            return d.achievement.toLocaleString()
        })

    d3.select('.budget-target .table_gap')
        .selectAll('.table-data')
        .data(salesData)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => {
            if (d.achievement == 0) {
                return '-'
            }
            return (d.achievement - d.goal).toLocaleString()
        })
}
setTable_sales()




async function setTable_salesByPlace() {
    const data = await getSalesByPlaceAPI()

    // console.log(data);
    function finalData(i) {
        let salesByPlaceData = Object.values(Object.values(data)[i]).slice(0, -1)
        salesByPlaceData.push(salesByPlaceData[0] - salesByPlaceData[1])
        salesByPlaceData.push((salesByPlaceData[1] / salesByPlaceData[0] * 100).toFixed(1) + '%')
        return salesByPlaceData
    }

    function fill(place, i) {
        const data = finalData(i)
        // console.log(data);
        d3.select(`.place-achievement .table_${place}`)
            .selectAll('.table-data')
            .data(data)
            .enter()
            .append("td")
            .attr("class", 'table-data')
            .text(d => {
                if (d == 0 || d == 'NaN%') {
                    return '-'
                }
                return d.toLocaleString()
            })
    }
    fill(`Europe_A`, 0)
    fill(`USA`, 1)
    fill(`Europe_B`, 2)
    fill(`Taiwan`, 3)
    fill(`Other`, 4)
    fill(`Japan`, 5)
    fill(`VIP`, 6)
    fill(`China`, 7)
    fill(`TaiwanOEM`, 8)


    let totalData = []
    totalData.push(Object.values(data).map(i => i.goal).reduce((a, b) => a + b, 0))
    totalData.push(Object.values(data).map(i => i.done).reduce((a, b) => a + b, 0))
    totalData.push(Object.values(data).map(i => i.work_on).reduce((a, b) => a + b, 0))
    totalData.push(Object.values(data).map(i => i.prediction).reduce((a, b) => a + b, 0))
    totalData.push(totalData[0] - totalData[1])
    totalData.push((totalData[1] / totalData[0] * 100).toFixed(1) + '%')

    // console.log(totalData);
    d3.select(`.place-achievement .table_Total`)
        .selectAll('.table-data')
        .data(totalData)
        .enter()
        .append("td")
        .attr("class", 'table-data')
        .text(d => {
            if (d == 0 || d == 'NaN%') {
                return '-'
            }
            return d.toLocaleString()
        })
}
setTable_salesByPlace()



async function setTable_mission() {
    const datas = await getMissionsAPI()

    console.log(datas);

    datas.forEach((data,i) => {
        console.log(Object.values(data));
        let a = Object.values(data).slice(0,-1)
        d3.select(`.list-by-index tbody tr`)
            .selectAll('td')
            .data(a)
            .join(
                enter => enter.text(d => {
                    if (d == ``) {
                        return '-'
                    }
                    return d
                }),
                update => update.text(d => {
                    if (d == ``) {
                        return '-'
                    }
                    return d
                })
            )
    });

}
setTable_mission()