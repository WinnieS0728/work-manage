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

    let fileList=[]

    const uploadConfirm = document.querySelectorAll('#file-confirm')


    const a = document.querySelectorAll('#mission_attach')
    const b = document.querySelectorAll('#mission_upload-attach')

    a.forEach(i =>{
        i.addEventListener('change',()=>{
            
        })
    })

    uploadConfirm.forEach(i => {
        i.addEventListener('click', ()=>{
            fileList.push('1')
            console.log(fileList);
        })
    })
}
missionCreate()