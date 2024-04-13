interface TooltipMessageContentProps {
  messages: string[];
}

const TooltipMessageContent: React.FC<TooltipMessageContentProps> = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>&bull; {message}</li>
      ))}
    </ul>
  );
};

export default TooltipMessageContent;
