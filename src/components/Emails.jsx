import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import { Box, List, Checkbox } from '@mui/material';
import Email from './Email';
import { DeleteOutline } from '@mui/icons-material';
import NoMails from './common/NoMails';
import { EMPTY_TABS } from '../constants/constant';
import axios from 'axios';

const Emails = () => {
    const [starredEmail, setStarredEmail] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
const [getEmailsService , setgetEmailsService] = useState([])
    const { openDrawer } = useOutletContext();
    const { type } = useParams();

    // const getEmailsService = useApi(API_URLS.getEmailFromType);
    // const deleteEmailsService = useApi(API_URLS.deleteEmails);
    // const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
    
    useEffect(() => {

       getData()
    }, [type, starredEmail])
    
    const getData = async ()=>{
        const response = await axios.get(`https://gmail-clone-backend-4s35.onrender.com/api/email/data/${type}`);
        console.log(response.data);
        setgetEmailsService(response.data)
        
    }

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailsService?.map(email => email._id);
            console.log(emails,"=================<");
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = async () => {
        let ids = selectedEmails
        if (type === 'bin') {
            const deleteData = await axios.patch(`https://gmail-clone-backend-4s35.onrender.com/api/email/delete`, ids);
            console.log("deleteData");

            // deleteEmailsService.call(selectedEmails);
        } else {
            const Bin = await axios.patch(`https://gmail-clone-backend-4s35.onrender.com/api/email/bin`, ids);
            console.log("Bin");

            // moveEmailsToBin.call(selectedEmails);
        }
        setStarredEmail(prevState => !prevState);
    }

    return (
        <Box style={openDrawer ? { marginLeft: 250, width: '100%' } : { width: '100%' } }>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small" onChange={(e) => selectAllEmails(e)} />
                <DeleteOutline sx={{cursor:'pointer'}} onClick={(e) => deleteSelectedEmails(e)} />
            </Box>
            
            <List>
                {
                    getEmailsService?.map(email => (
                        <Email 
                            email={email} 
                            key={email.id}
                            setStarredEmail={setStarredEmail} 
                            selectedEmails={selectedEmails}
                            setSelectedEmails={setSelectedEmails}
                        />
                    ))
                }
            </List> 
            {
                getEmailsService?.response?.length === 0 &&
                    <NoMails message={EMPTY_TABS[type]} />
            }
        </Box>
    )
}

export default Emails;