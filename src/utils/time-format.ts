export const formatDate = (dateString?: string) => {
	if (!dateString) return "Mavjud emas";

	const date = new Date(dateString);

	if (isNaN(date.getTime())) return "Noma'lum sana";

	// Oylarni o'zbek tilida massivga olamiz
	const oylar = [
		"yanvar", "fevral", "mart", "aprel",
		"may", "iyun", "iyul", "avgust",
		"sentabr", "oktabr", "noyabr", "dekabr"
	];

	const year = date.getFullYear();
	const day = date.getDate();

	const month = oylar[date.getMonth()];

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${year} ${day}-${month} ${hours}:${minutes}`;
};