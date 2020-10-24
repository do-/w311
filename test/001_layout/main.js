$_DRAW.main = async function () {

	$('main').html (`
		<nav width=200>
			nnn
		</nav>
		<div width=*>
			...
		</div>
		<aside>
			AAA
		</aside>
	`)
	
	await w311.make ({panel: $('nav')})
	
	$('aside').make_w311 ('panel', {
		resizable: false,
		size: 300,
	})

}