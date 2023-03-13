const week = document.querySelector('input#week')

const today = new Date()
week.valueAsDate = today

const PPTfile = document.querySelector('input#PPT-file')
const MeetingFile = document.querySelector('input#meeting-file')

const getWeekData_body = {
    "Sales": userName
    , "Startdt": ""
    , "Enddt": ""
}
const inputWeek = document.querySelector('input#week')
inputWeek.addEventListener('change', () => {
    const date = inputWeek.valueAsDate
    getWeekData(date)
})

async function getWeekData(date) {
    const week_firstDay = new Date().setDate(date.getDate() - date.getDay() + 1)
    const week_lastDay = new Date().setDate(date.getDate() - date.getDay() + 7)
    getWeekData_body.Startdt = d3.timeFormat('%Y/%m/%d')(week_firstDay);
    getWeekData_body.Enddt = d3.timeFormat('%Y/%m/%d')(week_lastDay);

    const res = await axios({
        method: 'POST',
        url: 'https://orangeapi.orange-electronic.com/api/GetSalesWeekWork',
        data: getWeekData_body
    })
    const data = res.data
    console.log(data);

    const fileHistory = data.slice(-3).reverse()
    console.log(fileHistory);
    d3.select('#PPT .file-history')
        .selectAll('li p span')
        .data(fileHistory.map(i => i.CreateDate))
        .join(
            enter => enter.text(d => {
                return d.replace('上午','AM').replace('下午','PM')
            }),
            update => update.text(d => {
                return d.replace('上午','AM').replace('下午','PM')
            })
        )
    d3.select('#meeting-report .file-history')
        .selectAll('li p span')
        .data(fileHistory.map(i => i.CreateDate))
        .join(
            enter => enter.text(d => {
                return d.replace('上午','AM').replace('下午','PM')
            }),
            update => update.text(d => {
                return d.replace('上午','AM').replace('下午','PM')
            })
        )

    d3.select('#PPT .file-history')
        .selectAll('a')
        .data(fileHistory)
        .attr("href",d => d.PPtpatch)
        .attr("download",d => d.PPtName)
    d3.select('#meeting-report .file-history')
        .selectAll('a')
        .data(fileHistory)
        .attr("href",d => d.MeetPatch)
        .attr("download",d => d.MeetName)
}
getWeekData(today)

PPTfile.addEventListener('change', () => {
    // console.log(PPTfile.files[0].name);
    d3.select('label[for="PPT-file"] p')
        .text(PPTfile.files[0].name)
})
MeetingFile.addEventListener('change', () => {
    // console.log(MeetingFile.files[0].name);
    d3.select('label[for="meeting-file"] p')
        .text(MeetingFile.files[0].name)
})

const uploadPPT = document.querySelector('#PPT label button')
uploadPPT.addEventListener('click', () => {
    const file = PPTfile.files[0];
    if (!file) {
        return
    }
    upload(file)
})

const uploadFile_body = {
    "FormId": "", //單號
    "EmpId": EmpID, //員工工號
    "filename": "", //檔名
    "webName": 'wData_c', //那個頁面的命名
    "file": "" //檔案
}
async function upload(file) {
    uploadFile_body.filename = PPTfile.files[0].name;
    uploadFile_body.file = file;
    console.log(uploadFile_body);
    // const res = await axios({
    //     method: 'POST',
    //     url: 'https://orangeapi.orange-electronic.com/api/UploadFormData',
    //     data: uploadFile_body
    // })
}
