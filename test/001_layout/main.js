$_DRAW.main = async function () {

	$('main').html (`
		<nav width=200>nnn</nav> 
		<div width=*>...</div> 
		<aside>AAA</aside>
	`)
		
	$('nav').make_w311 ('panel', {
		min_width: 100,
	})

	$('aside').make_w311 ('panel', {
		resizable: false,
		size: 300,
	})

}