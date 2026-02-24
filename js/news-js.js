// Выносим иконки в константы, чтобы не дублировать их в каждой карточке
const CLOCK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card__tabs-icon card__time-icon" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>`
const ARROW_ICON = `<i class="ri-arrow-right-line"></i>`

const newsData = [
	{
		id: 27,
		// КТВ
		category: 'ktv',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'ktv',
		tagText: 'КТВ',
		time: '22.02.2026, 11:00',
		title: 'Временное отключение канала «Cinema HD»',
		titleClass: '',
		text: 'Канал временно недоступен по техническим причинам правообладателя.',
	},
	{
		id: 22,
		// Тех работы
		category: 'works',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'works',
		tagText: 'Тех. Работы',
		time: '21.02.2026, 00:00',
		title: 'Ночная модернизация узла связи',
		titleClass: '',
		text: 'Работы направлены на увеличение пропускной способности сети.',
	},
	{
		id: 21,
		// Объявление
		category: 'ads',
		size: 'tall', //'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'февраль 21, 12:30',
		title: 'Бонус за автоплатеж',
		titleClass: 'main-news',
		text: 'Подключите автоплатеж и получите 5% бонусов на лицевой счет.',
		offices: [
			{ title: 'Онлайн-кабинет', text: 'Доступно 24/7' },
			{ title: 'Поддержка', text: 'Консультация по настройке автоплатежа' },
		],
		modalDetails: '',
		img: '',
	},
	{
		id: 20,
		// КТВ
		category: 'ktv',
		size: 'tall', //'big' или 'wide' или "tall"
		tagClass: 'ktv',
		tagText: 'КТВ',
		time: 'февраль 20, 10:00',
		title: 'Добавлен канал «Travel HD»',
		titleClass: '',
		text: 'В пакет «Базовый» добавлен новый познавательный телеканал в HD качестве.',
	},
	{
		id: 19,
		category: 'works',
		size: 'wide',
		tagClass: 'works',
		tagText: 'Тех. Работы',
		time: 'Февраль 18, 02:00',
		title: 'Модернизация сети в районе «Восточный»',
		titleClass: '',
		text: 'С 02:00 до 04:00 возможны кратковременные перебои связи. Работы направлены на увеличение пропускной способности сети.',
	},
	{
		id: 18,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: '16.02.2026, 11:00',
		title: 'Новый тариф «Старт+»',
		titleClass: '',
		text: 'Запущен тариф со скоростью до 200 Мбит/с по выгодной цене для новых абонентов.',
	},

	{
		id: 17,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'big', //'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: '14, 09:30',
		title: 'Уважаемые абоненты! График работы в праздничные дни',
		titleClass: 'main-news', // спец. класс для заголовка
		text: 'Обращаем ваше внимание на изменения в режиме работы Центров Продаж и Обслуживания...',
		// Массив офисов (только для больших карточек)
		offices: [
			{ title: 'Центральный Офис (ул. Ленина, 54)', text: '09:00 — 14:00 (без перерыва)' },
			{ title: 'Макеевка, ул. Лебедева, д. 1', text: 'Выходной' },
			{ title: 'Техническая поддержка', text: 'Круглосуточно 24/7' },
		],
		modalDetails: '',
		img: '',
	},
	{
		id: 16,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'wide', // 'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Февраль 14, 09:00',
		title: 'Праздничные бонусы для абонентов"',
		titleClass: '', // спец. класс для заголовка
		text: 'В честь Дня всех влюбленных мы дарим всем клиентам дополнительный трафик 50 ГБ на неделю. Активировать можно в личном кабинете.',
		// Массив офисов (только для больших карточек)
		modalDetails:
			'Бонус будет доступен в течение 7 дней с момента активации. Успейте воспользоваться приятным дополнением, чтобы оставаться на связи с самыми близкими людьми.',
		img: 'images/img/6.webp',
	},
	{
		id: 15,
		// КТВ
		category: 'ktv',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'ktv',
		tagText: 'КТВ',
		time: 'Январь, 10:00',
		title: 'Изменения в сетке вещания КТВ',
		titleClass: '',
		text: 'В пакет "Базовый" добавлены новые телеканалы в HD качестве: "Наука 2.0", "Моя Планета" и "History HD". Обновите список каналов на вашем ТВ".',
	},
	{
		id: 14,
		// Тех работы
		category: 'works',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'works',
		tagText: 'Тех. Работы',
		time: 'Январь 15, 10:00',
		title: 'Плановые технические работы',
		titleClass: '',
		text: 'В ночь с 10 на 11 февраля будут проводиться работы по модернизации узла связи в районе «Центральный». Возможны кратковременные перерывы связи длительностью до 15 минут.".',
	},
	{
		id: 13,
		// Объявление
		category: 'ads',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Март, 10:00',
		title: 'Мы в социальных сетях!',
		text: 'Подписывайтесь на наши официальные каналы, чтобы первыми узнавать о новостях, авариях и специальных предложениях.',
		// Добавляем массив соцсетей
		socials: [
			{ link: '#', class: 'telegram', icon: 'ri-telegram-2-line', name: 'Telegram' },
			{ link: '#', class: 'vk', icon: 'ri-vk-line', name: 'VKontakte' },
		],
		hideButton: true, // Флаг, чтобы скрыть кнопку "Подробнее"
	},
	{
		id: 12,
		category: ['ktv', 'ads'], // Массив для фильтрации
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: ['ktv', 'advertisements'], // Массив классов
		tagText: ['КТВ', 'Объявление'], // Массив текстов
		time: 'Январь 05, 10:00',
		title: 'Изменения в сетке КТВ',
		titleClass: '',
		text: `В пакет «Максимальный» добавлены новые каналы в HD качестве. Теперь вам доступны: 
               <span class="card__text--accent">Nat Geo Wild</span>, 
               <span class="card__text--accent">Viasat Sport</span> и 
               <span class="card__text--accent">Киносемья</span>. 
               Для обновления списка каналов, пожалуйста, выполните автопоиск на вашем телевизоре.`,
	},
	{
		id: 11,
		// Тех работы
		category: 'works', //Тег фильтров
		size: 'wide', //Размер секции 'big' или 'wide' или "tall"
		tagClass: 'works', //Тег
		tagText: 'Тех. Работы',
		time: 'Январь 20, 10:00',
		title: 'Плановая модернизация оборудования',
		titleClass: '',
		text: '5 марта с 02:00 до 06:00 будут проводиться работы по замене магистрального узла в районе "Зеленый". Возможны перерывы в доступе к сети Интернет до 30 минут.',
	},
	{
		id: 10,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'tall', // 'big' или 'wide' или "tall" "
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Январь 30, 13:15',
		title: 'Оплата через СБП без комиссии',
		titleClass: '', // спец. класс для заголовка
		text: 'Теперь оплачивать услуги Sputnik.Net стало еще проще. Используйте Систему Быстрых Платежей в личном кабинете. Зачисление средств — мгновенно.',
	},
	{
		id: 9,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'tall', // 'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Февраль 8, 13:15',
		title: 'Запуск линейки "Космос"',
		titleClass: '', // спец. класс для заголовка
		text: 'Сверхскоростной интернет до 1000 Мбит/с теперь доступен для подключения в частном секторе.',
	},
	{
		id: 8,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'wide', // 'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Декабрь 28, 2025',
		title: 'Праздничные бонусы для абонентов',
		titleClass: '', // спец. класс для заголовка
		text: 'В честь новогодних праздников предоставляется дополнительный трафик 50 ГБ на неделю. Активировать можно в личном кабинете.',
		// Массив офисов (только для больших карточек)
	},
	{
		id: 7,
		// Тех работы
		category: 'works', //Тег фильтров
		size: 'wide', //Размер секции 'big' или 'wide' или "tall"
		tagClass: 'works', //Тег
		tagText: 'Тех. Работы',
		time: 'Декабрь 25, 2025',
		title: 'Плановые работы на узле «Северный»',
		titleClass: '',
		text: 'С 23:00 до 03:00 возможны кратковременные отключения интернета. Работы проводятся для повышения стабильности сети.',
	},
	{
		id: 6,
		// КТВ
		category: 'ktv',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'ktv',
		tagText: 'КТВ',
		time: 'Декабрь 22, 2025',
		title: 'Расширение HD-пакета «Спорт»',
		titleClass: '',
		text: 'Добавлены каналы  <span class="card__text--accent">Eurosport 1 HD</span>,  <span class="card__text--accent">Eurosport 2 HD</span> и  <span class="card__text--accent">FightBox HD</span>.',
	},
	{
		id: 5,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'wide', // 'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Декабрь 20, 2025',
		title: 'Обновление мобильного приложения',
		titleClass: '', // спец. класс для заголовка
		text: 'Скачайте последнюю версию приложения Sputnik.Net с поддержкой push-уведомлений о новых акциях и авариях.',
		// Массив офисов (только для больших карточек)
	},
	{
		id: 4,
		// Объявление
		category: 'ads', // для фильтрации
		size: 'wide', // 'big' или 'wide' или "tall"
		tagClass: 'advertisements',
		tagText: 'Объявление',
		time: 'Декабрь 12, 2025',
		title: 'Скидка на подключение интернета',
		titleClass: '', // спец. класс для заголовка
		text: 'При подключении домашнего интернета до конца месяца — скидка 15%.',
		// Массив офисов (только для больших карточек)
	},
	{
		id: 3,
		// Тех работы
		category: 'works', //Тег фильтров
		size: 'big', //Размер секции 'big' или 'wide' или "tall"
		tagClass: 'works', //Тег
		tagText: 'Тех. Работы',
		time: 'Декабрь 10, 2025',
		title: 'Проверка резервных каналов',
		titleClass: '',
		text: 'В период с 22:00 до 02:00 возможны кратковременные сбои в интернет-соединении.',
	},
	{
		id: 2,
		// Тех работы
		category: 'works', //Тег фильтров
		size: 'wide', //Размер секции 'big' или 'wide' или "tall"
		tagClass: 'works', //Тег
		tagText: 'Тех. Работы',
		time: 'Декабрь 03, 2025',
		title: 'Профилактика оборудования в районе «Южный»',
		titleClass: '',
		text: 'С 02:00 до 05:00 возможны кратковременные перебои в работе телевидения и интернета.',
	},
	{
		id: 1,
		// КТВ
		category: 'ktv',
		size: 'wide', //'big' или 'wide' или "tall"
		tagClass: 'ktv',
		tagText: 'КТВ',
		time: 'Декабрь 01, 2025',
		title: 'Добавлены музыкальные каналы',
		titleClass: '',
		text: 'Теперь доступны: <span class="card__text--accent">«MTV HD»</span></span>, <span class="card__text--accent">«VH1 Classic HD»</span>, <span class="card__text--accent">«Муз-ТВ HD»</span>. ',
	},
]

