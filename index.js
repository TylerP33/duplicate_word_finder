$(document).ready(function() {
	let editor = $('#textEditor')
	let input = []
	let wordBank = []

	editor.attr('contenteditable','true');

	editor.on('input', function(){
		if (editor.html() !== '&nbsp'){
			input.push(editor.html().toLowerCase())
		}
		let last = input[input.length - 1].split(" ")
		for(let i = 0; i < last.sort().length; i++){
			if (last.sort()[i] === last.sort()[i + 1]){
				wordBank.push(last[i])
				appendedWord = wordBank.filter( function( item, index, inputArray ) {
           			return inputArray.indexOf(item) == index;
    			});
    			if (!$("#wordBank").html().includes(appendedWord[appendedWord.length - 1])) {
    					let color =  "#" + Math.random().toString(16).slice(2, 8);
						$("#wordBank").append('<span style=background-color:' + color + '>' + "\n" + appendedWord[appendedWord.length - 1] + "</span>")
						//$("#lol").html().replace(appendedWord[appendedWord.length - 1], 'good')
						// when we find a duplicate, highlight both
						// need to go into innerHTML, find the selected word, and highlight it with color
					}
				}
			}
		})
	});


	//if (editor.html().includes(appendedWord[appendedWord.length - 1])){
	//						holder.push(editor.html())
	//						let last = holder.join("").split(" ")
	//						// editor.val(last[last.length - 1]).css("color", color)
	//						let f = editor.find(appendedWord[appendedWord.length - 1]).css("color", 'red')
	//					}
