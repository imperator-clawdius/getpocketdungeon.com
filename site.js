const API_HEALTH = 'https://api.getpocketdungeon.com/health';

checkGateway();
initLocationSlideshow();

function initLocationSlideshow() {
	const root = document.querySelector('[data-slideshow]');
	if (!root) return;

	const slides = Array.from(root.querySelectorAll('.location-slide'));
	const dots = Array.from(root.querySelectorAll('[data-slide-dot]'));
	const previous = root.querySelector('[data-slide-prev]');
	const next = root.querySelector('[data-slide-next]');
	if (!slides.length) return;

	let activeIndex = 0;

	function showSlide(index) {
		activeIndex = (index + slides.length) % slides.length;
		for (const [slideIndex, slide] of slides.entries()) {
			const isActive = slideIndex === activeIndex;
			slide.classList.toggle('active', isActive);
			slide.setAttribute('aria-hidden', String(!isActive));
		}
		for (const [dotIndex, dot] of dots.entries()) {
			const isActive = dotIndex === activeIndex;
			dot.classList.toggle('active', isActive);
			dot.setAttribute('aria-selected', String(isActive));
		}
	}

	previous?.addEventListener('click', () => showSlide(activeIndex - 1));
	next?.addEventListener('click', () => showSlide(activeIndex + 1));
	for (const [index, dot] of dots.entries()) {
		dot.addEventListener('click', () => showSlide(index));
	}

	showSlide(0);
}

async function checkGateway() {
	const status = document.getElementById('gateway-status');
	if (!status) return;
	const controller = new AbortController();
	const timeout = window.setTimeout(() => controller.abort(), 4500);
	try {
		const response = await fetch(API_HEALTH, {
			cache: 'no-store',
			credentials: 'omit',
			referrerPolicy: 'strict-origin-when-cross-origin',
			signal: controller.signal
		});
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		status.className = 'status ok';
		status.textContent = data.ok
			? 'Closed-test gateway reachable. Game systems remain private.'
			: 'Gateway responded, but the closed test is not fully ready.';
	} catch (error) {
		status.className = 'status bad';
		status.textContent = error.name === 'AbortError'
			? 'Gateway check timed out. The app may still be reachable from tester builds.'
			: 'Gateway check unavailable from this browser session.';
	} finally {
		window.clearTimeout(timeout);
	}
}
