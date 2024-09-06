import {Container, styled} from "@mui/material";

export default function Nav(){
    return(
        <StyledContainer>
            <p>blood pressures</p>
            <p>other</p>
        </StyledContainer>
    )
}

const StyledContainer = styled(Container)({
    backgroundColor: "black",
    minHeight:"100vh",
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"column",
    padding:"16px",
    width: "15vw",

})