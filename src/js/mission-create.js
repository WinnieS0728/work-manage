import { getMissionsAPI } from '../templates/js/_api.js'

async function missionCreate() {
    const datas = await getMissionsAPI();
    // console.log(datas);

    d3.select('.formTitle .info .mission_id span')
        .text(datas.length + 1)
    d3.select('.formTitle .info .mission_creator span')
        .text(user)

    const today = d3.timeFormat('%Y-%m-%d')(new Date())
    d3.select('.formTitle .info .mission_createDate span')
        .text(today)
}
missionCreate()