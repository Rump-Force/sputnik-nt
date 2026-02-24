// var swiper = new Swiper('.myBanner', {
// 	slidesPerView: 1,
// 	spaceBetween: 30,
// 	loop: true,
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// })

let lastScroll = 0
const headerElement = document.querySelector('.header')

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset

	// 1. Логика "Липкости" и Орбит:
	// Если прокрутили больше 50px, добавляем класс, который уменьшает хедер и прячет орбиты
	if (currentScroll > 50) {
		headerElement.classList.add('header--scrolled')
	} else {
		headerElement.classList.remove('header--scrolled')
	}

	// 2. Логика Скрытия/Появления (вверх-вниз):
	if (currentScroll > lastScroll && currentScroll > 200) {
		// Скроллим вниз — прячем всё меню
		headerElement.classList.add('header--hidden')
	} else {
		// Скроллим вверх — показываем компактное меню
		headerElement.classList.remove('header--hidden')
	}

	lastScroll = currentScroll
})

const btnMenu = document.querySelector('.button__burger')
const menu = document.querySelector('.menu')
const btnClose = document.querySelector('.button__close')
const overlay = document.querySelector('.overlay')

const mobileMenu = window.matchMedia('(max-width: 700px)')
const btnCons = document.querySelector('.header__button') //Кнопка
const header = document.querySelector('.header__inner') //Шапка сайта

function moveButtons(e) {
	if (e.matches) {
		// mobile → переносим кнопки в меню
		menu.append(btnCons)
	} else {
		header.append(btnCons)
	}
}

moveButtons(mobileMenu)
// при изменении ширины
mobileMenu.addEventListener('change', moveButtons)

function closeMenu() {
	btnMenu.classList.remove('active-burger')
	menu.classList.remove('active-menu')
	overlay.classList.remove('overlay-active')
	btnClose.classList.remove('overlay-active')
	document.body.style.overflow = ''
	unlockScroll()
}

btnMenu.addEventListener('click', () => {
	if (menu.classList.contains('active-menu')) {
		closeMenu()
	} else {
		menu.classList.add('active-menu')
		btnMenu.classList.add('active-burger')
		overlay.classList.add('overlay-active')
		document.body.style.overflow = 'hidden'
		lockScroll()
	}
})

// overlay.addEventListener('click', () => {
// 	menu.classList.remove('active-menu')
// 	overlay.classList.remove('overlay-active')
// })

btnClose.addEventListener('click', closeMenu)
overlay.addEventListener('click', closeMenu)

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeMenu()
})

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.network-arch__container')
	const lineFill = document.querySelector('.network-arch__line-fill')
	const steps = document.querySelectorAll('.network-arch__step')

	if (!container || !lineFill) return

	// Устанавливаем начальное состояние
	lineFill.style.height = '0%'

	function updateScroll() {
		const containerRect = container.getBoundingClientRect()
		const windowHeight = window.innerHeight

		// Определяем "зону рисования":
		// линия начинает расти, когда верх контейнера на 70% высоты экрана
		const triggerPoint = windowHeight * 0.7
		const totalHeight = container.offsetHeight
		const currentPos = triggerPoint - containerRect.top

		// Рассчитываем процент (от 0 до 1)
		let progress = currentPos / totalHeight
		progress = Math.min(Math.max(progress, 0), 1)

		// Применяем высоту
		lineFill.style.height = progress * 100 + '%'

		// Активируем шаги
		steps.forEach(step => {
			// Расстояние от верха контейнера до центра текущего шага
			const stepThreshold = step.offsetTop + step.offsetHeight / 2

			// Если линия (в пикселях) прошла порог шага
			if (progress * totalHeight >= stepThreshold) {
				step.classList.add('is-active')
			} else {
				step.classList.remove('is-active')
			}
		})
	}

	// Слушаем скролл
	window.addEventListener('scroll', updateScroll)
	// И запускаем один раз при загрузке
	updateScroll()
})

