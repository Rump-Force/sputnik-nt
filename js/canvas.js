;(function () {
	const bannerSection = document.querySelector('.banner')
	const canvas = document.getElementById('gridCanvas')
	const ctx = canvas.getContext('2d')

	let w, h
	let mouseX = -1000,
		mouseY = -1000
	let mouseInside = false
	let frameId = null // Для контроля анимации

	const STEP = 48
	const HOVER_RADIUS = 200
	const BG_DOT_OPACITY = 0.1
	const HOVER_DOT_OPACITY = 0.8
	const LINE_OPACITY = 0.15
	const LINE_COLOR = '#00efff'

	function resize() {
		w = bannerSection.offsetWidth // Берем ширину секции
		h = bannerSection.offsetHeight // И высоту секции
		canvas.width = w
		canvas.height = h
		draw()
	}

	function onMouseMove(e) {
		const rect = canvas.getBoundingClientRect()
		mouseX = e.clientX - rect.left
		mouseY = e.clientY - rect.top
		mouseInside = true

		// Чтобы не перегружать проц, отменяем прошлый кадр перед новым
		if (frameId) cancelAnimationFrame(frameId)
		frameId = requestAnimationFrame(draw)
	}

	function onMouseLeave() {
		mouseInside = false
		if (frameId) cancelAnimationFrame(frameId)
		frameId = requestAnimationFrame(draw)
	}

	// --- ВАЖНО: Слушаем ТОЛЬКО bannerSection ---
	window.addEventListener('resize', resize)
	bannerSection.addEventListener('mousemove', onMouseMove)
	bannerSection.addEventListener('mouseleave', onMouseLeave)

	function isInside(x, y) {
		if (!mouseInside) return false
		const dx = x - mouseX
		const dy = y - mouseY
		return dx * dx + dy * dy <= HOVER_RADIUS * HOVER_RADIUS
	}

	function draw() {
		ctx.clearRect(0, 0, w, h)

		const cols = Math.ceil(w / STEP) + 1
		const rows = Math.ceil(h / STEP) + 1
		const points = []

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				points.push({ x: col * STEP, y: row * STEP })
			}
		}

		ctx.lineWidth = 1
		ctx.strokeStyle = LINE_COLOR
		ctx.globalAlpha = LINE_OPACITY

		// Линии
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols - 1; col++) {
				const idx = row * cols + col
				ctx.beginPath()
				ctx.moveTo(points[idx].x, points[idx].y)
				ctx.lineTo(points[idx + 1].x, points[idx + 1].y)
				ctx.stroke()
			}
		}
		for (let row = 0; row < rows - 1; row++) {
			for (let col = 0; col < cols; col++) {
				const idx = row * cols + col
				ctx.beginPath()
				ctx.moveTo(points[idx].x, points[idx].y)
				ctx.lineTo(points[idx + cols].x, points[idx + cols].y)
				ctx.stroke()
			}
		}

		// Точки
		ctx.fillStyle = LINE_COLOR
		ctx.globalAlpha = BG_DOT_OPACITY
		for (let p of points) {
			ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1)
		}

		if (mouseInside) {
			ctx.globalAlpha = HOVER_DOT_OPACITY
			for (let p of points) {
				if (isInside(p.x, p.y)) {
					ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1)
				}
			}
		}
	}

	resize()
})()
