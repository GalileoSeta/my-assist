import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  message: {
    marginBottom: theme.spacing(2),
    maxWidth: '70%',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    backgroundColor: '#ECE5DD',
    '&.sent': {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
    },
    '&.selected': {
      backgroundColor: '#B8E1FF',
    },
  },
  messageText: {
    fontWeight: 400,
    fontSize: '0.9rem',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },
  messageInfo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    '& .MuiAvatar-root': {
      marginRight: theme.spacing(1),
    },
    '& .MuiTypography-root': {
      fontWeight: 400,
      fontSize: '0.8rem',
      lineHeight: 1.6,
    },
  },
  messageTimestamp: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.7rem',
    lineHeight: 1.6,
  },
  messageAction: {
    marginTop: theme.spacing(1),
  },
}));

const ChatHistory = ({
  messages = [],
  selectedMessage = null,
  onMessageSelect = () => {},
}) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages =
    messages &&
    messages.filter((message) =>
      message.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="center">
        <SearchOutlined />
        <Box flexGrow={1} ml={1}>
          <input
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Tooltip title="Attach file">
          <IconButton>
            <AttachFile />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      {filteredMessages.map((message) => (
        <Box
          key={message.id}
          className={`${classes.message} ${message.sent ? 'sent' : ''} ${
            message.id === selectedMessage ? 'selected' : ''
          }`}
          onClick={() => onMessageSelect(message.id)}
        >
          <Box className={classes.messageText}>{message.text}</Box>
          <Box className={classes.messageInfo}>
            <Avatar src={message.sender.avatar} />
            <Box>
              <Box component="span" fontWeight={500}>
                {message.sender.name}
              </Box>
              <Box component="span" className={classes.messageTimestamp}>
                {message.timestamp}
              </Box>
            </Box>
          </Box>
          {message.actions && (
            <Box className={classes.messageAction}>
              {message.actions.map((action) => (
                <Box key={action.label} component="span" mr={1}>
                  <button onClick={action.onClick}>{action.label}</button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ChatHistory;
