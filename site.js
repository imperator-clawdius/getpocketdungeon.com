const API_HEALTH = 'https://api.getpocketdungeon.com/health';

const WEAPONS = [
	'battle_axe.png',
	'crossbow.png',
	'gold_hilt_sword.png',
	'great_sword.png',
	'long_sword.png',
	'longbow.png',
	'mace.png',
	'purple_bow.png',
	'quarterstaff.png',
	'rapier.png',
	'round_shield.png',
	'wooden_staff.png'
];

scatterWeapons();
checkGateway();

function scatterWeapons() {
	const field = document.getElementById('weapon-field');
	if (!field) return;
	const picks = [...WEAPONS].sort(() => Math.random() - 0.5).slice(0, 8);
	for (const [index, file] of picks.entries()) {
		const img = document.createElement('img');
		img.className = 'weapon';
		img.src = `./assets/sprites/weapons/${file}`;
		img.alt = '';
		img.style.setProperty('--x', `${8 + Math.random() * 78}%`);
		img.style.setProperty('--y', `${8 + Math.random() * 54}%`);
		img.style.setProperty('--size', `${28 + Math.random() * 34}px`);
		img.style.setProperty('--rotate', `${-34 + Math.random() * 68}deg`);
		img.style.setProperty('--alpha', `${0.38 + Math.random() * 0.34}`);
		img.style.animationDelay = `${index * 120}ms`;
		field.appendChild(img);
	}
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
