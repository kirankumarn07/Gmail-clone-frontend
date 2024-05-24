
import { useNavigate } from 'react-router';

import { AppBar, Toolbar, Box, InputBase, styled, Button } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search, 
    Logout} from '@mui/icons-material'

import { gmailLogo } from '../constants/constant';

const StyledAppBar = styled(AppBar)`
    background: #f5F5F5;
    box-shadow: none;
`;

const SearchWrapper = styled(Box)`
    background: #EAF1FB;
    margin-left: 80px;
    border-radius: 8px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
        width: 100%
    }
`


const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }
    `


const Header = ({ toggleDrawer }) => {
    let navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token'); // Remove the token from local storage
        // Perform any other logout-related tasks, such as redirecting the user to the login page
        // navigator("/login");
        navigate("/login");

    }
    
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} />
                <img src={gmailLogo} alt="logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase />
                    <Tune  color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    
                    {/* <button className="logout-button" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }} onClick={logout}>
                    </button> */}
                        {/* <AccountCircleOutlined color="action" style={{ fontSize: '14px', marginRight: '8px' }} /> */}
                      <Button variant='text' size='small'> <Logout sx={{fontSize:'20px'}}  onClick={logout}/></Button>  
                    
               </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;