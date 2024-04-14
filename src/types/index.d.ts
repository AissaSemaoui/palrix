type Maybe<T> = T | undefined;

export interface MainNavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface UserMe {
  id: string;
  name: string;
  email: string;
  image: Maybe<string>;
}
