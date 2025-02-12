const form = document.getElementById('ticket-form');

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const uploadedImage = document.getElementById('uploaded-image');
const messageAction = document.getElementById('message-action');
const fileAction = document.getElementById('file-action');
const removeImage = document.getElementById('remove-image');
const changeImage = document.getElementById('change-image');
const uploadHint = document.getElementById('upload-hint');

const textInputs = document.querySelectorAll('.required');

const formData = {
    image: '',
    name: '',
    email: '',
    username: ''
}

function validateInputs(){
    let isValid = true
    textInputs.forEach(input => {
        const hint = input.nextElementSibling

        if(input.value.trim() === ''){
            hint.classList.add('error')
            hint.style.display = "flex"
            input.classList.add('error')
            isValid = false
        } else{
            hint.classList.remove('error')
            input.classList.remove('error')
            hint.style.display = "none"
        }
    })
    return isValid
}

function validateFile(input, hint){
    const file = input.files[0]
    let isValid = true

    if(!file){
        hint.classList.add('error')
        hint.innerHTML = `<i class="fas fa-exclamation-circle"></i> 'Please upload an Image!'`
        isValid = false
    } else{
        const validTypes = ['image/jpg', 'image/png']
        const maxSize = 500 * 1024

        if(!validTypes.includes(file.type)){
            hint.classList.add('error')
            hint.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Invalid File type!"`
            input.value = ''
            isValid = false
        } else if(file.size > maxSize){
            hint.classList.add('error')
            hint.innerHTML = `<i class="fas fa-exclamation-circle"></i> "FIle size too large"`
            input.value = ''
            isValid = false
        } else{
            hint.classList.remove('error')
            hint.innerHTML = `<img src="./assets/images/icon-info.svg" alt=""> Upload your photo (JPG or PNG, max size: 500KB).`
            displayUploadedImage(file)
        }
    }
    return isValid
}

function displayUploadedImage(file){
    const reader = new FileReader()

    reader.onload = e => {
        uploadedImage.src = e.target.result
        fileAction.classList.add('show')
        messageAction.classList.add('hide')
    }
    reader.readAsDataURL(file)
}

function resetUpload(){
    const defaultUploadIcon = './assets/images/icon-upload.svg'

    fileInput.value = ''
    uploadedImage.src = defaultUploadIcon
    messageAction.classList.remove('hide')
    fileAction.classList.remove('show')
    uploadHint.classList.remove('error')
    uploadHint.innerHTML =`<i class="fas fa-exclamation-circle"></i> "Upload your photo (JPG or PNG, max size: 500KB)"`
}

function storeAndDisplayFormData(){
    formData.image = uploadedImage.src
    formData.name = document.getElementById('full-name').value.trim()
    formData.email = document.getElementById('email').value.trim()
    formData.username = document.getElementById('username').value.trim()

    document.getElementById('header-name').textContent = formData.name
    document.getElementById('display-name').textContent = formData.name
    document.getElementById('display-email').textContent = formData.email
    document.getElementById('display-github').textContent = formData.username
    document.getElementById('display-image').src = formData.image
}

dropArea.addEventListener('click', () =>{
    fileInput.click();
})

dropArea.addEventListener('dragover', (e) =>{
    e.preventDefault();
    return
})

dropArea.addEventListener('drop', (e) =>{
    e.preventDefault();
    
    const files = e.dataTransfer.files
    if(files.length > 0){
        fileInput.files = files
        validateFile(fileInput, uploadHint)
    }
})

fileInput.addEventListener('change', () => {
    validateFile(fileInput, uploadHint)
})

//Remove the uploaded image
removeImage.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    resetUpload()
})

//Change the uploaded image
changeImage.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileInput.click()
})

//Generate the ticket
form.addEventListener('submit', e => {
    e.preventDefault()

    const isTextValid = validateInputs()
    const isFileValid = validateFile(fileInput, uploadHint)

    if(isTextValid && isFileValid){
        storeAndDisplayFormData()

        document.getElementById('form-content').classList.add('hide')
        document.getElementById('display-data').style.display  = 'block'
    }
})