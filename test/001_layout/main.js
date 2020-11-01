$_DRAW.main = async function () {

	return $('#page_main').html (`
		<div id=page_left width=200>nnn</div> 
		<div width=*>...</div> 
		<div id=page_right>AAA</div>
	`)

	.w311_make ({
	
		type: 'layout',
		
		left: {
			min_width: 100,
		},
		
		right: {
			resizable: false,
			size: 300,
		},
		
	})

}