

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


export {
    generateFormEditCard,
}