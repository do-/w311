var w311 = new W311 ()
var $_DRAW = {}

$_DRAW.body = async function () {

	$('body').html (`
	
		<div id=page_header>
			<header>
				hhh
			</header>
			<main>
				bbb
			</main>
		</div>

		<div id=page_main height=*></div>

		<div id=page_footer noresize>
			fff
			<br>
			fff
			<br>
			fff
			<br>
			fff
		</div>
	`)

	let [$head, $foot] = await Promise.all (['header', 'footer'].map (name => $('#page_' + name).w311_make ({type: 'panel', height: 150})))

	$head
		.on ('before_resize', e => {if (!confirm ('?')) e.preventDefault ()})
		.on ('after_resize', function () {$('main', this).text ('OK')})

	await $_DRAW.main ()
	
	darn (w311)

	$('._w311_panel').on ('before_resize', function () {
		darn ($(this).w311)
	})

	$('._w311_panel').on ('after_resize', function () {
		darn ($(this).w311)
	})


}

$($_DRAW.body)