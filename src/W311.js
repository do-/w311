////////////////////////////////////////////////////////////////////////////////

class W311 {

	constructor (o) {
	
		this._ = {}
	
		this.css_prefix = '_w311_'

		for (let k in o) this [k] = o [k]
		
		$.fn.w311 = async function (action, o) {
		
			let event = $.Event (''), trigger = async (type) => {
			
				event.type = type
				event._todo = []
				event.done = p => event._todo.push (p)

				this.triggerHandler (event, o)
				
				return Promise.all (event._todo)
			
			}
			
			await  trigger ('before_' + action)
			
			if (event.isDefaultPrevented ()) return
			
			await  trigger ('do_'     + action)

			return trigger ('after_'  + action)

		}
	
	}
	
	get_class_name (s) {
	
		return w311.css_prefix + s
	
	}
	
	croak (o, msg) {
	
		console.log ({"Problem object (see error message below)": o})
		
		throw new Error (msg)
	
	}
	
	async get_$_id (pre, jq) {
	
		let el = jq [0], {id} = el; if (id) return id
		
		let {nodeName, className} = el, cls = className
			.replace (new RegExp (w311.css_prefix + '\\w+', 'g'), '')
			.replace (/\s+/g, ' ')
			.trim ()
			.replace (/\W+/g, '_')
		
		let s = pre + nodeName; if (cls) s += '_' + cls

		s = s.toLowerCase ()			
		
		for (let i = 0; true; i ++) {
		
			let id = s; if (i) id += '_' + i

			if (id in w311._) continue

			return el.id = id
		
		}
			
	}

	async keep (it, clazz) {
	
		w311._ [(await w311.get_$_id (clazz + '_', it.$))] = it
	
	}
	
	async make (src, clazz, options = {}) {

		options.$ = $(src)
		
		let it = new w311 [clazz] (options)
		
		it.$.data ('w311', it)

		it._h = {}
		
		let p = it.constructor.prototype

		while (true) {

			const wrap = '_wrap_methods_as_event_listeners', skip = {constructor: 1, init: 1}
			
			for (let k of Object.getOwnPropertyNames (p)) if (!skip [k]) it._h [k] = it [wrap] (k)

			if (wrap in it._h) break

			p = p.__proto__

		}

		await it.init ()

		await w311.keep (it, clazz)
		
		return it
	
	}
	
}

////////////////////////////////////////////////////////////////////////////////

W311.prototype.something = class {

	_wrap_methods_as_event_listeners (k) {
	
		return (e, o) => this [k] (e, o)
	
	}
	
	animate (e, o) {
	
		e.done (this.$.animate (o, {duration: 400}).promise ())
		
	}

	constructor (o) {

		for (let k in o) this [k] = o [k]

	}

}	

1;