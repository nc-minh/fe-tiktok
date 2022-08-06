import React from 'react';

export interface childrenData {
  code: string;
  title: string;
}

export interface childrenMenu {
  title: string;
  data: childrenData[];
}

export interface MenuItemType {
  icon: React.ReactNode;
  title: string;
  children?: childrenMenu;
  to?: string;
  separate?: boolean;
}
