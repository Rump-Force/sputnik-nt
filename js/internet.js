document.addEventListener('DOMContentLoaded', () => {
	const progressCircles = document.querySelectorAll('.progress-ring__circle')

	// 1. Инициализация: мгновенно ставим в 0 БЕЗ анимации
	progressCircles.forEach(circle => {
		const radius = circle.r.baseVal.value
		const circumference = 2 * Math.PI * radius

		// Отключаем транзишн на мгновение, чтобы сбросить в 0
		circle.style.transition = 'none'
		circle.style.strokeDasharray = `${circumference} ${circumference}`
		circle.style.strokeDashoffset = circumference

		// "Форсируем" перерисовку браузером
		circle.getBoundingClientRect()

		// Возвращаем транзишн обратно
		circle.style.transition = 'stroke-dashoffset 2s ease-out'
	})

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const circle = entry.target.querySelector('.progress-ring__circle')
					const percent = entry.target.dataset.percent // берем из data-percent

					const radius = circle.r.baseVal.value
					const circumference = 2 * Math.PI * radius

					// Вычисляем отступ для нужного процента
					const offset = circumference - (percent / 100) * circumference

					// Запускаем анимацию
					circle.style.strokeDashoffset = offset

					observer.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.2 },
	) // 0.2 чтобы анимация начиналась чуть раньше

	document.querySelectorAll('.numbers--circle-line').forEach(item => {
		observer.observe(item)
	})
})
