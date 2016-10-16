var Promise = require("bluebird");

function st(time, cb){
	return setTimeout(cb, time);
}

var stp = Promise.promisify(st);

function throttler(delay){
	const DELAY = delay;
	var last_request = -Infinity;
	var queue = [];

	function delta(){
		return Date.now() - last_request;
	}

	function update_ts(){
		last_request = Date.now();
	}

	function add_to_queue(fn){
		return new Promise(function(resolve, reject){
			var qf = function(){
				Promise.resolve(fn()).then(function(result){
					resolve(result);
					update_ts();
				}).catch(reject);
			};
			queue.push(qf);
		});
	}

	function clear_queue(){
		if(queue.length && delta() >= DELAY){
			var qf = queue.shift();
			qf();
			update_ts();
		}
		if(queue.length){
			setTimeout(clear_queue, DELAY);
		}
	}

	return function(fn){
		if(delta() < DELAY ){
			var p = add_to_queue(fn);
			clear_queue();
			return p;
		} else {
			update_ts();
			return fn();
		}
	};
}

module.exports = throttler;
