export const objectMax = (array: any, key: any) => {
	const targetValues = array.map((obj: any) => obj[key]);
	const maxValue = Math.max(...targetValues);
	const maxValueIndex = targetValues.indexOf(maxValue);
	return array[maxValueIndex];
};

export const objectMin = (array: any, key: number) => {
	const targetValues = array.map((obj: any) => obj[key]);
	const minValue = Math.min(...targetValues);
	const minValueIndex = targetValues.indexOf(minValue);
	return array[minValueIndex];
};

export const keyExists = (array: any, value: any) => {
	let result = false;
	array.map((obj: any) => {
		if (Object.values(obj).includes(value)) result = true;
	});
	return result;
};
