import { Box, Button, Grid, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch, faTwitter, faYoutube, faDiscord, faInstagram, faReddit } from "@fortawesome/free-brands-svg-icons";
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: '#636E77',
    padding: 4,
    '&:hover': {
        color:'#77848f'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    height: 25, 
    width: 90, 
    p: 1, 
    color:'#636E77', 
    border: '1px #636E77 solid',
    '&:hover': {
        color:'#77848f',
        border: '1px #77848f solid'
    }
}));


export const BottomBar = () => {
    return (
        <Grid container sx={{ paddingTop: 5 }}>
            <Grid item xs={8}>
                <Box 
                    display={'flex'}
                    sx={{marginLeft:'14px', p: 0}}
                >
                    <StyledIconButton>
                        <FontAwesomeIcon icon={faTwitch}/>
                    </StyledIconButton>
                    <StyledIconButton>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </StyledIconButton>
                    <StyledIconButton>
                        <FontAwesomeIcon icon={faYoutube}/>
                    </StyledIconButton>
                    <StyledIconButton>
                        <FontAwesomeIcon icon={faDiscord}/>
                    </StyledIconButton>
                    <StyledIconButton>
                        <FontAwesomeIcon icon={faInstagram}/>
                    </StyledIconButton>
                    <StyledIconButton>
                        <FontAwesomeIcon icon={faReddit}/>
                    </StyledIconButton>
                </Box>
            </Grid>
            <Grid item xs={4} justifyContent="flex-end" alignContent="flex-end">
                <Box
                    display={'flex'}
                    sx={{marginLeft:'48px', p: 0}}>
                    <StyledButton variant="outlined" size="small">Settings</StyledButton>
                </Box>
                
            </Grid>
        </Grid>
    )
};
