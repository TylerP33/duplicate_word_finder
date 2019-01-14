$(document).ready(function() {
	let editor = $('#textEditor')
	editor.attr('contenteditable','true');
	let input = []
	let wordBank = []

const placeCaretAtEnd = (el) => {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

// callback is a variable that will do our magic.  It will be the function that will handle our async progress
	const words = (callback) => {
		editor.on('input', function(){
			if (!editor.html().includes('&nbsp')){
				input.push(editor.html().replace(/[\/#!$%\^&.\,?*;:{}=\-_`~()]/g,"").toLowerCase())
				console.log(input)
			}

			let last = input[input.length - 1].split(" ").sort()
			for(let i = 0; i <= last.length; i++){
				if (last[i] === last[i + 1] && last[i] !== undefined && !wordBank.includes(last[i])){
					wordBank.push(last[i])
					callback()
				}
			}	
		})

	}


	const appendDuplicate = () => {
		let appendedWord = wordBank.filter( function( item, index, inputArray ) {return inputArray.indexOf(item) == index; })
		let color =  "#" + Math.random().toString(16).slice(2, 8);
			if 	(!$("#wordBank").html().includes(appendedWord[appendedWord.length - 1])) {
					$("#wordBank").append('<span style=background-color:' + color + '>' + "\n" + appendedWord[appendedWord.length - 1] + "</span>")
					var match = new RegExp(appendedWord[appendedWord.length - 1], 'g')
					let mug = editor.html().replace(match, '<span style=background-color:' + color + '>' + "\n" + appendedWord[appendedWord.length - 1] + "</span>")
					editor.html(mug)
					placeCaretAtEnd(editor.get(0));
			}
			
	}

	const highlightWord = () => {

	}


	words(appendDuplicate)
});

