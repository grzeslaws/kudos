import styled from "..";

interface IImageProfile {
    path?: string;
    small?: boolean;
}

const ProfileImage = styled<IImageProfile, "div">("div")`
    background-image: url(${p => p.path});
    background-size: cover;
    ${p => {
        if (p.small) {
            return `width: 25px;
                    height: 25px;`;
        } else {
            return `width: 60px;
                    height: 60px;`;
        }
    }}
    border-radius: ${p => p.theme.radius.oval};
`;

export { ProfileImage };
