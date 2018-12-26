declare module '@emotion/styled/macro' {
    import styled from '@emotion/styled';
    export * from '@emotion/styled';
    export default styled;
}

declare module 'react-social-icons' {
    export function SocialIcon(props: any): any;
}