document.addEventListener('DOMContentLoaded', () => {
	initThanksModal()

	// 1. Главная форма (контакты)
	const contactForm = document.querySelector('.contacts__form-inner')
	const contactPhone = document.getElementById('phone')
	if (contactForm && contactPhone) {
		const mask = IMask(contactPhone, { mask: '+{7} (000) 000-00-00' })

		contactForm.addEventListener('submit', async function (e) {
			e.preventDefault()
			if (!mask.masked.isComplete) {
				contactPhone.style.borderColor = 'red'
				return
			}

			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					body: new FormData(this),
				})
				if (response.ok) {
					this.reset()
					mask.updateValue()
					closeMenu()
					showThanks()
				}
			} catch (err) {
				console.error(err)
			}
		})
	}

	// 2. Форма в попапе
	const popupForm = document.querySelector('.popup__form')
	const popupPhone = document.getElementById('tel')
	if (popupForm && popupPhone) {
		const pMask = IMask(popupPhone, { mask: '+{7} (000) 000-00-00' })

		popupForm.addEventListener('submit', async function (e) {
			e.preventDefault()
			if (!pMask.masked.isComplete) return

			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					body: new FormData(this),
				})
				if (response.ok) {
					this.reset()
					pMask.updateValue()
					closePopupWin() // Закрываем окно с формой
					showThanks() // Показываем спасибо
				}
			} catch (err) {
				console.error(err)
			}
		})
	}
})

// --- ОБЩАЯ ЛОГИКА ОКНА "СПАСИБО" (Ваша проблема была тут) ---
const initThanksModal = () => {
	const thanksModal = document.querySelector('#thanks-modal')
	if (!thanksModal) return

	const closeThanks = () => {
		thanksModal.classList.remove('_active')
		unlockScroll()
	}

	// Находим все кнопки закрытия внутри модалки спасибо
	const closeBtns = thanksModal.querySelectorAll(
		'#modal-close, #modal-ok, .modal__overlay, .thanks-close-btn',
	)
	closeBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			closeThanks()
		})
	})

	// Закрытие по фону
	thanksModal.addEventListener('click', e => {
		if (e.target === thanksModal) closeThanks()
	})
}

// Модельно окно попап, заказать обратный звонок
const btnClick = document.querySelectorAll('.modal-win')
const openModal = document.querySelector('.popup')
const openOverlay = document.querySelector('.popup__overlay')
const closeModal = document.querySelector('.popup__close')

btnClick.forEach(btnClick => {
	btnClick.addEventListener('click', e => {
		e.preventDefault()
		openModal.classList.add('popup-active')
		openOverlay.classList.add('popup__overlay-active')
		document.body.style.overflow = 'hidden'
		lockScroll()
	})
})

function closeModalWin() {
	openModal.classList.remove('popup-active')
	openOverlay.classList.remove('popup__overlay-active')
	document.body.style.overflow = ''
	unlockScroll()
}

closeModal.addEventListener('click', closeModalWin)
openOverlay.addEventListener('click', closeModalWin)

// ==========================================
// ЛОГИКА ДЛЯ ВТОРОЙ ФОРМЫ (В ПОПАПЕ)
// ==========================================

const popupForm = document.querySelector('.popup__form')
const popupPhone = document.getElementById('tel') // ID твоего инпута в попапе

