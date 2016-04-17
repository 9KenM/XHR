Core.addModule((function(){


	var request = function(param){
		return new Promise(function(resolve, reject){
			var payload;
			var xhr = new XMLHttpRequest();
			xhr.open(param.method, param.path);
			xhr.onload = function(){
				if (xhr.status == 200) {
					resolve(xhr.response);
				}
				else {
					reject(Error(xhr.statusText));
				}
			}
			xhr.onerror = function(){
				reject(Error('Network Error'));
			}
			if(param.header){
				for(var key in param.header){
					xhr.setRequestHeader(key, param.header[key])
				}
			}
			if(param.payload){
				payload = JSON.stringify(param.payload);
			}
			xhr.send(payload);
		})
	}

	var get = function(path){
		return request({
			method: 'GET',
			path: path
		});
	}

	var post = function(path, payload){
		return request({
			method: 'POST',
			path: path,
			payload: payload
		});
	}

	return {
		id: 'xhr',
		get: get
	};

})())
