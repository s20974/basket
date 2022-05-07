import MainContent from '../fragments/MainContent';

function HomePage() {
  return (
    <div>
        
        <MainContent/>
    </div>
  );
}

// window.onload = function () {
// 	const openModalButtons = document.querySelectorAll("[data-modal-target]")
// 	const closeModalButtons = document.querySelectorAll("[data-modal-close]")
// 	const overlay = document.getElementById("overlay")
	
// 	openModalButtons.forEach(button => {
// 		button.addEventListener('click', (e) => {
// 			const popup = document.querySelector(button.dataset.modalTarget)
// 			console.log('dddd')
// 			openModal(popup)
// 		})
// 	})
	
// 	closeModalButtons.forEach(button => {
// 		button.addEventListener('click', () => {
// 			const popup = button.closest('.popup')
// 			closeModal(popup)
// 		})
// 	})
	
// 	function validateLoginForm(elemOfForm){
// 		var nodes = elemOfForm.querySelectorAll("#form-inner input[type=text]")
// 		var errorInput = document.getElementById("errors_info_login")
// 		var isErrors = false
	
// 		nodes.forEach(inputForm => {
// 			if((inputForm.value.trim().length < 3 
// 				|| inputForm.value.trim().length > 50)){
// 				errorInput.innerText = "The field must be longer than 3 x characters and shorter than 50"
// 				inputForm.classList.add('error')
// 				isErrors = true;
// 			}
// 		})
// 		if (isErrors)
// 			return false
// 		else
// 			return true
// 	}
	
	
// 	function removeErrorLogin(elementWithError){
// 		elementWithError.classList.remove('error')
// 		document.getElementById("errors_info_login").innerText = ""
// 	}
	
// 	function openModal(popup){
// 		if(popup == null){
// 			return
// 		}
// 		popup.classList.add('active')
// 		overlay.classList.add('active')
// 	}
	
// 	function closeModal(popup){
// 		if(popup == null){
// 			return
// 		}
// 		popup.classList.remove('active')
// 		overlay.classList.remove('active')
// 	}
	
// }

export default HomePage;