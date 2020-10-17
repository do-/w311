////////////////////////////////////////////////////////////////////////////////

W311.prototype.panel = class extends W311.prototype.something {
	
	get_types () {
	
		const {X, Y} = w311.axis; return {

			left:   {axis: X, is_last: 0},
			right:  {axis: X, is_last: 1},
			top:    {axis: Y, is_last: 0},
			bottom: {axis: Y, is_last: 1},

		}
	
	}

	async get_sibling () {

		let $sibling = this.is_last ? this.$.prev () : this.$.next ()

		if (!$sibling.length) w311.croak (this.$, 'No sibling found to make it flexible')

		return $sibling

	}
	
	async check_position () {

		let is = {}; for (let such of ['first', 'last']) is [such] = this.$.is (':'+ such + '-child')
		
		if (!is.first && !is.last) w311.croak (this.$, 'Not 1st nor last element')
		
		this.is_last = is.last ? 1 : 0

	}
	
	async check_type () {

		let t = this.get_types () [this.type]
		
		if (!t) w311.croak (this, 'Invalid type name')
		
		if (t.is_last != this.is_last) w311.croak (this, 'This cannot be the ' + type + ' panel')
		
		this.axis = t.axis

	}

	async check_axis () {
	
		this.axis = Object.values (w311.axis).find (a => this.$sibling.attr (a.size) == '*')

		if (!this.axis) w311.croak (this, 'Cannot figure out the layout orientation')
		
		if (!this.type) this.type = Object.entries (this.get_types ()).find (([k, v]) => v.is_last == this.is_last && v.axis.name == this.axis.name) [0]

	}

	async init () {
	
		if (!('resizable' in this)) this.resizable = !this.$.is ('[noresize]')

		await this.check_position ();

		if (this.type) await this.check_type ();

		(this.$sibling = await this.get_sibling ()).css ({flex: 1})
		
		if (!this.axis) await this.check_axis ();
		
		let {size} = this; if (size) this.$ [this.axis.size] (size)

		let o = {display: "flex"}; for (let k of ["flex-direction"]) o [k] = this.axis [k]

		this.$.parent ().css (o)		
		
		this.$.addClass (w311.get_class_name ('panel_' + this.type))

		await w311.make (this.$, 'splitter', {panel: this})

		this.$.on ('do_resize', this._h.animate)

	}
	
}

1;