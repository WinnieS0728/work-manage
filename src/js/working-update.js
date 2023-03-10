const date_input = document.querySelector('#chose-day')
console.log(1);
date_input.valueAsDate = new Date()

d3.select('.show-area form')
    .selectAll('.row #daily-point')
    .data(testAry)
    .join(
        enter => enter.attr("value", d => d),
        update => update.attr("value", d => d),
        exit => exit.attr("value", d => d)
    )

const confirmBtn = document.querySelector('button.confirm')
confirmBtn.addEventListener('click', upload)

const body = {
    "Sales": "",
    "DayPoint": "",
    "Report": "",
    "id": "",
}

function upload() {
    const dayPoints = document.querySelectorAll('.show-area form .row #daily-point')
    const dayPointAry = [...dayPoints]
    // w.map(i => i.value).filter(i => i !== '');

    const reports = document.querySelectorAll('.show-area form .row #report')
    const reportAry = [...reports]
    // e.map(i => i.value).filter(i => i !== '');

    // body.Sales = user;
    body.DayPoint = dayPointAry.map(i => i.value).filter(i => i !== '').join(',');
    // console.log(dayPointAry.map(i => i.value).filter(i => i !== '').join(','));
    body.Report = reportAry.map(i => i.value).filter(i => i !== '').join(',');

    async function gg(body) {
        const res = await axios(
            {
                method: 'POST',
                url: 'http://orangeapi.orange-electronic.com/api/SalesDayWorkAdd',
                data: body
            });
        alert(res.data);
    }
    gg(body)
}