if (popupForm && popupPhone) {
	// 1. Своя маска для попапа
	const popupMaskOptions = {
		mask: '+{7} (000) 000-00-00',
		lazy: true,
	}
	const popupMask = IMask(popupPhone, popupMaskOptions)

	// 2. Свой обработчик отправки для попапа
	popupForm.addEventListener('submit', async function (e) {
		e.preventDefault()

		if (!popupMask.masked.isComplete) {
			popupPhone.style.borderColor = '#ef4444'
			popupPhone.focus()
			return
		}

		popupPhone.style.borderColor = ''

		try {
			const btn = this.querySelector('.popup__button')
			const formData = new FormData(this)

			btn.style.pointerEvents = 'none'
			btn.style.opacity = '0.7'
			const originalText = btn.textContent
			btn.textContent = 'Отправка...'

			const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: formData,
			})

			if (response.ok) {
				this.reset()
				popupMask.updateValue()
				closeModalWin() // Закрываем основное окно

				// Если хочешь открыть то же окно "Спасибо", что и для первой формы:
				const thanksModal = document.querySelector('#thanks-modal')
				if (thanksModal) {
					thanksModal.classList.add('_active')
					document.body.style.overflow = 'hidden'
				}
			}
		} catch (error) {
			console.error(error)
		} finally {
			const btn = this.querySelector('.popup__button')
			btn.style.pointerEvents = 'all'
			btn.style.opacity = '1'
			btn.textContent = 'Заказать звонок'
		}
	})
}

let scrollLocks = 0

function lockScroll() {
	scrollLocks++
	document.body.classList.add('no-scroll') // Лучше управлять через CSS класс
	document.body.style.overflow = 'hidden'
}

function unlockScroll() {
	scrollLocks--
	if (scrollLocks <= 0) {
		scrollLocks = 0
		document.body.classList.remove('no-scroll')
		document.body.style.overflow = ''
	}
}

const footerTitles = document.querySelectorAll('.footer__title')
footerTitles.forEach(title => {
	title.addEventListener('click', () => {
		const footerNav = title.closest('.footer__nav')
		const footerMenu = footerNav.querySelector('.footer__menu')
		footerMenu.classList.toggle('footer__menu-active')
	})
})

const btnTab = document.querySelectorAll('.tariffs__tab')
const panels = document.querySelectorAll('.tab-panel')

btnTab.forEach(tab => {
	tab.addEventListener('click', () => {
		// 1. убрать active у всех кнопок
		btnTab.forEach(b => b.classList.remove('is-active'))
		tab.classList.add('is-active')

		panels.forEach(p => p.classList.remove('tab-active'))

		const tabID = tab.dataset.tab
		const activeContent = document.querySelector(`.tab-panel[data-tab="${tabID}"]`)

		if (activeContent) {
			activeContent.classList.add('tab-active')
		}
	})
})

