// import { getMissionsAPI } from '../templates/js/_api.js'

async function missionCreate() {
    // const datas = await getMissionsAPI();
    // console.log(datas);

    // d3.select('.formTitle .info .mission_id span')
    //     .text(datas.length + 1)
    d3.select('.formTitle .info .mission_creator span')
        .text(user)

    const today = d3.timeFormat('%Y-%m-%d')(new Date())
    d3.select('.formTitle .info .mission_createDate span')
        .text(today)

    const file = document.querySelector('#mission_attach')
    const upload = document.querySelector('#file-confirm')
    const preview = document.querySelector('#file-preview')
    const done = document.querySelector('.upload-control .done')
    const listTitle = document.querySelector('.upload-list .fileInfo.title')


    upload.addEventListener('click', pushList)
    preview.addEventListener('click', showList)

    const files = []
    function pushList() {
        const fileItem = Object.values(file.files);
        // files.push(fileItem)
        console.log(fileItem);
        done.classList.add('show')
    }

    function showList() {
        const filesNameAry = Object.values(file.files).map(i => i.name);
        const filesIDAry = Object.keys(file.files);

        if (filesNameAry == 0) {
            return
        }
        listTitle.classList.add('show');

        d3.select('.upload-list')
            .selectAll('.fileInfo:not(:first-child)')
            .data(filesNameAry)
            .join(
                enter => enter.append("tr")
                    .attr("class", 'fileInfo')
                    .html(`
                    <td class="id"></td>
                    <td class="name"></td>
                    <td class="delete">
                        <button type="button"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `),
                update => update.html(`
                <td class="id"></td>
                <td class="name"></td>
                <td class="delete">
                    <button type="button"><i class="fa-solid fa-trash"></i></button>
                </td>
            `),
                exit => exit.remove()
            )

        d3.select('.upload-list')
            .selectAll('.fileInfo:not(:first-child) .name')
            .data(filesNameAry)
            .text(d => d)
        d3.select('.upload-list')
            .selectAll('.fileInfo:not(:first-child) .id')
            .data(filesIDAry)
            .text(d => Number(d) + 1)

    }
}
missionCreate()