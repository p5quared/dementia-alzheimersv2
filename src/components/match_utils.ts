const makeRepeatedArr = (size: number) => {
	const length = size * size;

	return [...Array(length).keys()].map((_, key) => {
		const val =
			key === length * 0.5 ? length * 0.5 - 1 : key > length * 0.5 ? length - key - 1 : key;

		console.log(`${key} - ${val}`);

		fetch(`https://source.unsplash.com/300x${300 + (200 + 50)}?animals`)
			.then((res) => {
				console.log(res.url);
			})
			.catch((err) => console.log(err));

		return {
			key,
			val,
			img: `linear-gradient(45deg, hsl(${25 * (val + 3)}, 40%, 40%) 50%, black 51%)`,
			solved: false
		};
	});
};

const shuffleArray = (arr: any) => {
	const updatedArr = [...arr];
	for (let i = updatedArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = updatedArr[i];
		updatedArr[i] = updatedArr[j];
		updatedArr[j] = temp;
	}
	return updatedArr;
};

const markSolved = (arr: any, peekArr: any) => {
	let updatedArr = [...arr];
	updatedArr = updatedArr.map((cell) => {
		if (cell.key === peekArr[0] || cell.key === peekArr[1]) {
			cell.solved = true;
		}

		return cell;
	});
	return updatedArr;
};

export { makeRepeatedArr, shuffleArray, markSolved };
