
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


export {
    api,
}
