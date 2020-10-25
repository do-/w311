////////////////////////////////////////////////////////////////////////////////

W311.prototype.splitter = class extends W311.prototype.box {

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

	get_new_size (e) {
	
		let {panel} = this, {size} = panel.axis

		return panel.$ [size] () + this.get_delta (e)
	
	}

	move (e) {
		
		let 
			{axis, is_last, min_size, max_size} = this.panel, 		
			k = axis [is_last ? 'begin' : 'end'],
			new_size = this.get_new_size (e)
			
		let d = this.get_delta (e)
	
		if (max_size && new_size > max_size) {
			d -= (new_size - max_size)
		}
		else if (min_size && new_size < min_size) {
			d += (min_size - new_size)
		}

		this.$ghost.css (k, parseInt (this.$.css (k)) - d)

	}

	done (e) {
	
		let {panel} = this, {min_size, max_size} = panel, {size} = panel.axis
	
		this.$ghost.remove ()

		$(window).off ('mouseup', this._h.done)

		panel.$.parent ().off ('mousemove', this._h.move)
		
		let new_size = this.get_new_size (e)

		if (max_size && new_size > max_size) {
			new_size = max_size
		}
		else if (min_size && new_size < min_size) {
			new_size = min_size
		}

		panel.do ('resize', {[size]: new_size})

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
			.on ('mouseover', e => window.getSelection ().removeAllRanges ())
			['insert' + (panel.is_last ? 'Before' : 'After')] (panel.$)
			
		if (panel.resizable) this.$.on ('mousedown', e => this.start ())

	}

}

1;