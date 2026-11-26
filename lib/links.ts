/** On pages other than home, "#section" links must point back to the home page ("/#section"). */
export const homeLink = (href: string, isHome: boolean) => (!isHome && href.startsWith("#") ? `/${href}` : href);
