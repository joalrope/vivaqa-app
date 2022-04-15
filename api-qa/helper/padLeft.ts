const padLeft = (value: any, length: number): string => {
	return value.toString().length < length
		? padLeft("0" + value, length)
		: value;
};

module.exports = {
	padLeft,
};
