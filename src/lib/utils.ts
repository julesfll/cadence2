//stackoverflow.com/questions/11731072/dividing-an-array-by-filter-function
export function partition<Type>(array: Type[], filter: (elem: Type) => boolean): [Type[], Type[]] {
	const pass = [],
		fail = [];
	array.forEach((elem) => (filter(elem) ? pass : fail).push(elem));
	return [pass, fail];
}
