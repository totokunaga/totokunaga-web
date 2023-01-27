export type DropdownItem<T> = {
  name: string;
  value: T;
};

export type DropdownListProp<T = any> = {
  title: string;
  value: T;
  items: DropdownItem<T>[];
  disabled?: boolean;
  optionHandler: (value: T) => any;
};
