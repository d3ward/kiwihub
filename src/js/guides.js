import '../sass/guides.sass'
import { navbar } from './components/navbar'
import A11yDialog from 'a11y-dialog'
import guides from '../data/guides.json'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'
import { pagesRoute } from './components/pagesRoute'

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	const dialog_support = new A11yDialog(
		document.querySelector('#dlg_support')
	)
	dialog_support.on(
		'show',
		() => (document.documentElement.style.overflowY = 'hidden')
	)
	dialog_support.on(
		'hide',
		() => (document.documentElement.style.overflowY = '')
	)
	new themeManager()
	new navbar()
	new gotop()
	new aos()
	new pagesRoute(guides)
})
