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

    const dayFormat = d3.timeFormat('%Y-%m-%d')
    const today = dayFormat(new Date())


    const mission_New = datas.filter(i => i.start_day == today)
    // console.log(mission_New);
    d3.select('.mission-dashboard .new-mission p:last-child')
        .text(mission_New.length)

    const mission_onDuty = datas.filter(i => i.state == 0 || i.state == 1)
    // console.log(mission_onDuty);
    d3.select('.mission-dashboard .mission-on-duty p:last-child')
        .text(mission_onDuty.length)

    const mission_complete = datas.filter(i => i.state == 2)
    // console.log(mission_complete);
    d3.select('.mission-dashboard .mission-complete p:last-child')
        .text(mission_complete.length)


    d3.select('.mission-dashboard .total-mission p:last-child')
        .text(datas.length)


    const mission_successRate = (mission_complete.length / datas.length * 100).toFixed(0)
    // console.log(mission_successRate);
    d3.select('.mission-dashboard .success-rate p:last-child')
        .text(mission_successRate)


    const mission_from_Morris = datas.filter(i => i.mission_from == 'Morris')
    // console.log(mission_from_Morris);
    d3.select('.mission-dashboard .mission-from-morris p:last-child')
        .text(mission_from_Morris.length)

    const mission_from_Aliber = datas.filter(i => i.mission_from == 'Aliber')
    // console.log(mission_from_Aliber);
    d3.select('.mission-dashboard .mission-from-aliber p:last-child')
        .text(mission_from_Aliber.length)


    let index = 0
    let missionData_reverse = datas.reverse()

    function setMissionList() {
        let missionData = missionData_reverse.slice(index, index + 10)
        console.log(missionData);
        console.log(index);
        d3.select('.mission-list .list-by-index tbody')
            .selectAll('tr')
            .data(missionData)
            .join(
                enter => enter.append("tr")
            )

        missionData.forEach((data, i) => {
            // console.log(Object.values(data));
            let ary = Object.values(data).slice(0, -1)
            ary[6] = '``' ? ary[6] = '' : ary[6]
            ary[7] = '``' ? ary[7] = '' : ary[7]

            d3.select(`.mission-list .list-by-index tbody tr:nth-of-type(${i + 1})`)
                .selectAll('td')
                .data(ary)
                .join(
                    enter => enter.append("td")
                        .attr("class", 'table-data')
                        .text(d => d),
                    update => update.text(d => d)
                )
        });
    }
    setMissionList()

    const index_backward = document.querySelector('button.index_backward')
    const index_forward = document.querySelector('button.index_forward')

    index_backward.addEventListener('click', () => {
        if (index <= 0) {
            return
        }
        index = index - 10;
        setMissionList()
    })
    index_forward.addEventListener('click', () => {
        if (index + 10 >= datas.length) {
            return
        }
        index = index + 10;
        setMissionList()
    })

    const mission_for_David = []
    const mission_for_Danise = []
    const mission_for_Darie = []
    const mission_for_Lorna = []
    const mission_for_Rich = []

    function setMemberTable(ary, member) {
        ary.push(mission_New.filter(i => i.principal == member).length)
        ary.push(mission_onDuty.filter(i => i.principal == member).length)
        ary.push(mission_complete.filter(i => i.principal == member).length)
        ary.push(datas.filter(i => i.principal == member).length)
        let percent = ary[2] / ary[3] * 100
        percent ? percent : percent = 0
        ary.push(percent + '%')
        ary.push(mission_from_Morris.filter(i => i.principal == member).length)
        ary.push(mission_from_Aliber.filter(i => i.principal == member).length)

        d3.select(`.mission-list .list-by-member .mission_to_${member}`)
            .selectAll('.table-data')
            .data(ary)
            .enter()
            .append("td")
            .attr("class", 'table-data')
            .text(d => d)
    }

    setMemberTable(mission_for_David, 'David')
    setMemberTable(mission_for_Danise, 'Danise')
    setMemberTable(mission_for_Darie, 'Darie')
    setMemberTable(mission_for_Lorna, 'Lorna')
    setMemberTable(mission_for_Rich, 'Rich')
}
setTable_mission()




