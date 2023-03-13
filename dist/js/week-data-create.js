const week = document.querySelector('input#week')

const today = new Date()
week.valueAsDate = today

const uploadPPT = document.querySelector('input#PPT-file')
const uploadMeeting = document.querySelector('input#meeting-file')

uploadPPT.addEventListener('change', () => {
    console.log(uploadPPT.files[0].name);
    d3.select('label[for="PPT-file"] p')
        .text(uploadPPT.files[0].name)
})
uploadMeeting.addEventListener('change', () => {
    console.log(uploadMeeting.files[0].name);
    d3.select('label[for="meeting-file"] p')
        .text(uploadMeeting.files[0].name)
})

