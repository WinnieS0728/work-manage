const date_input = document.querySelector('#chose-day')

date_input.valueAsDate = new Date()
const qq = new Date()

date_input.addEventListener('change', showWorking)

const getWorking_body = {
    "Sales": ""
    , "Startdt": ""
    , "Enddt": ""
}

async function getWorking() {
    const res = await axios({
        method: 'POST',
        url: 'http://orangeapi.orange-electronic.com/api/GetSalesDayWork',
        data: getWorking_body
    })

    // console.log(res.data[res.data.length - 1]);
    return res.data[res.data.length - 1]
}

async function showWorking() {
    let startTime = date_input.value.replace(/-/g, '/');
    // console.log(startTime);

    let endTime = d3.timeFormat('%Y/%m/%d')(d3.timeParse('%Y/%m/%d')(startTime).setDate(d3.timeParse('%Y/%m/%d')(startTime).getDate() + 1))

    // console.log(endTime);
    getWorking_body.Sales = user;
    getWorking_body.Startdt = startTime;
    getWorking_body.Enddt = endTime;

    const datas = await getWorking()
    const dayPointAry = datas.DayPoint.split(',')


    d3.select('.main-content form')
        .selectAll('.row #daily-point')
        .data(dayPointAry)
        .join(
            enter => enter.attr("value", d => d),
            update => update.attr("value", d => d),
            exit => exit.attr("value", d => d)
        )

    const reportAry = datas.Report.split(',')

    d3.select('.main-content form')
        .selectAll('.row #report')
        .data(reportAry)
        .join(
            enter => enter.attr("value", d => d),
            update => update.attr("value", d => d),
            exit => exit.attr("value", d => d)
        )


}
showWorking()


// 

const confirmBtn = document.querySelector('button.confirm')
confirmBtn.addEventListener('click', upload)

const upload_body = {
    "Sales": "",
    "DayPoint": "",
    "Report": "",
    "id": "",
}

async function upload() {

    const dayPoints = document.querySelectorAll('.main-content form .row #daily-point')
    const dayPointAry = [...dayPoints]
    // w.map(i => i.value).filter(i => i !== '');

    const reports = document.querySelectorAll('.main-content form .row #report')
    const reportAry = [...reports]
    // e.map(i => i.value).filter(i => i !== '');

    const data = await getWorking()

    upload_body.id = data.id;
    upload_body.Sales = user;
    upload_body.DayPoint = dayPointAry.map(i => i.value).filter(i => i !== '').join(',');
    // console.log(dayPointAry.map(i => i.value).filter(i => i !== '').join(','));
    upload_body.Report = reportAry.map(i => i.value).filter(i => i !== '').join(',');
    // console.log(upload_body);
    async function go() {
        const res = await axios(
            {
                method: 'POST',
                url: 'http://orangeapi.orange-electronic.com/api/SalesDayWorkUpdate',
                data: upload_body
            });
        alert(res.data);
    }
    go()
}