// 3. ПЕРЕМЕННЫЕ ЭЛЕМЕНТОВ
let currentFilter = 'all'
let visibleCount = 5

const container = document.getElementById('news-container')
const loadMoreBtn = document.getElementById('load-more')

// Элементы модалки
const newsModal = document.querySelector('.news--modal')
const modalTag = newsModal.querySelector('.modal-header-tag')
const modalTitle = newsModal.querySelector('.modal__title')
const modalTime = newsModal.querySelector('.modal__time-text')
const modalDesc = newsModal.querySelector('.modal__description')
const modalDetails = newsModal.querySelector('.modal__details')
const modalImg = newsModal.querySelector('.modal__image')

const newOverlay = document.querySelector('.news__overlay')

// --- ДОБАВЬ ЭТОТ БЛОК ЯВНО ВЫШЕ ОБРАБОТЧИКОВ ---

function openNewsModal(data) {
	if (!data) return

	// Проверяем наличие элементов перед обновлением, чтобы не было ошибок
	if (modalTag) {
		modalTag.textContent = Array.isArray(data.tagText) ? data.tagText[0] : data.tagText
		modalTag.className = 'modal-header-tag'
		const activeClass = Array.isArray(data.tagClass) ? data.tagClass[0] : data.tagClass
		modalTag.classList.add(activeClass)
	}

	if (modalTitle) modalTitle.textContent = data.title
	if (modalTime) modalTime.textContent = data.time
	if (modalDesc) modalDesc.innerHTML = data.text
	if (modalDetails)
		modalDetails.textContent = data.modalDetails || 'Подробности уточняйте у оператора.'

	if (data.img && modalImg) {
		modalImg.src = data.img
		modalImg.style.display = 'block'
	} else if (modalImg) {
		modalImg.style.display = 'none'
	}

	if (newsModal) {
		newsModal.classList.add('modal--active')
		// Активируем оверлей
		if (newOverlay) newOverlay.classList.add('active')
		document.body.style.overflow = 'hidden'
	}
}

