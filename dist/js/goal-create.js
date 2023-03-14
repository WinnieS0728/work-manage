const numbers = document.querySelectorAll('article.main-content .year [id^=goal_]')

console.log(numbers);


numbers.forEach(i => {
    i.addEventListener('change', () => {
        i.type = 'text'
        i.value = Number(i.value).toLocaleString()
    })
})