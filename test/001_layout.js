var w311 = new W311 ()

function darn (s) {console.log (s)}

$(async () => {

	await w311.make ({panel: $('header')})
	await w311.make ({panel: $('footer')})
	await w311.make ({panel: $('nav')})
	await w311.make ({panel: $('aside')})
	
	$('header').on ('before_resize', e => {if (!confirm ('?')) e.preventDefault ()})
	$('header').on ('after_resize', function () {$(this).text ('OK')})
	
/*
	await w311.make ($('footer'), 'panel')
	
	await w311.make ($('nav'), 'panel', {
		sssize: 200,
	})
	
	await w311.make ($('aside'), 'panel', {
		resizable: false,
		size: 300,
	})
*/
//	$('header').on ('after_resize', () => $('header').text ('XXX'))

	darn (w311)

	darn ($('aside').data ('w311'))

	darn (w311.is_jquery_object ('aside'))

})