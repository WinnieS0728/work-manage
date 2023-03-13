const date_input = document.querySelector('#chose-day')

date_input.valueAsDate = new Date()

const confirmBtn = document.querySelector('button.confirm')
confirmBtn.addEventListener('click', upload)

const body = {
    "Sales": userName,
    "DayPoint": "",
    "Report": "",
    "id": "",
}

function upload() {
    const dayPoints = document.querySelectorAll('.main-content form .row #daily-point')
    const dayPointAry = [...dayPoints]
    // w.map(i => i.value).filter(i => i !== '');

    const reports = document.querySelectorAll('.main-content form .row #report')
    const reportAry = [...reports]
    // e.map(i => i.value).filter(i => i !== '');

    body.DayPoint = dayPointAry.map(i => i.value).filter(i => i !== '').join(',');
    // console.log(dayPointAry.map(i => i.value).filter(i => i !== '').join(','));
    body.Report = reportAry.map(i => i.value).filter(i => i !== '').join(',');

    async function go(body) {
        const res = await axios(
            {
                method: 'POST',
                url: 'https://orangeapi.orange-electronic.com/api/SalesDayWorkAdd',
                data: body
            });
        alert(res.data);
    }
    go(body)
}
