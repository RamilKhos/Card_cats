
// Генератор разметки основной страницы

function generateCardHTML(obj) {
    return `
        <div data-card_id='${obj.id}' class="col">
            <div class="card shadow p-3 bg-body rounded">
            <img src="${obj.img_link}" class="card-img-top rounded" alt="${obj.name}">
            <div class="card-body text-center">
                <h3 class="card-title">${obj.name}</h3>
            </div>
            <div class="stars d-flex justify-content-center gap-3">
                ${'<i class="star fa-solid fa-star"></i>'.repeat(obj.rate) + '<i class="star fa-regular fa-star"></i>'.repeat(10 - obj.rate)}
            </div>
            <div class="text-center pt-3 fs-3">
                <button data-action='show' class="fa-solid fa-circle-info text-primary me-3"></button>
                <button data-action='edit' class="fa-regular fa-pen-to-square text-success"></button>
                <button data-action='delete' class="fa-solid fa-trash text-danger ms-3"></button>
            </div>
            </div>
        </div>
        `      
}


// Генератор разметки модалки - просмотра отдельной карточки 

function generateShowCardHTML(obj) {
    return `
        <div class="card mb-3 border-0">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${obj.img_link}" class="img-fluid rounded-start" alt="${obj.name} width="100" height="100">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">ID: ${obj.id}</h4>
                        <h4 class="card-title">Name: ${obj.name}</h4>
                        <h4 class="card-title">Age: ${obj.age}</h4>
                        <p class="card-text fs-5">Description: ${obj.description}</p>
                        <div class="stars d-flex gap-3">
                            <h4 class="card-title">Rate: ${'<i class="star fa-solid fa-star"></i>'.repeat(obj.rate) + '<i class="star fa-regular fa-star"></i>'.repeat(10 - obj.rate)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}


export {
    generateCardHTML,
    generateShowCardHTML,
}