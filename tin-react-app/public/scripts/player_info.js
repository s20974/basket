const openModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-modal-close]")
const overlay = document.getElementById("overlay")

var savedId = null;
var file_selected = false;

openModalButtons.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const popup = document.querySelector(button.dataset.modalTarget)
		teamId = button.id
        playerId = document.getElementById('_id').value

		if(popup.id == 'delete_team'){
			popup.querySelector("#delete_team_form").setAttribute("action", "/players/team/delete/" + teamId + "/" + playerId)
		}
        
		openModal(popup)
	})
})

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup')

		if(popup.id == 'modal_edit_player'){
			popup.querySelector("#edit_player_form").reset()
			popup.querySelector("#errors_info").innerText = ""
			popup.querySelectorAll("[type = 'text']").forEach(inputForm => {
				inputForm.classList.remove('error')
			})  
		}

		if(popup.id == 'modal_add_player'){
			popup.querySelector("#edit_player_form").reset()
			popup.querySelector("#errors_info_add").innerText = ""
			popup.querySelector("#errors_image").innerText = ""
			popup.querySelectorAll("[type = 'text']").forEach(inputForm => {
				inputForm.classList.remove('error')
			})  
			popup.querySelector("#player_photo").classList.remove('error')
		}

		closeModal(popup)	
	})
})

function validatePlayerEditForm(elemOfForm){
	var nodes = elemOfForm.querySelectorAll("#form-inner input[type=text]")
	var errorInput = document.getElementById("errors_info")
	var errorInputSN = document.getElementById("errors_info_image")
	var isErrors = false

	nodes.forEach(inputForm => {
		if((inputForm.value.trim().length < 3 
			|| inputForm.value.trim().length > 50)){
			errorInput.innerText = "The field must be longer than 3 characters and shorter than 50"
			inputForm.classList.add('error')
			isErrors = true;
		}
	})


	if (isErrors)
		return false
	else
		return true
}


function validatePlayerAddForm(elemOfForm){
	var nodes = elemOfForm.querySelectorAll("#form-inner input[type=text]")
	var nodeImage = document.getElementById("player_photo")
	var errorInput = document.getElementById("errors_info_add")
	var errorInputImage = document.getElementById("errors_image")
	var isErrors = false

	nodes.forEach(inputForm => {
		if((inputForm.value.trim().length < 3 
			|| inputForm.value.trim().length > 50) ){
			errorInput.innerText = "The field must be longer than 3 characters and shorter than 50"
			inputForm.classList.add('error')
			isErrors = true;
		}
	})
	if(nodeImage.value == ""){
		isErrors = true;
		nodeImage.classList.add('error')
		errorInputImage.innerText = "Please choose image"
	}
	if (isErrors)
		return false
	else
		return true
}


function removeErrorEditForm(elementWithError){
	elementWithError.classList.remove('error')
	document.getElementById("errors_info_edit").innerText = ""
}

function removeErrorAddForm(elementWithError){
	elementWithError.classList.remove('error')
	if(elementWithError.id != "player_photo"){
		document.getElementById("errors_info_add").innerText = ""
	}
	if(elementWithError.id == "player_photo"){
		document.getElementById("errors_image").innerText = ""
	}	
}

function openModal(popup){
	if(popup == null){
		return
	}

	popup.classList.add('active')
	overlay.classList.add('active')
}

function closeModal(popup){
	if(popup == null){
		return
	}
	if(popup.id == 'delete_no'){
		popup = document.getElementById('delete_team')
	}

	popup.classList.remove('active')
	overlay.classList.remove('active')
}