async function setTable_dailyReport() {
    const datas = await getDailyReportAPI()
    // console.log(datas);

    function setReportTable(ary, member) {
        if (ary.day_point.length == 0) {
            d3.select(`.daily-routine .report_${member} .daily-point`)
                .append("p")
                .text('資料未上傳')
        }

        d3.select(`.daily-routine .report_${member} .daily-point`)
            .append('ol')
            .selectAll('li')
            .data(ary.day_point)
            .enter()
            .append("li")
            .text(d => d)

        console.log();

        const report_title = ary.report.map(i => i.title)
        const report_state = ary.report.map(i => {
            if (i.state == 0) {
                return '(待續)'
            }
            return '(完成)'
        })

        for (let i = 0; i < report_title.length; i++) {
            report_title[i] = report_title[i] + report_state[i]
        }

        // console.log(report_title);
        if (ary.report.length == 0) {
            d3.select(`.daily-routine .report_${member} .daily-report`)
                .append("p")
                .text('資料未上傳')
        }

        d3.select(`.daily-routine .report_${member} .daily-report`)
            .append("ol")
            .selectAll('li')
            .data(report_title)
            .enter()
            .append("li")
            .text(d => d)
    }
    const report_David = datas.David
    setReportTable(report_David, 'David')
    const report_Danise = datas.Danise
    setReportTable(report_Danise, 'Danise')
    const report_Darie = datas.Darie
    setReportTable(report_Darie, 'Darie')
    const report_Lorna = datas.Lorna
    setReportTable(report_Lorna, 'Lorna')
    const report_Rich = datas.Rich
    setReportTable(report_Rich, 'Rich')

}
setTable_dailyReport()


async function setTable_PPTandReport() {
    const PPTdatas = await getPPTAPI()
    // console.log(PPTdatas);

    const meetingRecordData = await getMeetingRecordAPI()
    // console.log(meetingRecordData);


    function fill(PPTary, meetingAry, member) {

        d3.select(`.weekly-data .weeklyData_${member} .PPT .fileName`)
            .text(PPTary.file_name)
        d3.select(`.weekly-data .weeklyData_${member} .PPT .updateTime`)
            .text(PPTary.uploadTime)

        if (PPTary.file_name == '``') {
            d3.select(`.weekly-data .weeklyData_${member} .PPT`)
                .html("<p>資料未上傳</p>")
        }
        d3.select(`.weekly-data .weeklyData_${member} .PPT a`)
            .attr("href", `${PPTary.file_path}`)
        d3.select(`.weekly-data .weeklyData_${member} .PPT a`)
            .attr("download", `${PPTary.file_name}`)


        d3.select(`.weekly-data .weeklyData_${member} .MeetingRecord .fileName`)
            .text(meetingAry.file_name)
        d3.select(`.weekly-data .weeklyData_${member} .MeetingRecord .updateTime`)
            .text(meetingAry.uploadTime)
        if (meetingAry.file_name == '``') {
            d3.select(`.weekly-data .weeklyData_${member} .MeetingRecord`)
                .html("<p>資料未上傳</p>")
        }
        d3.select(`.weekly-data .weeklyData_${member} .MeetingRecord a`)
            .attr("href", `${meetingAry.file_path}`)
        d3.select(`.weekly-data .weeklyData_${member} .MeetingRecord a`)
            .attr("download", `${meetingAry.file_name}`)

    }

    const PPTData_David = PPTdatas.David
    const meetingData_David = meetingRecordData.David
    fill(PPTData_David, meetingData_David, 'David')
    const PPTData_Danise = PPTdatas.Danise
    const meetingData_Danise = meetingRecordData.Danise
    fill(PPTData_Danise, meetingData_Danise, 'Danise')
    const PPTData_Darie = PPTdatas.Darie
    const meetingData_Darie = meetingRecordData.Darie
    fill(PPTData_Darie, meetingData_Darie, 'Darie')
    const PPTData_Lorna = PPTdatas.Lorna
    const meetingData_Lorna = meetingRecordData.Lorna
    fill(PPTData_Lorna, meetingData_Lorna, 'Lorna')
    const PPTData_Rich = PPTdatas.Rich
    const meetingData_Rich = meetingRecordData.Rich
    fill(PPTData_Rich, meetingData_Rich, 'Rich')
}
setTable_PPTandReport()