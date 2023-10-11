export interface MenuItem {
  categoryName: string;
  data: {
    name: string;
    action: string;
    icon: string;
    br?: boolean;
    route?: string;
  }[];
}
