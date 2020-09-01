export let require = value => {
	if (value && value !== "") 
		return undefined;
	return "Field is required";
}

export let maxLengthCreator = maxLength => value => {
	debugger;
	if (value.length > maxLength)
		return "Maximum length reached";
	return undefined;
}

export let minLengthCreator = minLength => value => {
	debugger;
	if (value.length < minLength)
		return "Minimum length isn\'t reached";
	return undefined;
}