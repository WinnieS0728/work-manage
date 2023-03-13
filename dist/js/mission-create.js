async function missionCreate() {
    d3.select('.formTitle .info .mission_creator span')
        .text(userName)

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

    // const filePackage = new FormData()
    const fileAry = []
    function pushList() {
        let files = Object.values(file.files);
        files.forEach(i => {
            fileAry.push(i);
        })
        console.log(fileAry);
        done.classList.remove('show');
        setTimeout(() => {
            done.classList.add('show');
        }, 1000);
    }

    function showList() {
        const filesNameAry = fileAry.map(i => i.name);
        // console.log(filesNameAry);
        if (filesNameAry.length == 0) {
            listTitle.classList.remove('show');
            done.classList.remove('show');
        } else {
            listTitle.classList.add('show');
        }

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

        const idBox = document.querySelectorAll('.fileInfo:not(:first-child) .id')
        for (let i = 0; i < fileAry.length; i++) {
            idBox[i].textContent = i + 1
        }

        const cancels = document.querySelectorAll('.fileInfo:not(:first-child) .delete button')
        cancels.forEach(i => {
            i.addEventListener('click', deleteFile)
        })
        function deleteFile() {
            let cancel_Btn = [...cancels]
            console.log(cancel_Btn.indexOf(this));
            fileAry.splice(cancel_Btn.indexOf(this), 1)
            showList()
        }
    }
}
missionCreate()