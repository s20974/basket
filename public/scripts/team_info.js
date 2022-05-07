const openModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-modal-close]")
const overlay = document.getElementById("overlay")

openModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = document.querySelector(button.dataset.modalTarget)
		savedId = button.id
		teamId = document.getElementById('_id').value
		if(popup.id == 'delete_team'){
			popup.querySelector("#delete_team_form").setAttribute("action", "/teams/player/delete/" + teamId + "/" + savedId)
		}
		openModal(popup)
	})
})

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup')

		popup.querySelector("#edit_team_form").reset()
		popup.querySelector("#errors_info_edit").innerText = ""
		popup.querySelector("#errors_info_edit_sn").innerText = ""
		popup.querySelectorAll("[type = 'text']").forEach(inputForm => {
			inputForm.classList.remove('error')
		})

		closeModal(popup)
	
	})
})


function validateTeamEditForm(elemOfForm){
	var nodes = elemOfForm.querySelectorAll("#form-inner input[type=text]")
	var errorInput = document.getElementById("errors_info_edit")
	var errorInputSN = document.getElementById("errors_info_edit_sn")
	var isErrors = false

	nodes.forEach(inputForm => {
		if((inputForm.value.trim().length < 3 
			|| inputForm.value.trim().length > 50) 
			&& !(inputForm.id == "short_name")){
			errorInput.innerText = "The field must be longer than 3 x characters and shorter than 50"
			inputForm.classList.add('error')
			isErrors = true;
		}

		if(inputForm.id == "short_name"){
			if(inputForm.value.trim().length != 3){
				inputForm.classList.add('error')
				errorInputSN.innerText = "The field 'Short Name' must be 3 characters long"
			}
		}

	})
	if (isErrors)
		return false
	else
		return true
}

function deletePlayer(playerId){
	
}

function removeErrorEditForm(elementWithError){
	elementWithError.classList.remove('error')
	if(elementWithError.id != "short_name"){
		document.getElementById("errors_info_edit").innerText = ""
	}
	if(elementWithError.id == "short_name"){
		document.getElementById("errors_info_edit_sn").innerText = ""
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

	popup.classList.remove('active')
	overlay.classList.remove('active')
}