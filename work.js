import { api } from '/API.js';
import { generateCardHTML , generateShowCardHTML } from '/generate_cards.js';
import { generateFormEditCard } from './generate_form.js'


const $wr = document.querySelector('[data-wr]')                                       // див основной разметки                  
const $modalWr = document.querySelector('[data-modalWr]')                             // модалка для формы добавить кота
                 
const $formAddCat = document.querySelector('[data-form]')                                  
const $form = document.forms.form                                                    
const $btnAddInForm = document.querySelector('[data-btnAdd]')
const $btnClosedForm = document.querySelector('[data-btnClosedForm]')


const $modalShowCat = document.querySelector('[data-modalShowCat]') 
const $modalShowInner = document.querySelector('[data-modalShowInner]')                 
const $btnClosedShowModal = document.querySelector('[data-btnClosedShowModal]')




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

