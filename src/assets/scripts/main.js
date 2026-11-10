(function () {
	let isDark = true;
	const saved = localStorage.getItem('theme');

	if (saved) {
		isDark = saved === 'dark';
	}

	document.documentElement.classList.toggle('dark', isDark);
	document.documentElement.classList.toggle('light', !isDark);

	let isMenuOpen = false;

	const sections = [
		'hero',
		'team-value',
		'experience',
		'stack',
		'work',
		'contact',
	];
	const navLinks = document.querySelectorAll('[data-nav]');
	const obs = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					navLinks.forEach((link) => {
						const active = link.dataset.nav === id;
						link.classList.toggle('text-[var(--primary)]', active);
						link.classList.toggle('text-[var(--text-muted)]', !active);

						const dot = link.querySelector('span.absolute');
						if (dot) {
							dot.classList.toggle('w-full', active);
							dot.classList.toggle('opacity-100', active);
							dot.classList.toggle('w-0', !active);
							dot.classList.toggle('opacity-0', !active);
						}
					});
				}
			});
		},
		{ rootMargin: '-15% 0px -75% 0px', threshold: 0 },
	);

	sections.forEach((id) => {
		const element = document.getElementById(id);
		if (element) {
			obs.observe(element);
		}
	});

	document.getElementById('theme-toggle')?.addEventListener('click', () => {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		document.documentElement.classList.toggle('light', !isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');

		const icon = document.querySelector('#theme-toggle span');
		if (icon) {
			icon.textContent = isDark ? '☀' : '☾';
		}
	});

	const menuBtn = document.getElementById('mobile-menu-btn');
	const drawer = document.getElementById('mobile-drawer');

	menuBtn?.addEventListener('click', () => {
		isMenuOpen = !isMenuOpen;

		if (drawer) {
			drawer.classList.toggle('hidden', !isMenuOpen);
		}

		const spans = menuBtn.querySelectorAll('span');
		if (spans.length >= 3) {
			spans[0].style.transform = isMenuOpen
				? 'rotate(45deg) translate(4px,4px)'
				: 'none';
			spans[1].style.opacity = isMenuOpen ? '0' : '1';
			spans[2].style.transform = isMenuOpen
				? 'rotate(-45deg) translate(4px,-4px)'
				: 'none';
		}
	});

	document.querySelectorAll('[data-nav]').forEach((button) => {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			const id = button.dataset.nav;
			isMenuOpen = false;

			if (drawer) {
				drawer.classList.add('hidden');
			}

			document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
			// if (id) {
			// 	history.pushState(null, '', `#${id}`);
			// }
		});
	});
})();