var w311 = new W311 ()
var $_DRAW = {}

$_DRAW.body = async function () {

	$('body').html (`
		<header>
			hhh
		</header>

		<main height=*></main>

		<footer noresize>
			fff
			<br>
			fff
			<br>
			fff
			<br>
			fff
		</footer>
	`)

	await w311.make ({panel: $('footer')});

	(await $('header').make_w311 ('panel'))
		.on ('before_resize', e => {if (!confirm ('?')) e.preventDefault ()})
		.on ('after_resize', function () {$(this).text ('OK')})

	$_DRAW.main ()

}

$($_DRAW.body)