var w311 = new W311 ()
var $_DRAW = {}

$_DRAW.body = async function () {

	$('body').html (`
	
		<div id=page_header>hhh</div>

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

	let [$head, $foot] = await Promise.all (['header', 'footer'].map (name => $('#page_' + name).make_w311 ('panel')))

	$head
		.on ('before_resize', e => {if (!confirm ('?')) e.preventDefault ()})
		.on ('after_resize', function () {$(this).text ('OK')})

	$_DRAW.main ()

}

$($_DRAW.body)