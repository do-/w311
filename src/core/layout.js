////////////////////////////////////////////////////////////////////////////////

W311.prototype.layout = class extends W311.prototype.box {	

	async init () {
	
		let $c = this.$.children (), len = $c.length; if (len != 3) w311.croak (this.$, 'Layout must have exactly 3 panels')
		
		let a = [
			{$: this.$first = $c.first ()},
			{$: this.$last = $c.last ()},
		]
		
		for (let [name, {axis, is_last}] of Object.entries (W311.prototype.panel.prototype.get_sides ())) if (name in this) {
		
			if (this.axis) {
				
				if (this.axis.name != axis.name) w311.croak (this, 'Conflicting panel options: both X & Y axis')
			
			} else this.axis = axis
			
			a [is_last] = {...a [is_last], ...this [name]}

		}
		
		await Promise.all (a.map (o => w311.make ({type: 'panel', ...o})))

	}
	
}

1;