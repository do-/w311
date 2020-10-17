////////////////////////////////////////////////////////////////////////////////

W311.prototype.splitter = class extends W311.prototype.something {

	start (e) {
	
		this.$ghost = $('div', this.$).clone ()
			.addClass (w311.get_class_name ('ghost'))
			.appendTo (this.$)

		this.panel.$.parent ().on ('mousemove', this._h.move)

		$(window).on ('mouseup', this._h.done)
		
	}
	
	get_delta (e) {
	
		let {axis, is_last} = this.panel, {name, size, begin} = axis
			
		let delta = e ['page' + name] - this.$.offset () [begin]
		
		return is_last ? - delta : delta
	
	}

	move (e) {
		
		let {axis, is_last} = this.panel, k = axis [is_last ? 'begin' : 'end']
		
		this.$ghost.css (k, parseInt (this.$.css (k).replace ('px', '')) - this.get_delta (e))

	}

	done (e) {
	
		let {panel} = this, {size} = panel.axis
	
		this.$ghost.remove ()

		$(window).off ('mouseup', this._h.done)

		panel.$.parent ().off ('mousemove', this._h.move)

		panel.$.w311 ('resize', {[size]: (panel.$ [size] () + this.get_delta (e))})

	}
	
	async init () {
	
		let {panel} = this, other = [panel.axis.name, this.panel.is_last] // e. g. [X, 0] or [Y, 1]
		
		if (panel.resizable) other.push ('hover')

		let cls = main => [main, ...other].map (w311.get_class_name).join (' ')
		
		let html = `
			<div class="${cls('splitter_container')}">
				<div class="${cls('splitter')}" />
			</div>
		`

		this.$ = $(html)
			.on ('dragstart', e => e.preventDefault ())
			['insert' + (panel.is_last ? 'Before' : 'After')] (panel.$)
			
		if (panel.resizable) this.$.on ('mousedown', e => this.start ())

	}

}