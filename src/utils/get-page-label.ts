export const getPageLabel = (navigation: any[], pathname: string) => {
	const item = navigation.find((n) => n.path === pathname);
	return item ? item.label : "Boshqaruv paneli";
  };