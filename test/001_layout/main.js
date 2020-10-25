$_DRAW.main = async function () {

	$('#page_main').html (`
		<div id=page_left width=200>nnn</div> 
		<div width=*>...</div> 
		<div id=page_right>AAA</div>
	`)
	
	return Promise.all ([

		$('#page_left').make_w311 ('panel', {
			min_width: 100,
		}),

		$('#page_right').make_w311 ('panel', {
			resizable: false,
			size: 300,
		}),

	])

}