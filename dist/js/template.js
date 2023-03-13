const EmpID = '221016'
const deptName = '業務部';
const userName = 'david';
d3.select('header #user .user-info .department')
    .text(deptName);
d3.select('header #user .user-info .name')
    .text(userName);

const navTitle = document.querySelectorAll('.nav-title')

navTitle.forEach((title) => {
    title.addEventListener('click', openNavList)
    title.addEventListener('click', changeTab_main)
})
function openNavList() {
    this.classList.toggle('open')
}


const navTags = document.querySelectorAll('.nav-tag');


navTags.forEach((tag) => {
    tag.addEventListener('click', navTagAction)
    tag.addEventListener('click', changeTab_sub)
})
function navTagAction() {
    navTags.forEach(tag => {
        tag.classList.remove('active')
    })
    this.classList.add('active')
}

const nowTab = document.querySelector('.nowTab')
const nowTab_main = nowTab.querySelector('.mainTab span');
const nowTab_sub = nowTab.querySelector('.subTab span');


function changeTab_main() {
    nowTab_main.innerText = this.innerText
}
function changeTab_sub() {
    nowTab_sub.innerText = this.innerText
}