// форма подключения тарифа
//Вызов окна формы
const popup = document.querySelector('.tariff__form')
if (popup) {
	const selectedBlock = popup.querySelector('.tariff__selected')
	const speedValue = popup.querySelector('.tariff__speed-value')
	const speedUnit = popup.querySelector('.tariff__speed-unit') // элемент с единицами
	const tariffName = popup.querySelector('.tariff__selected-name')
	const priceValue = popup.querySelector('.tariff__price-value')
	const closeBtn = popup.querySelector('.tariff__form-close')
	const openOverlayTariff = document.querySelector('.tariff__form-overlay')

	// Все кнопки "Подключить"
	document
		.querySelectorAll('.tariff-card__button, .webcam__button, .digital__market-button')
		.forEach(button => {
			button.addEventListener('click', () => {
				const card =
					button.closest('.tariff-card') ||
					button.closest('.webcam') ||
					button.closest('.digital__layout')
				if (!card) return

				let name, speed, price, tariffType, unitText

				// --- Обработка интернет-карточек (старые) ---
				if (card.classList.contains('tariff-card') || card.classList.contains('webcam')) {
					name = card.querySelector('.tariff-card__title')?.textContent || 'Видеонаблюдение'
					speed = card.querySelector('.tariff-card__speed-value')?.textContent || '—'
					price = card.querySelector('.tariff-card__price-value')?.textContent || '—'
					tariffType = card.dataset.tariff || 'custom'
					unitText = 'Мбит/с'
				}
				// --- Обработка ТВ-карточек (новые) ---
				else if (card.classList.contains('digital__layout')) {
					// Название
					const titleEl = card.querySelector('.digital__tag-title')
					name = titleEl ? titleEl.textContent : 'ТВ-пакет'

					// Значение (каналы)
					let speedText = ''
					const matrixTextEl = card.querySelector('.digital-matrix__text')
					const premiumTextEl = card.querySelector('.matrix-text')
					if (matrixTextEl) {
						speedText = matrixTextEl.textContent.trim() // "250 каналов"
					} else if (premiumTextEl) {
						speedText = premiumTextEl.textContent.trim() // "500+ каналов"
					}
					// Оставляем только цифры и знак '+'
					speed = speedText.replace(/[^\d+]/g, '') || '—'

					// Цена
					const priceEl = card.querySelector('.digital__market-price')
					if (priceEl) {
						const priceText = priceEl.textContent.trim()
						const match = priceText.match(/(\d+)\s*₽/) // ищем число перед ₽
						price = match ? match[1] : '—'
					} else {
						price = '—'
					}

					// Тип для стилей – лучше использовать data-tariff в HTML
					if (card.dataset.tariff) {
						tariffType = card.dataset.tariff
					} else {
						// Запасной вариант (если data-tariff не задан)
						tariffType = card.classList.contains('premium__layout') ? 'premium-500' : 'digital-250'
					}
					unitText = 'каналов'
				} else {
					return // неизвестный тип карточки
				}

				// Подставляем данные в форму
				if (speedValue) speedValue.textContent = speed
				if (speedUnit) speedUnit.textContent = unitText
				if (tariffName) tariffName.textContent = name
				if (priceValue) priceValue.textContent = price

				// Сбрасываем старые классы
				popup.className = 'tariff__form'
				if (selectedBlock) selectedBlock.className = 'tariff__selected'
				if (tariffName) tariffName.className = 'tariff__selected-name'

				// Добавляем классы для цветового оформления
				popup.classList.add(`tariff__form--${tariffType}`)
				if (selectedBlock) selectedBlock.classList.add(`tariff__selected--${tariffType}`)
				if (tariffName) tariffName.classList.add(`tariff__selected--${tariffType}`)

				// Открываем попап
				popup.classList.add('is-active-tariff')
				if (openOverlayTariff) openOverlayTariff.classList.add('tariff-overlay--active')
				lockScroll()
			})
		})

	// Закрытие по кнопке и оверлею
	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			popup.classList.remove('is-active-tariff')
			if (openOverlayTariff) openOverlayTariff.classList.remove('tariff-overlay--active')
			unlockScroll()
		})
	}

	if (openOverlayTariff) {
		openOverlayTariff.addEventListener('click', () => {
			popup.classList.remove('is-active-tariff')
			openOverlayTariff.classList.remove('tariff-overlay--active')
			unlockScroll()
		})
	}
} // <-- закрыли if (popup)

