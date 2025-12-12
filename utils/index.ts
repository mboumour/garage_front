const PAGE_ROUTES: Record<string, string> = {
  Home: "/",
  Services: "/services",
  About: "/about",
  Location: "/location",
  Contact: "/contact",
  Appointment: "/appointment",
  Admin: "/admin",
};

export function createPageUrl(page: keyof typeof PAGE_ROUTES | string) {
  if (page in PAGE_ROUTES) {
    return PAGE_ROUTES[page as keyof typeof PAGE_ROUTES];
  }
  return `/${String(page).toLowerCase()}`;
}

export function cn(
  ...classes: Array<string | undefined | null | false>
): string {
  return classes.filter(Boolean).join(" ");
}
