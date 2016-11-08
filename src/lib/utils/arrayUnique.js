export default function arrayUnique(arr) {
	let u = {}, a = [], v;
	for (let i = 0, l = arr.length; i < l; ++i) {
		v = String(arr[i]).trim();
		if (!v) continue;
		if (u.hasOwnProperty(v)) continue;
		a.push(v);
		u[v] = 1;
	}
	return a;
}