;(function () {
	const tariffPopup = document.querySelector('.tariff__form')
	const overlayTariff = document.querySelector('.tariff__form-overlay')
	if (!tariffPopup) return

	const innerForm = tariffPopup.querySelector('form') || null

	const submitHandler = async function (e) {
		e.preventDefault()

		// Собираем данные
		const name = tariffPopup.querySelector('.tariff__selected-name')?.textContent?.trim() || ''
		const speed = tariffPopup.querySelector('.tariff__speed-value')?.textContent?.trim() || ''
		const unit = tariffPopup.querySelector('.tariff__speed-unit')?.textContent?.trim() || ''
		const price = tariffPopup.querySelector('.tariff__price-value')?.textContent?.trim() || ''

		let formData = new FormData(innerForm || undefined)
		if (!innerForm) {
			formData.append('tariffName', name)
			formData.append('speed', speed)
			formData.append('price', price)
		}

		try {
			const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: formData,
			})

			if (resp.ok) {
				// 1. Закрываем текущий попап
				tariffPopup.classList.remove('is-active-tariff')
				if (overlayTariff) overlayTariff.classList.remove('tariff-overlay--active')

				// 2. Работаем с модалкой "Спасибо"
				const thanksModal = document.querySelector('#thanks-modal')
				if (thanksModal) {
					// --- ЛОГИКА ЦВЕТА (ПЕРЕЕХАЛА СЮДА) ---
					const activeFormClass = Array.from(tariffPopup.classList).find(cls =>
						cls.startsWith('tariff__form--'),
					)

					if (activeFormClass) {
						// Очищаем старые классы тарифов у модалки и добавляем новый
						thanksModal.classList.forEach(cls => {
							if (cls.startsWith('tariff__form--')) thanksModal.classList.remove(cls)
						})
						thanksModal.classList.add(activeFormClass)
					}

					// Заполняем стилизованные поля
					const infoBlock = thanksModal.querySelector('.modal__tariff-info')
					const nameEl = thanksModal.querySelector('.modal__tariff-name')
					const speedEl = thanksModal.querySelector('.modal__tariff-speed')
					const priceEl = thanksModal.querySelector('.modal__tariff-price')

					if (nameEl) nameEl.textContent = name
					if (speedEl) speedEl.textContent = speed ? `${speed} ${unit}` : ''
					if (priceEl) priceEl.textContent = price ? `${price} ₽/мес` : ''

					if (infoBlock) infoBlock.style.display = 'block'
					// --------------------------------------

					thanksModal.classList.add('_active')
					document.body.style.overflow = 'hidden'
				}

				if (innerForm) innerForm.reset()
			}
		} catch (err) {
			console.error(err)
		}
	}

	// Навешиваем обработчик
	if (innerForm) {
		innerForm.addEventListener('submit', submitHandler)
	} else {
		const btn = tariffPopup.querySelector('.selected__form-button, .tariff__form-button')
		if (btn) btn.addEventListener('click', submitHandler)
	}
})()

////Ближайшее время подключения СТАРТ
function updateConnectionTime() {
	const timeElement = document.getElementById('connection-time')
	const labelElement = document.getElementById('connection-label')
	const blockElement = document.getElementById('connection-block')

	if (!timeElement || !blockElement) return

	const now = new Date()
	const currentHour = now.getHours()
	const currentMinutes = now.getMinutes()
	const currentTimeInMinutes = currentHour * 60 + currentMinutes

	// Базовые слоты: 10:00, 12:00, 14:00, 16:00
	const baseSlots = [10, 12, 13, 14, 15, 16]

	// Генерируем "зерно" для рандома на основе даты (чтобы не менялось при обновлении)
	const dateSeed = now.getFullYear() + now.getMonth() + now.getDate()

	// Функция псевдо-рандома на основе числа
	const seededRandom = seed => {
		const x = Math.sin(seed) * 10000
		return x - Math.floor(x)
	}

	// Создаем финальное расписание на сегодня
	const todaySlots = baseSlots.map((hour, index) => {
		const randomOffset = Math.floor(seededRandom(dateSeed + index) * 81) - 30 // от -40 до +40
		return hour * 60 + randomOffset
	})

	// Ищем ближайшее время, которое больше текущего
	const nextSlot = todaySlots.find(slot => slot > currentTimeInMinutes)

	// Добавляем проверку на "слишком рано" (например, до 9:00 утра)
	const isTooEarly = currentHour < 9

	if (nextSlot && !isTooEarly) {
		// Стандартная логика отображения
		const h = Math.floor(nextSlot / 60)
		const m = nextSlot % 60
		const formattedTime = `${h}:${m.toString().padStart(2, '0')}`

		timeElement.textContent = `Сегодня, ${formattedTime}`
		blockElement.classList.remove('status--offline')
		blockElement.classList.add('status--online')
	} else {
		// Если слоты кончились ИЛИ сейчас ночь/раннее утро
		labelElement.textContent = 'Ближайшее время подключения:'

		if (isTooEarly) {
			// Вычисляем время первого слота, чтобы показать его как утренний
			const firstSlot = todaySlots[0]
			const h = Math.floor(firstSlot / 60)
			const m = firstSlot % 60
			timeElement.textContent = `Утром, в ${h}:${m.toString().padStart(2, '0')}`
		} else {
			timeElement.textContent = 'На сегодня слотов нет'
		}

		timeElement.style.color = '#ff4d4d'
		blockElement.classList.remove('status--online')
		blockElement.classList.add('status--offline')
	}
}