// --- ТЕПЕРЬ ИДУТ ОБРАБОТЧИКИ ---

container.addEventListener('click', e => {
	const btn = e.target.closest('.card__info-button')
	if (!btn) return

	const newsId = parseInt(btn.dataset.id)
	const newsItem = newsData.find(item => item.id === newsId)

	if (newsItem) {
		openNewsModal(newsItem) // Теперь она точно будет видна!
	}
})

// 4. ФУНКЦИИ
function createCard(item) {
	const tagsArr = Array.isArray(item.tagClass) ? item.tagClass : [item.tagClass]
	const textsArr = Array.isArray(item.tagText) ? item.tagText : [item.tagText]
	const tagsHtml = tagsArr
		.map((cls, i) => `<div class="card__tag ${cls}">${textsArr[i]}</div>`)
		.join('')

	const socialsHtml = item.socials
		? `<div class="card__social mb">${item.socials.map(soc => `<a href="${soc.link}" class="card__social-link social--${soc.class}"><i class="${soc.icon}"></i><div class="card__social-title">${soc.name}</div></a>`).join('')}</div>`
		: ''

	const officesHtml = item.offices
		? `<div class="card__information"><div class="card__items">${item.offices.map(off => `<div class="card__item"><div class="card__item-content"><div class="card__item-title">${off.title}</div><div class="card__item-text">${off.text}</div></div></div>`).join('')}</div></div>`
		: ''

	const buttonHtml = item.hideButton
		? ''
		: `<div class="card__info-button" data-id="${item.id}"><span class="card__info-button-text">Подробнее</span><span class="card__info-button-icon">${ARROW_ICON}</span></div>`

	return `
        <article class="card card--${item.size}" data-size="${item.size}">
            <div class="card__wrapper">
                <div class="card__wrap">${tagsHtml}<div class="card__time"><div class="card__time-icons">${CLOCK_ICON}</div><div class="card__time-text">${item.time}</div></div></div>
                <div class="card__content">
                    <div class="card__title ${item.titleClass || ''}">${item.title}</div>
                    <div class="card__text">${item.text}</div>
                </div>
                ${officesHtml}
                ${socialsHtml}
                <div class="card__line"></div>
                <div class="card__info">
                    <div class="card__info-actions"><div class="card__info-action card__info--n">N</div><div class="card__info-action card__info--t">T</div></div>
                    ${buttonHtml}
                </div>
            </div>
        </article>`
}

