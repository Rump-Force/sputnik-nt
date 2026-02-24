const blockItems = document.querySelectorAll('.licenses__item')
const gallery = document.querySelector('.licenses__gallery-imgs')
const galleryImg = document.querySelector('.licenses__gallery-img')
const closeBtn = document.querySelector('.button__licenses-close')
const overlayGallery = document.querySelector('.gallery__overlay')

blockItems.forEach(item => {
	item.addEventListener('click', () => {
		const imgSrc = item.dataset.img

		galleryImg.src = imgSrc
		gallery.classList.add('active-gallery')
		overlayGallery.classList.add('overlay-active')
		if (typeof lockScroll === 'function') lockScroll()
	})
})

function closeGallery() {
	gallery.classList.remove('active-gallery')
	overlayGallery.classList.remove('overlay-active')
	if (typeof unlockScroll === 'function') unlockScroll()
}

closeBtn.addEventListener('click', closeGallery)
overlayGallery.addEventListener('click', closeGallery)

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeGallery()
})
