////////////////////////////////////////////////////////////////////////////////

class W311 {

	constructor (o) {
	
		this._ = {}
	
		this.css_prefix = '_w311'

		for (let k in o) this [k] = o [k]
	
	}
	
	get_class_name (s) {
	
		return this.css_prefix + s
	
	}
	
	croak (o, msg) {
	
		console.log ({"Problem object (see error message below)": o})
		
		throw new Error (msg)
	
	}
	
	async get_$_id (jq) {
	
		let el = jq [0], {id} = el; if (id) return id
		
		let {nodeName, className} = el, cls = className
			.replace (new RegExp (w311.css_prefix + '\\w+', 'g'), '')
			.replace (/\s+/g, ' ')
			.trim ()
			.replace (/\W+/g, '_')
		
		let s = nodeName; if (cls) s += '_' + cls

		s = s.toLowerCase ()			
		
		for (let i = 0; true; i ++) {
		
			let id = s; if (i) id += '_' + i
			
			if (id in w311._) continue

			return el.id = id
		
		}
			
	}

	async keep (it, clazz) {
	
		w311._ [clazz + '_' + (await w311.get_$_id (it.$))] = it
	
	}
	
	async make (src, clazz, options = {}) {

		options.$ = $(src)
		
		let it = new w311 [clazz] (options)
		
		it._h = {}
		
		let p = it.constructor.prototype
		
		while (true) {

			for (let k of Object.getOwnPropertyNames (p)) switch (k) {

				case 'constructor':
				case 'init':
					break

				default:
					it._h [k] = it.wrap (k)

			}
			
			if ('wrap' in it._h) break
			
			p = p.__proto__

		}		
		
		await it.init ()

		await w311.keep (it, clazz)
		
		return it
	
	}
	
}

////////////////////////////////////////////////////////////////////////////////

W311.prototype.something = class {

	wrap (k) {
	
		return (e, o) => this [k] (e, o)
	
	}
	
	size (e, o) {
	
		this.$.animate (o, 10)
			
	}

	constructor (o) {

		for (let k in o) this [k] = o [k]

	}

}	

1;