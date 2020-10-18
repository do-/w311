var w311 = new W311 ()

function darn (s) {console.log (s)}

$(async () => {

	await w311.make ({panel: $('header')})
	await w311.make ({panel: $('footer')})
	await w311.make ({panel: $('nav')})
	await w311.make ({panel: {
		$: $('aside'),
		resizable: false,
		size: 300,
	}})
	
	$('header').on ('before_resize', e => {if (!confirm ('?')) e.preventDefault ()})
	$('header').on ('after_resize', function () {$(this).text ('OK')})
	
	darn (w311)

	darn ($('aside').w311)

})