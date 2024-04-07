export function pagesRoute(guides) {
	var t = this
	const notFoundPage = document.querySelector('#notFound')
	t.links = Array.from(document.querySelectorAll('[topage]'))
	t.content = document.getElementById('content')
	t.scrollTop = () => {
		document.querySelector('html').scrollTop = 0
		document.querySelector('body').scrollTop = 0
	}
	t.fetch = (id) => {
		// Assuming `guides.json` or a similar endpoint that returns the article content
		console.log(id)
		id = id.replace('#', '')
		fetch(`./guides/${id}.html`)
			.then((response) => {
				// You need to return the promise from response.text()
				return response.text()
			})
			.then((data) => {
				// Assuming t.content is a DOM element where you want to load the content
				t.content.innerHTML = data
			})
			.catch((error) => {
				console.error('Error loading the article:', error)
				t.content.innerHTML = '<p>Error loading the article.</p>'
			})
	}
	t.navigate = (id) => {
		//Hide current active page
		var activePage = document.querySelector('section.page-active')
		if (activePage) {
			console.log(activePage)
			console.log(id)
			activePage.classList.remove('page-active')
		}
		
		if (id.replace('#', '') == 'home') {
			document.querySelector('#home').classList.add('page-active')
		} else {
			document.querySelector('#content').classList.add('page-active')
		}
		//Scroll to top
		t.scrollTop()
		//Set history state
		t.fetch(id)
		if (history.pushState) history.pushState(null, null, id)
		else location.hash = id
	}
	t.listeners = () => {
		t.links.forEach((page) => {
			var id = page.getAttribute('topage')
			page.addEventListener('click', () => {
				t.navigate(id)
			})
		})
	}
	if (t.links) {
		if (window.location.hash) t.navigate(window.location.hash)
		t.listeners()
	}
}
