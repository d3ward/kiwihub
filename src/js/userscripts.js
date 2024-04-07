import '../sass/actions.sass'
import actions from '../data/actions.json'
import A11yDialog from 'a11y-dialog'
import { navbar } from './components/navbar'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'
import { Snackbar } from './components/snackbar'

var snackbar = new Snackbar({
	topPos: '10px',
	classNames: 'success',
	autoClose: true,
	autoCloseTimeout: 2000
})
function fixURL(value) {
	if (value.indexOf('https://') < 0 && value.indexOf('http://') < 0)
		return 'https://' + value
	return value
}

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

	// Retrieve all input fields
	const inputFields = document.querySelectorAll('.param-i')

	var codes = {}
	for (let key in actions) {
		let value = actions[key]
		codes[value.id] = value.code
	}
	// Add event listener to each input field
	inputFields.forEach((input) => {
		input.addEventListener('input', () => {
			updateCode(input)
		})
	})

	function updateCode(t) {
		console.log(t.value)

		const id = t.id.split('_')[0]
		// Get the input values for the parameters
		var code_to_replace = codes[id]
		var value = t.value
		console.log(code_to_replace)
		// Construct the regular expression pattern dynamically
		const pattern = new RegExp(`params.${t.id.split('_')[1]}`, 'g')
		if (t.id.split('_')[1] == 'url') value = fixURL(value)
		// Replace the pattern in the code snippet with the input value
		const updatedCodeSnippet = code_to_replace.replace(pattern, t.value)

		console.log(updatedCodeSnippet)

		// Update the preview code element
		const previewCode = document.getElementById('previewCode_' + id)
		if (previewCode) {
			previewCode.textContent = updatedCodeSnippet
		}
		Prism.highlightAll()
	}
})
