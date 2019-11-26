// https://github.com/marihachi/enhanced-aid/blob/master/ts/src/eaid.ts
// Marihachi, MIT Liscense

export function getEAID(time: number, randomLength: number, randFunc: () => number) {
	const timestamp = time.toString(36).padStart(9, '0');

	let random = '';
	for (let i = 0; i < randomLength; i++) {
		random += Math.floor(randFunc() * 36).toString(36);
	}

	return timestamp + random;
}

export function getEAID12() {
	return getEAID(Date.now(), 3, Math.random);
}
