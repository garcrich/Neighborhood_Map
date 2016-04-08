var obj = function(){
	var self = this;
	this.hello = 'hello';

	this.greet = function(){
		console.log(this.hello);
	}

	this.delayGreeting = function(){
		setTimeout(this.greet, 1000)
	}
}

var greeter = new obj();

greeter.delatGreeting;