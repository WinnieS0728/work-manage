async function setTable_total() {
    const today = new Date()
    let EndOfYear = new Date(`${today.getFullYear()},12,31`)
    // console.log(Math.ceil((EndOfYear-today)/(1000*60*60*24)));

    d3.select('.year-achievement .yearEnd-countdown span')
        .text(Math.ceil((EndOfYear - today) / (1000 * 60 * 60 * 24)));


    const data = await getSalesAPI()
    // console.log(Object.values(data).slice(1).map(i=>i.achievement).reduce((a,b)=>a+b,0));
    // console.log(Object.values(data).slice(1).map(i=>i.goal).reduce((a,b)=>a+b,0));
    const yearTotalSale = Object.values(data).slice(1).map(i => i.achievement).reduce((a, b) => a + b, 0)
    const yearTotalGoal = Object.values(data).slice(1).map(i => i.goal).reduce((a, b) => a + b, 0)

    d3.select('.year-achievement .total-sales span')
        .text(yearTotalSale.toLocaleString());
    d3.select('.year-achievement .unachieved-sales span')
        .text((yearTotalSale - yearTotalGoal).toLocaleString());
    d3.select('.year-achievement .success-rate span')
        .text(((yearTotalSale / yearTotalGoal * 100).toFixed(1)).toLocaleString());


}
// setTable_total()


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
        .attr("class", 'table-data color-number')
        .text(d => {
            if (d.achievement == 0) {
                return '-'
            }
            return (d.achievement - d.goal).toLocaleString()
        })

    function changeColor() {
        const colorNumber = document.querySelectorAll('.budget-target .table_gap .color-number')
        colorNumber.forEach(i => {
            // console.dir(i);
            if ((i.__data__.achievement - i.__data__.goal) <= 0) {
                i.classList.add('bad')
            }
        })
    }
    changeColor()
}
// setTable_sales()


