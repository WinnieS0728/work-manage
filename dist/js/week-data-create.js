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