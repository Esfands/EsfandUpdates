import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
    backgroundColor: '#1b2126',
    '@media all': {
        minHeight: 20,
        height: 20,
    },
}));

export const TitleBar = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ p: 0 }}>
            <StyledToolBar disableGutters>
                <Typography variant="overline" component="div" align="left" sx={{ flexGrow: 1 }}>
                    ESFAND UPDATES
                </Typography>
                <Typography variant="overline" component="div" align="right" sx={{ flexGrow: 1 }}>
                    v1.4.3
                </Typography>
            </StyledToolBar>
        </AppBar>
    </Box>
);
