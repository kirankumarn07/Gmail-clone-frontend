export const API_URLS = {
    saveSentEmails: {
        endpoint: 'save',
        method: 'POST'
    },
    saveDraftEmails: {
        endpoint: 'save-draft',
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: 'find_emails',
        method: 'GET'
    },
    toggleStarredMails: {
        endpoint: 'starred',
        method: 'POST'
    },
    deleteEmails: {
        endpoint: 'delete',
        method: 'DELETE'
    },
    moveEmailsToBin: {
        endpoint: '/api/email/data/bin',
        method: 'get'
    }
}