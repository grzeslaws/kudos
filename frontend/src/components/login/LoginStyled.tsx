import styled from "../../theme";

export const Description = styled.h3`
    font-size: ${p => p.theme.fonts.h3};
    font-weight: ${p => p.theme.fonts.fontLight};
    margin-top: ${p => p.theme.spacing.defaultSpacing(10)};
    
`;

export const Wrapper = styled.div`
    max-width: ${p => p.theme.spacing.defaultSpacing(60)};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100vh;
    justify-content: center;
    margin: 0 auto;
`;
