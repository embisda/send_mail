/*Регулярное выражение для проверки введённой электронной почты*/
function validateEmail(em) {
	var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    return re.test(em)
}

/*Регулярное выражение для проверки введённого телефона*/
function validatePhone(ph) {
	var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
	return re.test(ph)
}

let formButton = document.getElementById('send-button')
let formResult = document.getElementById('result')
let formForm = document.getElementById('contact-form')

let formPhone = document.getElementById('input-phone')
let formEmail = document.getElementById('input-email')
let formPerson = document.getElementById('input-person')

let DS = 'data-sended'


formForm.addEventListener('submit', SubmitEx, false);

formForm.addEventListener('keyup', UnlockOrNot, false);
	
function SubmitEx (e) {	
    e.preventDefault()
	let email = formEmail.value
	if (email == '+++') {
		formEmail.value = 'email@example.cat'
		formPhone.value = '+7 123 456 89-00'
		formPerson.value = 'Тестовый отправитель формы'
		console.log('test values used!')
		email = formEmail.value
	}
	
	if (email.length != 0) {
		console.log('email - ok -> not empty')
		if (validateEmail(email)) {
			console.log('email - ok -> valid string')
			let phone = formPhone.value		
			if (phone.length != 0) {
				console.log('phone - ok -> not empty')
				if (validatePhone(phone)) {
					console.log('phone - ok -> valid string')
					formPerson.value = formPerson.value.replace(/^ +| +$|( ) +/g,"$1")
					let person = formPerson.value
					if (person.length != 0) {
						console.log('person - ok -> not empty')
						console.log('send form -> start')
						let form_data = $(this).serialize();
						let form = $(this);		
						let url = form.attr('action');
						console.log('send form -> ajax')
						$.ajax({
							type: "POST",
							dataType: "html",
							url: url,
							data: form_data,
							success: function () {
								console.log("send form -> OK");
								formButton.style.display = "none"
								formResult.style.display = "block"
								formResult.innerHTML = "<h3>Спасибо,</h3><p>Ваша заявка отправлена, и мы скоро позвоним!</p>"
								formResult.style.color = "darkgreen"
								formResult.style.marginTop='2em'
							}
						});
						formEmail.setAttribute(DS, email)
						formPhone.setAttribute(DS, phone)
						formPerson.setAttribute(DS, person)
						formForm.setAttribute(DS,"y")
					} else {
						console.log('person - err -> empty')
						printError('Как мы можем к Вам обращаться? Заполните "Имя", пожалуйста')
					}
				} else {	
					console.log('phone - err -> invalid string')
					printError('Заполните "Телефон" корректно, пожалуйста, иначе мы не сможем Вам позвонить')
				}	
			} else {
				console.log('phone - err -> empty')
				printError('Заполните "Телефон", пожалуйста, иначе мы не сможем Вам позвонить')	
			}
		} else {
			console.log('email - err -> invalid string')
			printError('Заполните "Эл.почта" корректно, пожалуйста, иначе мы не сможем Вам выслать контакты исполнителя');
		}
	} else {	
		console.log('email - err -> empty')
		printError('Заполните "Эл.почта", пожалуйста, иначе мы не сможем Вам выслать контакты исполнителя')		
	}
	console.log('---END ITERATION---')
	return false
};

function printError(txt) {
	formResult.style.marginTop='1em'
    formResult.innerText = txt
    formResult.style.color = "#ec3e3e"
    formResult.style.display = "block"
};

function UnlockOrNot() {
	if (formForm.getAttribute(DS) == "y") {
		if (formEmail.getAttribute(DS) != formEmail.value
			|| formPhone.getAttribute(DS) != formPhone.value
			|| formPerson.getAttribute(DS) != formPerson.value) {
			formButton.style.display = "block"
			formResult.style.color = "cadetblue"
			formResult.innerText = "Хотели бы отправить другую заявку (исправить предыдущую)?"
		} else {
			formButton.style.display = "none"
			formResult.style.display = "block"
			formResult.innerText = "Заявку с такими данными Вы уже отправляли."
			formResult.style.color = "#ec3e3e"
		}
	} 
}