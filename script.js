const formInputs = document.querySelectorAll('.contact-form__input')
const formErrors = document.querySelectorAll('.contact-form__error')

let formButton = document.getElementById('send-button')
let formResult = document.getElementById('result')
let formForm = document.getElementById('contact-form')

let formPhone = document.getElementById('input-phone')
let formEmail = document.getElementById('input-email')
let formPerson = document.getElementById('input-person')

let DS = 'data-sended'

function validateEmail() {
	let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    return re.test(formEmail.value)
}

function validatePhone() {
	let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
	return re.test(formPhone.value)
}

function checkInputs() {
	if ([...formInputs].every(input => input.value.trim() !== '') && validateEmail() && validatePhone()) {
		formButton.disabled = false
	} else {
		formButton.disabled = true
	}
}

formInputs.forEach((input) => {
  	input.addEventListener('input', checkInputs)
})

formErrors.forEach((error) => {
  	error.style.cssText = 'display: none; font-size: 16px; color:#ea4e4d; margin-bottom: 13px'
})

formPhone.addEventListener('change', checkInputPhone)

formEmail.addEventListener('change', checkInputEmail)

formPerson.addEventListener('change', checkInputPerson)

formForm.addEventListener('submit', SubmitEx, false);

formForm.addEventListener('keyup', UnlockOrNot, false);

	
function SubmitEx (e) {	
	
    e.preventDefault()
	
	let form_data = $(this).serialize(); // Собираем все данные из формы
	let form = $(this);		
	let url = form.attr('action');

	$.ajax({
		type: "POST", // Метод отправки
		dataType: "html",
		url: url, // Путь до php файла отправителя
		data: form_data,
		success: function () {
			// Код в этом блоке выполняется при успешной отправке сообщения
			console.log("send form -> OK");
			formButton.style.display = "none"
			formResult.style.display = "block"
			formResult.innerHTML = "<p>Спасибо, мы уже получили заявку и скоро позвоним!</p>"
			formResult.style.color = "#0B8478"
			formResult.style.marginTop='2em'
		}
	});

	formEmail.setAttribute(DS, formEmail.value)
	formPhone.setAttribute(DS, formPhone.value)
	formPerson.setAttribute(DS, formPerson.value)
	formForm.setAttribute(DS,"y")

	return false
};

function checkInputEmail() {
	if(formEmail.value.length == 0) {
		formEmail.style.cssText = 'margin-bottom: 0px'
		document.getElementById('input-email__error-empty').style.display = 'block'
		document.getElementById('input-email__error-invalid').style.display = 'none'
	} else {
		document.getElementById('input-email__error-empty').style.display = 'none'
		formEmail.style.cssText = 'margin-bottom: 13px'
		if(validateEmail()) {
			document.getElementById('input-email__error-invalid').style.display = 'none'
			formEmail.style.cssText = 'margin-bottom: 13px'
		} else {
			formEmail.style.cssText = 'margin-bottom: 0px'
			document.getElementById('input-email__error-invalid').style.display = 'block'
		}
	}
}

function checkInputPhone() {
	if(formPhone.value.length == 0) {
		formPhone.style.cssText = 'margin-bottom: 0px'
		document.getElementById('input-phone__error-empty').style.display = 'block'
		document.getElementById('input-phone__error-invalid').style.display = 'none'
	} else {
		document.getElementById('input-phone__error-empty').style.display = 'none'
		formPhone.style.cssText = 'margin-bottom: 13px'
		if(validatePhone()) {
			document.getElementById('input-phone__error-invalid').style.display = 'none'
			formPhone.style.cssText = 'margin-bottom: 13px'
		} else {
			formPhone.style.cssText = 'margin-bottom: 0px'
			document.getElementById('input-phone__error-invalid').style.display = 'block'
		}
	}
}

function checkInputPerson() {
	if(formPerson.value.length == 0) {
		formPerson.style.cssText = 'margin-bottom: 0px'
		document.getElementById('input-person__error-empty').style.display = 'block'
	} else {
		document.getElementById('input-person__error-empty').style.display = 'none'
		formPerson.style.cssText = 'margin-bottom: 13px'
	}
	
	formPerson.value = formPerson.value.replace(/^ +| +$|( ) +/g,"$1")
}

function UnlockOrNot() {
	if (formForm.getAttribute(DS) == "y") {
		if (formEmail.getAttribute(DS) != formEmail.value
			|| formPhone.getAttribute(DS) != formPhone.value
			|| formPerson.getAttribute(DS) != formPerson.value) {
			formButton.style.display = "block"
			formResult.style.color = "cadetblue"
			formResult.innerText = "Хотите заказать ещё одну услугу?"
		} else {
			formButton.style.display = "none"
			formResult.style.display = "block"
			formResult.innerText = "Заявку с такими данными мы уже получили, с вами скоро свяжутся"
			formResult.style.color = "#ec3e3e"
		}
	} 
}