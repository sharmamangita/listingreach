export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = {}
    if (user && user.token) {
    	headers['Authorization'] = user.token;
    	console.log('--headers',headers);
    	return headers;
        //return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}