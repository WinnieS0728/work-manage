// 業績
const salesRequest = axios.create({
    baseURL: 'https://private-aded43-bee3054.apiary-mock.com/api/achievements?'
})

async function getSales(year) {
    const res = await salesRequest.get(`year=${year}`);
    // console.log('總業績', res.data);
    return res.data.result
}



export const getSalesAPI = getSales

// --------------------------------------------------------------------------------------------------------

// 地區
const salesByPlaceRequest = axios.create({
    baseURL: 'https://private-aded43-bee3054.apiary-mock.com/api/salesByPlace?'
})

async function getSalesByPlace(year) {
    const res = await salesByPlaceRequest.get(`year=${year}`);
    // console.log('地區業績', res.data);
    return res.data.result
}







export const getSalesByPlaceAPI = getSalesByPlace

// --------------------------------------------------------------------------------------------------------

// 任務
const missionsRequest = axios.create({
    baseURL: 'https://private-aded43-bee3054.apiary-mock.com/api/missions?'
})

async function getMissions() {
    const res = await missionsRequest.get()
    // console.log('任務', res.data);
    return res.data.result
}





export const getMissionsAPI = getMissions


// --------------------------------------------------------------------------------------------------------

// 每日回報
const daily_reportRequest = axios.create({
    baseURL: 'https://private-aded43-bee3054.apiary-mock.com/api/dailyReport?'
})

async function getDailyReport(day, sales) {
    const res = await daily_reportRequest.get(`day=${day}&sales${sales}`)
    // console.log('每日報告', res.data);
    return res.data.result
}



export const getDailyReportAPI = getDailyReport


// --------------------------------------------------------------------------------------------------------

// 每週PPT
const PPTrequest = axios.create({
    baseURL: 'https://private-aded43-bee3054.apiary-mock.com/api/weekilyWork?'
})

async function getPPT(week) {
    const res = await PPTrequest.get(`week=${week}`)
    // console.log('每周PPT', res.data);
    return res.data.result
}





export const getPPTAPI = getPPT

// --------------------------------------------------------------------------------------------------------

// 會議紀錄
const meetingRecordRequest = axios.create({
    baseURL: 'https://private-aded43-bee3054.apiary-mock.com/api/meetingRecord?'
})

async function getMeetingRecord() {
    const res = await meetingRecordRequest.get()
    // console.log('會議記錄', res.data);
    return res.data.result
}



export const getMeetingRecordAPI = getMeetingRecord



