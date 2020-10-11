////////////////////////////////////////////////////////////////////////////////

W311.prototype.panel_resizer = class extends W311.prototype.something {

	start (e) {
	
		this.$ghost = this.$.clone ()
			.addClass (w311.get_class_name ('_resizer_ghost'))
			.appendTo (this.parent.$)

		this.parent.$.parent ().on ('mousemove', this.h.move)

		$(window).on ('mouseup', this.h.done)
		
	}
	
	get_delta (e) {
	
		let {axis, is_last} = this.parent, {name, size, begin} = axis
			
		let delta = e ['page' + name] - this.$.offset () [begin]
		
		return is_last ? - delta : delta
	
	}

	move (e) {
		
		let {axis, is_last} = this.parent, k = axis [is_last ? 'begin' : 'end']
		
		this.$ghost.css (k, parseInt (this.$.css (k).replace ('px', '')) - this.get_delta (e))

	}

	done (e) {
	
		let {parent} = this, {size} = parent.axis
	
		this.$ghost.remove ()
	
		$(window).off ('mouseup', this.h.done)
	
		parent.$.parent ().off ('mousemove', this.h.move)

		parent.$.trigger ('size', {[size]: (this.parent.$ [size] () + this.get_delta (e))})

	}
	
	async init () {
	
		this.h = this.wrap ('move', 'done')
	
		let cls = '', html = '<div class="'; for (let k of ['resizer', this.parent.axis.name, this.parent.is_last]) {
		
			cls += '_' + k

			html += ' ' + w311.get_class_name (cls)
			
		} html += '">'

		this.$ = $(html)
			.on ('dragstart', e => e.preventDefault ())
			.on ('mousedown', e => this.start ())
			.appendTo (this.parent.$)

	}

}