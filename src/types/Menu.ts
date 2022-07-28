export interface childrenData {
  code: string;
  title: string;
}

export interface childrenMenu {
  title: string;
  data: childrenData[];
}

export interface MenuItemType {
  icon: JSX.Element;
  title: string;
  children?: childrenMenu;
  to?: string;
  separate?: boolean;
}