async function setTable_salesByPlace() {
    const data = await getSalesByPlaceAPI()
    // console.log(data);


    function fill(place, i) {
        let salesByPlaceData = Object.values(Object.values(data)[i])
        salesByPlaceData.push(salesByPlaceData[1] + salesByPlaceData[2])
        if (salesByPlaceData[0]) {
            salesByPlaceData.push(salesByPlaceData[3] - salesByPlaceData[0])
        } else {
            salesByPlaceData.push('-')
        }
        let rate = salesByPlaceData[3] / salesByPlaceData[0] * 100
        if (salesByPlaceData[3] && salesByPlaceData[0]) {
            salesByPlaceData.push(rate.toFixed(2) + '%')
        } else {
            rate = 0
            salesByPlaceData.push('-')
        }

        d3.select(`.place-achievement .table_${place}`)
            .selectAll('.table-data')
            .data(salesByPlaceData)
            .enter()
            .append("td")
            .attr("class", 'table-data')
            .text(d => {
                if (d == 0) {
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
    totalData.push(totalData[1] + totalData[2])
    totalData.push(totalData[0] - totalData[3])
    totalData.push((totalData[3] / totalData[0] * 100).toFixed(1) + '%')

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


    function changeColor() {
        const colorNumbers = document.querySelectorAll('.place-achievement :is(tbody,tfoot) tr td:nth-of-type(6)')
        colorNumbers.forEach(i => {
            i.classList.add('color-number')
            if (i.__data__ <= 0) {
                i.classList.add('bad')
            }
        })
        const colorPercents = document.querySelectorAll('.place-achievement :is(tbody,tfoot) tr td:nth-of-type(7)')
        colorPercents.forEach(i => {
            i.classList.add('color-percent')
            if (Number(i.__data__.replace("%", '')) < 90) {
                i.classList.add('bad')
            }
            if (Number(i.__data__.replace("%", '')) > 100) {
                i.classList.add('good')
            }
        })
    }
    changeColor()
}
// setTable_salesByPlace()


async function setTable_mission() {
    const datas = await getMissionsAPI()

    // console.log(datas);

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
        // console.log(missionData);
        // console.log(index);
        d3.select('.mission-list .list-by-index tbody')
            .selectAll('tr')
            .data(missionData)
            .join(
                enter => enter.append("tr"),
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
                    update => update.attr("colspan", '0')
                        .text(d => d)
                )
        });
        function showAttachedIcon() {
            const attached = document.querySelectorAll('.mission-list .list-by-index tbody tr .table-data:last-child')
            attached.forEach(i => {
                if (i.textContent !== '') {
                    i.innerHTML = `
                    <a href="#" download="fileName">
                        <i class="fa-solid fa-floppy-disk"></i>
                    </a>`
                }
            })
        }
        showAttachedIcon()
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
// setTable_mission()


async function setTable_dailyReport() {
    let startTime = d3.timeFormat('%Y/%m/%d')(new Date());
    // console.log(startTime);
    d3.select('.daily-routine>h2 span')
        .text(startTime)

    let endTime = d3.timeFormat('%Y/%m/%d')(d3.timeParse('%Y/%m/%d')(startTime).setDate(d3.timeParse('%Y/%m/%d')(startTime).getDate() + 1))

    const body = {
        "Sales": ""
        , "Startdt": startTime
        , "Enddt": endTime
    }

    try {
        const res = await axios({
            method: 'POST',
            url: 'https://orangeapi.orange-electronic.com/api/GetSalesDayWork',
            data: body
        })

        const datas = res.data

        function setReportTable(data, member) {
            if (!data) {
                d3.select(`.daily-routine .report_${member} .daily-point`)
                    .append("p")
                    .text('資料未上傳')
                d3.select(`.daily-routine .report_${member} .daily-report`)
                    .append("p")
                    .text('資料未上傳')
                return
            }

            let dayPointAry = data.DayPoint.split(',').filter(i => i !== '')

            if (dayPointAry.length == 0) {
                d3.select(`.daily-routine .report_${member} .daily-point`)
                    .append("p")
                    .text('資料未上傳')
            }

            d3.select(`.daily-routine .report_${member} .daily-point`)
                .append('ol')
                .selectAll('li')
                .data(dayPointAry)
                .enter()
                .append("li")
                .text(d => d)

            let reportAry = data.Report.split(',').filter(i => i !== '')

            if (reportAry.length == 0) {
                d3.select(`.daily-routine .report_${member} .daily-report`)
                    .append("p")
                    .text('資料未上傳')
            }

            d3.select(`.daily-routine .report_${member} .daily-report`)
                .append("ol")
                .selectAll('li')
                .data(reportAry)
                .enter()
                .append("li")
                .text(d => d)
        }
        const David_data = datas.filter(i => i.Sales == 'David')
        setReportTable(David_data[David_data.length - 1], 'David')
        const Danise_data = datas.filter(i => i.Sales == 'Danise')
        setReportTable(Danise_data[Danise_data.length - 1], 'Danise')
        const Darie_data = datas.filter(i => i.Sales == 'Darie')
        setReportTable(Darie_data[Darie_data.length - 1], 'Darie')
        const Lorna_data = datas.filter(i => i.Sales == 'Lorna')
        setReportTable(Lorna_data[Lorna_data.length - 1], 'Lorna')
        const Rich_data = datas.filter(i => i.Sales == 'Rich')
        setReportTable(Rich_data[Rich_data.length - 1], 'Rich')
    } catch {
        console.log('每日任務無資料');
    }
}
setTable_dailyReport()


async function setTable_PPTandReport() {
    const today = new Date();
    const startDay = d3.timeFormat('%Y/%m/%d')(today.setDate(today.getDate() - today.getDay() + 1))
    const endDay = d3.timeFormat('%Y/%m/%d')(today.setDate(today.getDate() - today.getDay() + 7))
    // console.log(startDay, endDay);
    const body = {
        "Sales": ""
        , "Startdt": startDay
        , "Enddt": endDay
    }
    const res = await axios({
        method: 'POST',
        url: 'http://orangeapi.orange-electronic.com/api/GetSalesWeekWork',
        data: body
    })

    const datas = res.data;
    // console.log(datas);
    function showData(member) {
        if (datas.filter(i => i.Sales == member).length == 0) {
            d3.select(`.weeklyData_${member} .PPT`)
                .text('資料未上傳')
            d3.select(`.weeklyData_${member} .MeetingRecord`)
                .text('資料未上傳')
            return
        }
        const PPtName = datas.filter(i => i.Sales == member).map(i => i.PPtName).filter(i => i != '').slice(-1)
        const PPTlastTime = datas.filter(i => i.Sales == member).filter(i => i.PPtName !=
            '').slice(-1)[0].CreateDate.replace('上午', 'AM').replace('下午', 'PM').slice(0, -3)
        const PPtLink = datas.filter(i => i.Sales == member).map(i => i.PPtpatch).filter(i => i != '').slice(-1).map(i => `https://orangeapi.orange-electronic.com/api/Download?file=${i}`)

        const meetingName = datas.filter(i => i.Sales == member).slice(-1)[0].MeetName
        const MeetLastTime = datas.filter(i => i.Sales == member).filter(i => i.MeetName !=
            '').slice(-1)[0].CreateDate.replace('上午', 'AM').replace('下午', 'PM').slice(0, -3)
        const meetingLink = datas.filter(i => i.Sales == member).map(i => i.MeetPatch).filter(i => i != '').slice(-1).map(i => `https://orangeapi.orange-electronic.com/api/Download?file=${i}`)

        if (!PPtName) {
            d3.select(`.weeklyData_${member} .PPT`)
                .text('資料未上傳')
        } else {
            d3.select(`.weeklyData_${member} .PPT`)
                .html(`
            <span class="fileName">${PPtName}</span><br>
            最後更新 <span class="updateTime">${PPTlastTime}</span><br>
            <a href="${PPtLink}" download="${PPtName}">下載檔案</a>
            `)
        }
        if (!meetingName) {
            d3.select(`.weeklyData_${member} .MeetingRecord`)
                .text('資料未上傳')
        } else {
            d3.select(`.weeklyData_${member} .MeetingRecord`)
                .html(`
            <span class="fileName">${meetingName}</span><br>
            最後更新 <span class="updateTime">${MeetLastTime}</span><br>
            <a href="${meetingLink}" download="${meetingName}">下載檔案</a>
            `)
        }
    }
    showData('David')
    showData('Danise')
    showData('Darie')
    showData('Lorna')
    showData('Rich')
}
setTable_PPTandReport()

