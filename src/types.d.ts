declare module '*.jsx' {
  import { FC } from 'react';
  const component: FC<Record<string, never>>;
  export default component;
}
