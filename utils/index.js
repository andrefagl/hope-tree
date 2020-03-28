import { fullPageRoutes } from "../constants/page";

export const isFullScreenPage = route => fullPageRoutes.indexOf(route) !== -1;
