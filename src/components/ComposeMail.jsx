import { useState } from 'react';
import axios from 'axios';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
    height: '70vh',
    width: '80%',
    maxWidth: '100%',
    // maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 10px 10px',
    overflowX: "auto"
}

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;



const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);
   console.log(data)
    const config = {
        Username: process.env.REACT_APP_USERNAME,
        Password: process.env.REACT_APP_PASSWORD,
        Host: 'smtp.elasticemail.com',
        Port: 2525,
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        if (window.Email) {
            window.Email.send({
                ...config,
                To : data.to,
                Subject : data.subject,
                Body : data.body
            }).then(
                message => alert(message)
            );
        }

        const payload = {
            to : data.to,
            // from : "kirankumar.naga7@gmail.com",
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: 'GmailClone',
            starred: false,
            type: 'sent'
        }

        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDrawer(false);
            setData({});
        } else {

        }
    }

    const closeComposeMail = (e) => {
        e.preventDefault();
        setOpenDrawer(false);
        const payload = {
            to : data.to,
            from : "kirankumar.naga7@gmail.com",
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);
            setData({});
        } else {
            setOpenDrawer(true)
        }
    }
 const sentEmail =async()=>{
    const validationErrors = {};
    if (!data.to.trim()) {
        validationErrors.to = 'Recipient email is required';
    }
    if (!data.subject.trim()) {
        validationErrors.subject = 'Subject is required';
    }
    if (!data.body.trim()) {
        validationErrors.body = 'Body is required';
    }

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
        // setErrors(validationErrors);
        return;
    }

    // Call sendEmail function (replace with actual logic)
    console.log("Sending email:", data);
    // Reset email data and errors after sending
    const response = await axios.post('https://gmail-clone-backend-4s35.onrender.com/api/users/email', data);
    setData({
        to: '',
        subject: '',
        body: ''
    });
    alert(response.data.message)
    // setErrors({});
 }
    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='Recipients' name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </RecipientWrapper>
            <TextField 
                multiline
                rows={9}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
            />
            <Footer>
                <Button variant='contained' style={{borderRadius:'7px'}} onClick={sentEmail}>Send</Button>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;