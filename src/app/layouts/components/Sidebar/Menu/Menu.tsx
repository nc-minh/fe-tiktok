interface Props {
  children: JSX.Element;
}
function Menu({ children }: Props) {
  return <nav>{children}</nav>;
}

export default Menu;
