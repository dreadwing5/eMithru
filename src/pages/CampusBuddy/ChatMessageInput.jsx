const ChatMessageInput = ({
  handleSendMessage,
  handleKeyPress,
  messageInput,
  setMessageInput,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInput = (e) => {
    const { value } = e.target;
    setMessageInput(value);
    if (value.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      <TextField
        fullWidth
        value={messageInput}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        variant="outlined"
        placeholder="Type a message"
        InputProps={{
          endAdornment: (
            <IconButton
              color="primary"
              disabled={isDisabled}
              onClick={handleSendMessage}
            >
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
};
export default ChatMessageInput;
