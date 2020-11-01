////////////////////////////////////////////////////////////////////////////////

W311.prototype.box = class {
	
	async get_defaults () {return {}}
	
	async get_dom_options (jq) {return {

		id: jq.attr ('id')

	}}

	constructor (o) {

		for (let k in o) this [k] = o [k]

	}
	
	async do (action, o) {

		let e = $.Event ('before_' + action); 

		await  this.$.trigger_handler (e, o); if (e.isDefaultPrevented ()) return

		await  this ['do_' + action] (o)

		return this.$.trigger_handler ($.Event ('after_' + action), o)

	}

	_wrap_methods_as_event_listeners (k) {
	
		return (e, o) => this [k] (e, o)
	
	}

}

1;