// Запускаем при загрузке
updateConnectionTime()
////Ближайшее время подключения Конец
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
	// Элементы для взаимодействия
	const districtCards = document.querySelectorAll('.district-card')
	const buildings = document.querySelectorAll('.building')
	const fiberLines = document.querySelectorAll('.city-3d__fiber-line')
	const nodes = document.querySelectorAll('.city-3d__node')

	// Функция сброса всех активных состояний
	function resetAllActiveStates() {
		// Сбрасываем карточки
		districtCards.forEach(card => {
			card.classList.remove('district-card--active')
		})

		// Сбрасываем здания
		buildings.forEach(building => {
			building.classList.remove('building--active')
		})

		// Сбрасываем линии
		fiberLines.forEach(line => {
			line.classList.remove('city-3d__fiber-line--active')
		})

		// Сбрасываем узлы
		nodes.forEach(node => {
			node.classList.remove('city-3d__node--active')
		})
	}

	// Функция активации района
	function activateDistrict(district) {
		resetAllActiveStates()

		// Активируем карточку
		const activeCard = document.querySelector(`.district-card[data-district="${district}"]`)
		if (activeCard) {
			activeCard.classList.add('district-card--active')
		}

		// Активируем здания района
		const districtBuildings = document.querySelectorAll(`.building--${district}`)
		districtBuildings.forEach(building => {
			building.classList.add('building--active')
		})

		// Активируем линии района
		const districtFiberLines = document.querySelectorAll(`.city-3d__fiber-line--${district}`)
		districtFiberLines.forEach(line => {
			line.classList.add('city-3d__fiber-line--active')
		})

		// Активируем узлы района
		const districtNodes = document.querySelectorAll(`.city-3d__node--${district}`)
		districtNodes.forEach(node => {
			node.classList.add('city-3d__node--active')
		})
	}

	// Обработчики кликов на карточки
	districtCards.forEach(card => {
		card.addEventListener('click', function () {
			const district = this.getAttribute('data-district')
			activateDistrict(district)
		})

		// Добавляем эффект при наведении
		card.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-2px)'
		})

		card.addEventListener('mouseleave', function () {
			if (!this.classList.contains('district-card--active')) {
				this.style.transform = 'translateY(0)'
			}
		})
	})

	// Инициализация: активируем Южный порт по умолчанию (как в вашем HTML)
	activateDistrict('south')

	// Взаимодействие с 3D зданиями (при наведении)
	buildings.forEach(building => {
		building.addEventListener('mouseenter', function () {
			if (!this.classList.contains('building--active')) {
				this.style.transform = 'translateZ(10px)'
				this.style.zIndex = '10'
			}
		})

		building.addEventListener('mouseleave', function () {
			if (!this.classList.contains('building--active')) {
				this.style.transform = ''
				this.style.zIndex = '1'
			}
		})
	})

	// Автоматическая коррекция позиции круга при загрузке
	function centerOrbitalRing() {
		const orbitalRing = document.querySelector('.city-3d__orbital-ring')
		if (orbitalRing) {
			// Можно добавить дополнительные вычисления для точного центрирования
			// Например, на основе размеров контейнера
			const container = document.querySelector('.city-3d')
			if (container) {
				const containerRect = container.getBoundingClientRect()
				// Если нужно динамическое вычисление
			}
		}
	}

	// Центрируем круг при загрузке и изменении размера окна
	window.addEventListener('load', centerOrbitalRing)
	window.addEventListener('resize', centerOrbitalRing)
})

//Аккордеон
const items = document.querySelectorAll('.accordion__item')