function renderNews(isAppending = false) {
	if (!container) return

	// Если это не дозагрузка, а смена таба — плавно скрываем контейнер
	if (!isAppending) {
		container.classList.add('filtering')
	}

	setTimeout(
		() => {
			// 🔥 Фильтрация + сортировка в одном месте
			const filtered = newsData
				.filter(item => {
					if (currentFilter === 'all') return true
					return Array.isArray(item.category)
						? item.category.includes(currentFilter)
						: item.category === currentFilter
				})
				.sort((a, b) => b.id - a.id) // ← новые (с бóльшим id) первыми!

			// Вычисляем, какие карточки новые
			const startIndex = isAppending ? container.querySelectorAll('.card').length : 0
			const slice = filtered.slice(startIndex, visibleCount)

			const newCardsHtml = slice.map(item => createCard(item)).join('')

			if (isAppending) {
				container.insertAdjacentHTML('beforeend', newCardsHtml)
			} else {
				container.innerHTML = newCardsHtml
				container.classList.remove('filtering')
			}

			// Анимируем только новые карточки
			const cards = container.querySelectorAll('.card')
			cards.forEach((card, index) => {
				if (!card.classList.contains('show')) {
					const delayIndex = isAppending ? index - startIndex : index
					setTimeout(() => {
						card.classList.add('show')
					}, delayIndex * 100)
				}
			})

			// Управляем кнопкой "Загрузить еще"
			if (loadMoreBtn) {
				loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'flex'
			}
		},
		isAppending ? 0 : 300,
	)
}

// ОБРАБОТЧИКИ (Обновленные)

loadMoreBtn?.addEventListener('click', () => {
	visibleCount += 5 // Увеличиваем счетчик на 5
	renderNews(true) // Передаем true (режим добавления)
})

document.querySelectorAll('.news__button[data-filter]').forEach(btn => {
	btn.addEventListener('click', e => {
		document.querySelector('.news__button-active')?.classList.remove('news__button-active')
		e.target.classList.add('news__button-active')

		currentFilter = e.target.dataset.filter
		visibleCount = 5 // Сбрасываем до начальных 5 при смене категории
		renderNews(false) // Передаем false (режим полной перезагрузки)
	})
})

// Твой код клика по контейнеру ОСТАЕТСЯ и БУДЕТ РАБОТАТЬ для новых карточек
container.addEventListener('click', e => {
	const btn = e.target.closest('.card__info-button')
	if (!btn) return
	const newsId = parseInt(btn.dataset.id)
	const newsItem = newsData.find(item => item.id === newsId)
	if (newsItem) openNewsModal(newsItem)
})

// Закрытие
const closeBtns = [
	newsModal.querySelector('.modal-header-close'),
	newsModal.querySelector('.modal__button-back'),
]

// Функция для закрытия (чтобы не дублировать код)
function closeAllModals() {
	newsModal.classList.remove('modal--active')
	if (newOverlay) newOverlay.classList.remove('active')
	document.body.style.overflow = ''
}

// Применяем ко всем кнопкам закрытия
closeBtns.forEach(btn => {
	btn?.addEventListener('click', closeAllModals)
})

// Закрытие при клике на сам оверлей
newOverlay?.addEventListener('click', closeAllModals)

// (Опционально) Закрытие по кнопке Esc
document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeAllModals()
})

// СТАРТ
renderNews()
