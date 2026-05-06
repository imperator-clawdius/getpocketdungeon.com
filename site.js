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
	try {
		const response = await fetch(API_HEALTH, { cache: 'no-store' });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		status.className = 'status ok';
		status.textContent = `Gateway online: ${data.providers?.cheap || 'cheap'} / ${data.providers?.quality || 'quality'}`;
	} catch (error) {
		status.className = 'status bad';
		status.textContent = `Gateway check failed: ${error.message}`;
	}
}
