// import { api } from '/API.js';
// import { generateCardHTML , generateShowCardHTML } from '/generate_cards.js';
// import { generateFormEditCard } from './generate_form.js'


const $wr = document.querySelector('[data-wr]')                                       // див основной разметки                  
const $modalWr = document.querySelector('[data-modalWr]')                             // модалка для формы добавить кота
                 
const $formAddCat = document.querySelector('[data-form]')                                  
const $form = document.forms.form                                                    
const $btnAddInForm = document.querySelector('[data-btnAdd]')
const $btnClosedForm = document.querySelector('[data-btnClosedForm]')

const $modalShowCat = document.querySelector('[data-modalShowCat]') 
const $modalShowInner = document.querySelector('[data-modalShowInner]')                 
const $btnClosedShowModal = document.querySelector('[data-btnClosedShowModal]')


const basicURL = 'http://sb-cats.herokuapp.com/api/2/RamilKhos'

class API {
    constructor (basicURL){
        this.basicURL = basicURL
    }

    async getAllCats() {
        try {
            const responseGetAll = await fetch(`${this.basicURL}/show`)
            return responseGetAll.json()
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteCard(cardId){
        try {
            const responseDelete = await fetch(`${this.basicURL}/delete/${cardId}`, {
                method: 'DELETE',
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOnecat(cardId) {
        try {
            const responseGetOne = await fetch(`${basicURL}/show/${cardId}`)
            return responseGetOne.json()
        } catch (error) {
            throw new Error(error)
        }
    }

    async addCat(obj) {
        try {
            const responseAdd = await fetch(`${this.basicURL}/add`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj),
            })  
        } catch (error) {
            throw new Error(error)
        }
    }

    async editCard(cardId, obj) {
        try {
            const responseEdit = await fetch(`${basicURL}/update/${cardId}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj),
                }
            ) 
            // return responseEdit.json()
        } catch (error) {
            throw new Error(error)
        }
    }
}
        
const api = new API (basicURL)



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



// Генерирует форму для редактирования карточки
function generateFormEditCard() {
    return `
        <form data-form_edit_card name="formEditCard">
            <div class="mb-3">
                <label>ID
                    <input type="text" name="id" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ID" required>
                </label>
            </div>

            <div class="mb-3">
                <label>Age
                    <input type="number" name="age" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Age" min="0" required>
                </label>  
            </div>

            <div class="mb-3">
                <label>Name
                    <input type="text" name="name" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" required>
                </label>
            </div>

            <div class="mb-3">
                <label>Rate
                    <input type="number" name="rate" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Rate" min="0" max="10" required>
                </label>
            </div>

            <div class="mb-3">
                <label>Favourite
                    <select class="form-control" name="favourite" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                        <option disabled selected>Favourite</option>
                        <option>Yes</option>
                        <option>No</option>>
                    </select>
                </label>
            </div>

            <div class="mb-3">
                <label>Img link
                    <input type="text" name="img_link" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Img link" required>
                </label>
            </div> 

            <div class="mb-3">
                <label>Description
                    <textarea name="description" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" cols="21" rows="3" required></textarea>
                </label>
            </div>

            <div class="d-flex justify-content-center">
                <button data-btnSubmit class="btn btn-primary">Submit</button>
            </div>
        </form>
    `
}



//Сгенерировать разметку с котами на главную страницу
api.getAllCats()
    .then((serverData) => {
        serverData.data.forEach(elem => {
            $wr.insertAdjacentHTML("beforeend", generateCardHTML(elem))
        });
    })
    .catch(() => {}
    )



// Удалить карточку / Показать подробнее / Редактировать
$wr.addEventListener('click', (event) => {
    const $divCard_id = event.target.closest('[data-card_id]')  
    const cardId = $divCard_id.dataset.card_id                  
    const btnAction = event.target.dataset.action              

    switch (btnAction) {

// Удалить
        case 'delete':
            api.deleteCard(cardId)
                .then(() => {
                    $divCard_id.remove()
            }).catch(alert)
            break
        
// Показать подробнее
        case 'show':
            api.getOnecat(cardId)
                .then((obj) => {
                    $modalShowCat.classList.remove("hidden")
                    $modalShowInner.insertAdjacentHTML("beforeend", generateShowCardHTML(obj.data))
                }).catch(alert)
                break

// Редактировать
        case 'edit':
            $modalShowCat.classList.remove("hidden")
            $modalShowInner.insertAdjacentHTML('beforeend', generateFormEditCard())

            const $formEditCard = document.forms.formEditCard

            api.getOnecat(cardId)
                .then((responseObj) => {
                    $formEditCard.id.disabled = true 
                    responseObj.data.favourite ? responseObj.data.favourite = "Yes" : responseObj.data.favourite = "No"

                    const arrayFromKeysObj = Object.keys(responseObj.data).sort().splice(2)
                    arrayFromKeysObj.forEach(elem => {
                        $formEditCard[elem].value = responseObj.data[elem] 
                    })

                }).catch((err) => {
                    console.error(err)
                })

                $formEditCard.addEventListener('input', (event) => {
                    const contentObj = Object.fromEntries(new FormData($formEditCard).entries())
                    contentObj.age = +contentObj.age
                    contentObj.rate = +contentObj.rate
                    contentObj.favourite = contentObj.favourite === 'Yes'

                    $formEditCard.addEventListener("submit", (event) => {
                        event.preventDefault()
                        api.editCard(cardId, contentObj)
                            .then(() => {
                                window.location.reload();
                            })
                    })
                })

            break
    }
})



// Форма - добавить в БД и на страницу
$form.addEventListener("submit", (event) => {
    event.preventDefault()

    const dataFromFormObj = Object.fromEntries(new FormData($form).entries())
    dataFromFormObj.id = +dataFromFormObj.id
    dataFromFormObj.age = +dataFromFormObj.age
    dataFromFormObj.rate = +dataFromFormObj.rate
    dataFromFormObj.favourite = dataFromFormObj.favourite === 'Yes'

    api.addCat(dataFromFormObj)
    .then(() => {      
        $wr.insertAdjacentHTML("beforeend", generateCardHTML(dataFromFormObj))
        $modalWr.classList.add("hidden")
        $form.reset()
        document.body.style.overflowY = ''
    })
    .catch(err => {
        console.error(err)
    })

    } 
)



// Открыть модалку формы (add)
$btnAddInForm.addEventListener("click", () => {
    document.body.style.overflowY = 'hidden'
    $modalWr.classList.remove("hidden")
})



// Закрыть модалку формы (add)
$btnClosedForm.addEventListener('click', (event) => {
    event.preventDefault()
    document.body.style.overflowY = ''
    $modalWr.classList.add("hidden")
})



// Закрыть модалку Show
$btnClosedShowModal.addEventListener('click', (event) => {
    document.body.style.overflowY = ''
    $modalShowCat.classList.add("hidden")
    $modalShowInner.replaceChildren()
})



// Сохранение данных формы в LS
const nameForm = $formAddCat.localName                 

$form.addEventListener('input', (event) => {
    const contentObj = Object.fromEntries(new FormData($formAddCat).entries())         
    localStorage.setItem(nameForm, JSON.stringify(contentObj))                          
})



// Получение данных из LS 
const rawContentGetLS = localStorage.getItem(nameForm)                                  // Данные из LS в виде строки
const contentFromLSObj = rawContentGetLS ? JSON.parse(rawContentGetLS) : undefined      // Если есть, то преобразование в объект

if(contentFromLSObj){
    const arrayFromKeysObj = Object.keys(contentFromLSObj)                              // Массив из ключей объекта
    arrayFromKeysObj.forEach(elem => {
        $form[elem].value = contentFromLSObj[elem]                                      // Значение поля input = значению ключа объекта              
    })
}

