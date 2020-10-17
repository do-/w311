var w311 = new W311 ()

function darn (s) {console.log (s)}

$(async () => {

	await w311.make ($('header'), 'panel')
	await w311.make ($('footer'), 'panel')
	await w311.make ($('nav'), 'panel')
	await w311.make ($('aside'), 'panel')

//	$('header').on ('after_resize', () => $('header').text ('XXX'))

	darn (w311)

})
