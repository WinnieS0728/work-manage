const week = document.querySelector('input#week')

const today = new Date()
week.valueAsDate = today

const PPTfile = document.querySelector('input#PPT-file')
const MeetingFile = document.querySelector('input#meeting-file')

PPTfile.addEventListener('change', () => {
    // console.log(PPTfile.files[0].name);
    d3.select('label[for="PPT-file"] p')
        .text(PPTfile.files[0].name)
})
MeetingFile.addEventListener('change', () => {
    console.log(MeetingFile.files[0].name);
    d3.select('label[for="meeting-file"] p')
        .text(MeetingFile.files[0].name)
})

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
        data: getWeekData_body,
    })
    const data = res.data
    console.log(data);


    const PPTfileHistory = data.filter(i => i.PPtName != '').slice(-3).reverse()
    // console.log(PPTfileHistory);
    d3.select('#PPT .file-history')
        .selectAll('li p.fileName')
        .data(PPTfileHistory.map(i => i.PPtName))
        .join(
            enter => enter.text(d => {
                if (d == '') {
                    return '檔案未上傳'
                }
                return d
            }),
            update => update.text(d => {
                if (d == '') {
                    return '檔案未上傳'
                }
                return d
            })
        )
    d3.select('#PPT .file-history')
        .selectAll('li p.lastUpdate')
        .data(PPTfileHistory.map(i => i.CreateDate))
        .join(
            enter => enter.text(d => {
                return d.replace('上午', 'AM').replace('下午', 'PM')
            }),
            update => update.text(d => {
                return d.replace('上午', 'AM').replace('下午', 'PM')
            })
        )

    const MeetFileHistory = data.filter(i => i.MeetName != '').slice(-3).reverse()
    console.log(MeetFileHistory);
    d3.select('#meeting-report .file-history')
        .selectAll('li p.fileName')
        .data(MeetFileHistory.map(i => i.MeetName))
        .join(
            enter => enter.text(d => {
                if (d == '') {
                    return '檔案未上傳'
                }
                return d
            }),
            update => update.text(d => {
                if (d == '') {
                    return '檔案未上傳'
                }
                return d
            })
        )
    d3.select('#meeting-report .file-history')
        .selectAll('li p.lastUpdate')
        .data(MeetFileHistory.map(i => i.CreateDate))
        .join(
            enter => enter.text(d => {
                return d.replace('上午', 'AM').replace('下午', 'PM')
            }),
            update => update.text(d => {
                return d.replace('上午', 'AM').replace('下午', 'PM')
            })
        )



    let PPThistoryPath = PPTfileHistory.map(i => i.PPtpatch).map(i => `https://orangeapi.orange-electronic.com/api/Download?file=${i}`);
    // console.log(PPThistoryPath);
    d3.select('#PPT .file-history')
        .selectAll('a')
        .data(PPThistoryPath)
        .attr("href", d => d)

    d3.select('#PPT .file-history')
        .selectAll('a')
        .data(PPTfileHistory)
        .attr("download", d => d.PPtName)

    let meetHistoryPath = MeetFileHistory.map(i => i.MeetPatch).map(i => `https://orangeapi.orange-electronic.com/api/Download?file=${i}`);

    d3.select('#meeting-report .file-history')
        .selectAll('a')
        .data(meetHistoryPath)
        .attr("href", d => d)

    d3.select('#meeting-report .file-history')
        .selectAll('a')
        .data(MeetFileHistory)
        .attr("download", d => d.MeetName)
}
getWeekData(today)

const filesBody = {
    "Sales": userName//業務
    , "PPtName": ""//會議ppt檔名
    , "PPtpatch": "" //會議ppt路徑
    , "MeetName": ""//會議記錄檔名
    , "MeetPatch": ""//會議記錄路徑
    , "id": ""//主keyid
}
const uploadPPT = document.querySelector('#PPT label button')
uploadPPT.addEventListener('click', async () => {
    const file = PPTfile.files[0];
    if (!file) {
        return
    }
    const path = await getPath(file)

    filesBody.PPtName = file.name
    filesBody.PPtpatch = path

    console.log(filesBody);
    alert('上傳成功')
})

const uploadMeet = document.querySelector('#meeting-report label button')
uploadMeet.addEventListener('click', async () => {
    const file = MeetingFile.files[0];
    if (!file) {
        return
    }
    const path = await getPath(file)

    filesBody.MeetName = file.name
    filesBody.MeetPatch = path

    console.log(filesBody);
    alert('上傳成功')
})

async function getPath(file) {
    const filePackage = new FormData()
    filePackage.append('FormId', 'wData' + Date.now())
    filePackage.append('EmpId', EmpID)
    filePackage.append('filename', file.name)
    filePackage.append('webName', 'wData')
    filePackage.append('file', file)
    const uploadRes = await axios({
        method: 'POST',
        url: 'https://orangeapi.orange-electronic.com/api/UploadFormData',
        data: filePackage
    });
    console.log(uploadRes.data);
    console.log(filePackage.get('FormId'))
    const body = {
        "FileId": ""//附檔編號
        , "FileName": "" //附檔名稱
        , "FilePath": "" //附檔存放路徑 //ReportFile
        , "WebName": "wData" //附檔所在網頁名稱
        , "WebID": filePackage.get('FormId')//附檔所在 對應表單表編號ID
        , "ExecID": ""
    }
    console.log(body);
    const res = await axios({
        method: 'POST',
        url: 'https://orangeapi.orange-electronic.com/api/GetWFP',
        data: body
    });
    const path = res.data[0].FilePath
    return path
}


const confirmBtn = document.querySelector('.confirm_btns .confirm')

confirmBtn.addEventListener('click', async () => {
    console.log(filesBody);
    const res = await axios({
        method: 'POST',
        url: 'http://orangeapi.orange-electronic.com/api/SalesWeekWorkAdd',
        data: filesBody
    })
    alert(res.data)
})