items.forEach(item => {
	const content = item.querySelector('.accordion__item-content')

	// Устанавливаем начальную высоту
	if (item.classList.contains('active__accordion')) {
		content.style.maxHeight = content.scrollHeight + 'px'
		content.style.opacity = '1'
		content.style.transform = 'translateY(0)'
	} else {
		content.style.maxHeight = '0'
		content.style.opacity = '0'
		content.style.transform = 'translateY(-10px)'
	}

	// ТЕПЕРЬ СЛУШАЕМ КЛИК НА ВЕСЬ ITEM
	item.addEventListener('click', event => {
		// Опционально: если кликнули по самому контенту, а не по заголовку/пустому месту,
		// и вы не хотите, чтобы он закрывался — раскомментируйте строку ниже:
		// if (event.target.closest('.accordion__item-content')) return;

		const isActive = item.classList.contains('active__accordion')

		// Закрываем все элементы
		items.forEach(otherItem => {
			if (otherItem !== item) {
				const otherContent = otherItem.querySelector('.accordion__item-content')
				otherItem.classList.remove('active__accordion')
				otherContent.style.maxHeight = '0'
				otherContent.style.opacity = '0'
				otherContent.style.transform = 'translateY(-10px)'
			}
		})

		// Переключаем текущий элемент
		if (!isActive) {
			setTimeout(() => {
				item.classList.add('active__accordion')
				content.style.maxHeight = content.scrollHeight + 'px'
				content.style.opacity = '1'
				content.style.transform = 'translateY(0)'
			}, 50)
		} else {
			item.classList.remove('active__accordion')
			content.style.maxHeight = '0'
			content.style.opacity = '0'
			content.style.transform = 'translateY(-10px)'
		}
	})
})

// Обновляем высоту при изменении размера окна
window.addEventListener('resize', () => {
	document.querySelectorAll('.accordion__item.active__accordion').forEach(activeItem => {
		const content = activeItem.querySelector('.accordion__item-content')
		content.style.maxHeight = content.scrollHeight + 'px'
	})
})

///Время открытия филиала
document.addEventListener('DOMContentLoaded', () => {
	const startHour = 8
	const endHour = 18
	const now = new Date()
	const currentHour = now.getHours()

	const clock = document.querySelector('.contacts__time-clock')
	const status = document.querySelector('.contacts__time-close')
	const statusText = document.querySelector('.contacts__time-close--text')

	// ПРОВЕРКА: если элементов нет на этой странице, ничего не делаем
	if (!clock || !status || !statusText) return

	if (currentHour >= startHour && currentHour < endHour) {
		clock.classList.add('is-open')
		status.classList.add('is-open')
		statusText.textContent = 'Открыто'
	} else {
		clock.classList.add('is-closed')
		status.classList.add('is-closed')
		statusText.textContent = 'Закрыто'
	}
})

// Генерация точек (ваш код)
;(function () {
	const grid = document.getElementById('grid')
	if (!grid) return

	const rows = 12
	const cols = 12
	const total = rows * cols

	const matrixElement = document.getElementById('matrix')
	if (!matrixElement) return
	const isPurple = matrixElement.classList.contains('digital__matrix--theme-purple')
	const themeColor = isPurple ? 'rgba(188, 19, 254' : 'rgba(0, 243, 255'

	for (let i = 0; i < total; i++) {
		const dot = document.createElement('div')
		dot.className = 'digital-matrix__dot'

		const isNeon = Math.random() < 0.3
		let bgColor
		if (isNeon) {
			const neonIntensity = Math.random() * 0.7 + 0.3
			bgColor = `${themeColor}, ${neonIntensity})`
		} else {
			const gray = Math.floor(Math.random() * 25)
			const alpha = Math.random() * 0.5 + 0.1
			bgColor = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`
		}

		const duration = 2 + Math.random() * 3
		const delay = Math.random() * 2

		dot.style.backgroundColor = bgColor
		dot.style.animation = `dotPulse ${duration}s infinite ease-in-out ${delay}s`
		dot.style.opacity = '0.2'
		dot.style.transform = 'scale(0.8)'

		grid.appendChild(dot)
	}
})()
