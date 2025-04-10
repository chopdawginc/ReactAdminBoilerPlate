import React from 'react';
import Box from '@mui/system/Box';
import Sidebar from 'layout/Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Header from 'components/Header';

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    title?: string;
};

const AppLayout = (props: Props) => {
    const { children, fullWidth, title } = props || {};

    const [isSideBarOpen, setSideBarOpen] = React.useState(false);

    const handleSideBarToggle = () => setSideBarOpen(!isSideBarOpen);

    return (
        <Box
            display='flex'
            position={'relative'}>
            <Box
                component='nav'
                sx={{
                    width: { md: 300 },
                    flexShrink: { md: 0 },
                }}>
                <Sidebar
                    open={isSideBarOpen}
                    onClose={handleSideBarToggle}
                />
            </Box>
            <Box sx={{ position: 'absolute', display: { md: 'none', sm: 'block' } }}>
                <IconButton
                    color='primary'
                    aria-label='open sidebar'
                    onClick={handleSideBarToggle}>
                    <MenuIcon sx={{ width: '30px', height: '30px' }} />
                </IconButton>
            </Box>
            <Box width={'100%'}>
                <Container maxWidth={false}>
                    <Box
                        px={4}
                        pt={4}
                        height={'100vh'}
                        overflow={'hidden'}
                        boxSizing={'border-box'}
                        mr={{ md: fullWidth ? 0 : 8 }}>
                        <Box height={'15%'}>
                            <Header title={title} />
                        </Box>
                        <Box height={'85%'}>{children}</Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default AppLayout;
