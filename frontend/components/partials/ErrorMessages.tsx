interface ErrorMessagesProps {
  message: string;
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ message }) => {
  const messageList = message.split(',');
  return (
    <ul>
      {messageList.map((msg, i) => (
        <li key={i}>
          {messageList.length > 1 && <span>• </span>}
          {msg}
        </li>
      ))}
    </ul>
  );
};

export default ErrorMessages;
