declare module '@emotion/styled/macro' {
    import styled from '@emotion/styled';
    export * from '@emotion/styled';
    export default styled;
}

declare module '@emotion/css/macro' {
  import css from '@emotion/css';
  export * from '@emotion/css';
  export default css;
}

declare module 'react-social-icons' {
    export function SocialIcon(props: any): any;
}

declare module 'body-scroll-lock' {
  export interface BodyScrollOptions {
    reserveScrollBarGap: boolean;
  }

  export function disableBodyScroll(
    targetElement: HTMLElement,
    options?: BodyScrollOptions
  ): void;

  export function enableBodyScroll(targetElement: HTMLElement): void;

  export function clearAllBodyScrollLocks(): void;
}

declare module 'react-spring/hooks.cjs' {
  export * from 'react-spring/hooks';
}
