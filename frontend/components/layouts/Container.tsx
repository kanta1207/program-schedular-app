interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto min-h-[calc(100vh-68.5px)] py-16 grid grid-cols-1">{children}</div>;
};

export default Container;
