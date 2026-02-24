// Проверяем поддержку IntersectionObserver и наличие элемента
const progress = document.querySelector('.digital-player__progress')

if (progress && window.IntersectionObserver) {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						progress.classList.add('is-active')
					}, 1500) // задержка 1.5 секунды (если нужно 2 секунды, измените на 2000)
				}
			})
		},
		{
			threshold: 0.6, // 60% блока видно
		},
	)

	observer.observe(progress)
} else if (progress) {
	// Fallback: если IntersectionObserver не поддерживается, просто активируем через 1.5 сек
	setTimeout(() => {
		progress.classList.add('is-active')
	}, 1500)
}
