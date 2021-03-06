////////////////////////////////////////////////////////////////////////////////

function darn (s) {console.log (s)}

////////////////////////////////////////////////////////////////////////////////

class W311 {

	constructor (o) {
	
		this._ = {}
	
		this.css_prefix = '_w311_'

		this.jquery_version = $.prototype.jquery

		for (let k in o) this [k] = o [k]
		
		Object.defineProperty ($.prototype, "w311", {get: function () {return this.data ('w311')}})
		
		$.fn.trigger_handler = async function (e) {
		
			e._todo = []; e.done = p => e._todo.push (p)

			this.triggerHandler (e, o)

			return Promise.all (e._todo)

		}
		
		$.fn.w311_make= async function (o) {
			if (typeof (o) == 'string') o = {type: o}
			o.$ = this			
			await w311.make (o)			
			return this
		}

	}
	
	is_jquery_object (o) {
	
		return o && typeof (o) == 'object' && o.jquery == w311.jquery_version

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
	
	add_methods_as_event_listeners (it) {
	
		let wrap = '_wrap_methods_as_event_listeners', skip = {constructor: 1, init: 1}, h = {}
		
		for (let p = it.constructor.prototype; !(wrap in h); p = p.__proto__) 

			for (let k of Object.getOwnPropertyNames (p)) if (!skip [k]) h [k] = it [wrap] (k)
		
		delete h [wrap]; it._h = h 

	}
	
	async make (options) {
	
		function add (o, d) {
		
			for (let k in d) if (!(k in o)) {

				let v = d [k]

				if (v != null) o [k] = v

			}

		}	

		let {type} = options; if (!type) w311.croak (options, 'Undefined type')

		let fact = w311 [type]; if (!fact) w311.croak (options, 'Unknown type: ' + type)

		delete options.type; let it = new fact (options)

		if ('$' in options) add (it, (await it.get_dom_options (options.$)))

		add (it, (await it.get_defaults ()))

		this.add_methods_as_event_listeners (it)

		await it.init ()

		await w311.keep (it, type)

		if (!it.$) return it

		it.$.data ('w311', it)

		if (it.id && !it.$ [0].id) it.$ [0].id = it.id

		return it

	}
		
}

1;