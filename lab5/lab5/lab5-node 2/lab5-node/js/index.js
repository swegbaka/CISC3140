$.ajax({
    url: 'http://127.0.0.1:3000/car',
    type: 'get',
    success(data) {
        console.log('data:', data)
        renderData(data)
    },
})

const renderData = (data) => {
    $('#tableBody').empty()
    let template = ''
    data.forEach(row => {
        template += `
        <tr>
        <td>${row.carId}</td>
        <td>${row.year}</td>
        <td>${row.make}</td>
        <td>${row.model}</td>
        <td>${row.rankingTotalScore}</td>
        <td>${row.owner.name}</td>
        <td>${row.owner.email}</td>
        </tr>`
    })
    $('#tableBody').append($(template))
}

$('#searchButton').click(() => { 
    let carId = Number($('#carId').val())
    search(carId)
})

const search = (carId) => {
    $.ajax({
        url: `http://127.0.0.1:3000/car/${carId}`,
        type: 'get',
        success(data) {
            let template = `<tr>
                <td>${data.carId}</td>
                <td>${data.year}</td>
                <td>${data.make}</td>
                <td>${data.model}</td>
                <td>${data.rankingTotalScore}</td>
                <td>${data.owner.name}</td>
                <td>${data.owner.email}</td>
                </tr>`
            $('#tableBody').empty()
            $('#tableBody').append($(template))
        },
    })
}