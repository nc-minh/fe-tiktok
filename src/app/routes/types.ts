export interface PublicRoutes {
  path: string;
  component: (props?: any) => JSX.Element;
  layout?: (props: any) => JSX.Element;
}

export interface PrivateRoutes {
  path: string;
  component: () => JSX.Element;
}
