const openModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-modal-close]")
const overlay = document.getElementById("overlay")

var savedId = null;
var file_selected = false;

openModalButtons.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();

		const popup = document.querySelector(button.dataset.modalTarget)
		savedId = button.id
		if(popup.id == 'modal_edit_team'){
			let team = JSON.stringify({_id: savedId})
			let request = new XMLHttpRequest();
			var teamInfo = null;
			request.open("GET", "/api/teams/" + savedId, true);   
			request.setRequestHeader("Content-Type", "application/json");
			request.addEventListener("load", function () {
				teamInfo = JSON.parse(request.response);
				// console.log(popup.querySelectorAll("#team_title"))
				document.getElementById('team_title_edit').value = teamInfo.title
				document.getElementById('team_city_edit').value = teamInfo.city
				document.getElementById('team_adress_edit').value = teamInfo.adress
				document.getElementById('team_short_title_edit').value = teamInfo.short_title
				console.log(teamInfo._id)
			});
			request.send(team);
			
			popup.querySelector("#edit_team_form").setAttribute("action", "/teams/update/" + savedId)

			
		}

		if(popup.id == 'delete_team'){
			popup.querySelector("#delete_team_form").setAttribute("action", "/teams/delete/" + savedId)
		}
		openModal(popup)
	})
})

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup')
		if(popup.id == 'modal_edit_team'){
			popup.querySelector("#edit_team_form").reset()
			popup.querySelector("#errors_info_edit").innerText = ""
			popup.querySelector("#errors_info_edit_sn").innerText = ""
			popup.querySelectorAll("[type = 'text']").forEach(inputForm => {
				inputForm.classList.remove('error')
			})

		}
		if(popup.id == 'modal_add_teams'){
			popup.querySelector("#add_team_form").reset()
			popup.querySelector("#errors_info_add").innerText = ""
			popup.querySelector("#errors_info_add_sn").innerText = ""
			popup.querySelector("#errors_info_add_image").innerText = ""
			popup.querySelectorAll("[type = 'text']").forEach(inputForm => {
				inputForm.classList.remove('error')
			})
			popup.querySelector("#team_logo").classList.remove('error')
		}

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

function validateTeamAddForm(elemOfForm){
	var nodes = elemOfForm.querySelectorAll("#form-inner input[type=text]")
	var nodeImage = document.getElementById("team_logo")
	var errorInput = document.getElementById("errors_info_add")
	var errorInputSN = document.getElementById("errors_info_add_sn")
	var errorInputImage = document.getElementById("errors_info_add_image")
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
				isErrors = true;
			}
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
	if(elementWithError.id != "short_name"){
		document.getElementById("errors_info_edit").innerText = ""
	}
	if(elementWithError.id == "short_name"){
		document.getElementById("errors_info_edit_sn").innerText = ""
	}	
}

function removeErrorAddForm(elementWithError){
	elementWithError.classList.remove('error')
	if(elementWithError.id != "short_name" && elementWithError.id != "team_logo"){
		document.getElementById("errors_info_add").innerText = ""
	}
	if(elementWithError.id == "short_name"){
		document.getElementById("errors_info_add_sn").innerText = ""
	}	
	if(elementWithError.id == "team_logo"){
		document.getElementById("errors_info_add_image").innerText = ""
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