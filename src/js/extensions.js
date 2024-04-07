import '../sass/extensions.sass'
import { navbar } from './components/navbar'
import A11yDialog from 'a11y-dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'

document.addEventListener('DOMContentLoaded', function () {
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
	new navbar()
	new themeManager()
	new gotop()
	new aos()
})
