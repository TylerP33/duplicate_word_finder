$(document).ready(function() {
	let editor = $('#textEditor')
	let input = []
	let wordBank = []
	let sortedInput;
	editor.attr('contenteditable','true');

	const placeCaretAtEnd = (el) => {
    	el.focus();
    	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
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

	const gatherInput = (callback) => {
		editor.on('input', function(){
			if (!editor.html().includes("nbsp")){
				input.push(editor.html().replace(/[\/#!$%\^&.\,?*;:{}=\-_`~()]/g,"").toLowerCase())
			}

			sortedInput = input[input.length - 1].split(" ").sort()
			for(let i = 0; i <= sortedInput.length; i++){
				if (sortedInput[i] === sortedInput[i + 1] && sortedInput[i] !== undefined && !wordBank.includes(sortedInput[i]) && !sortedInput[i].includes(`style"`)){
					wordBank.push(sortedInput[i])
					callback()
				}
			}	
		})

	}

	const appendDuplicate = () => {
		let color =  "#" + Math.random().toString(16).slice(2, 8);
		let appendedWord = wordBank.filter( function( item, index, inputArray ) {return inputArray.indexOf(item) == index; })
		let spanColor = ' <span style=background-color:' + color + '>' + "\n" + appendedWord[appendedWord.length - 1] + "</span>"
		var match = new RegExp(appendedWord[appendedWord.length - 1], 'ig')
			if 	(!$("#wordBank").html().includes(appendedWord[appendedWord.length - 1])) {
					$("#wordBank").append(spanColor)
					let addColor = editor.html().replace(match, spanColor)
					editor.html(addColor)
					editor[0].appendChild(document.createTextNode( '\uFEFF' ));
					placeCaretAtEnd(editor.get(0));
			} 
	}

	const removeSpanOnDelete = () => {
			editor.on('keydown', function(event) {
    			if (event.which == 8) {
       				s = window.getSelection();
        			r = s.getRangeAt(0)
        			el = r.startContainer.parentElement
        		if (el.classList.contains('label')) {
            		if (r.startOffset == r.endOffset && r.endOffset == el.textContent.length) {
                		event.preventDefault();
                if (el.classList.contains('highlight')) {
                    	el.remove();
                        editor.html("")
                	} else {
                    	el.classList.add('highlight');
                	}
                	return;
            		}
        		}	
   			}
    		event.target.querySelectorAll('span.label.highlight').forEach(function(el) { el.classList.remove('highlight');})
   		});
	}

	gatherInput(appendDuplicate)
	removeBr()
});

