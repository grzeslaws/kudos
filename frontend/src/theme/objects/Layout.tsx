import styled from "..";

const WrapperMain = styled.div`
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    color: ${props => props.theme.colors.colorBlack()};
    line-height: ${props => props.theme.fonts.lineHeight};
    flex: 1;
`;

export { WrapperMain };
