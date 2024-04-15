type Maybe<T> = T | undefined;

export interface NavItem {
  icon?: JSX.Element;
  title: string;
  href: string;
  disabled?: boolean;
  fullMatch?: boolean;
}

export interface UserMe {
  id: string;
  name: string;
  email: string;
  image: Maybe<string>;
}
