interface ManageLayoutProps {
  menuList: MenuItem[];
}

interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

export type { ManageLayoutProps, MenuItem };
