const date_input = document.querySelector('#chose-day')

date_input.valueAsDate = new Date()


let testAry = ['義大利優惠方案Flyer - 英文版翻譯','錄製OG操作教學','OSOM測試']

d3.select('.show-area form')
    .selectAll('.row #daily-point')
    .data(testAry)
    .join(
        enter => enter.attr("value",d => d),
        update => update.attr("value",d => d),
        exit => exit.attr("value",d => d)
    )
