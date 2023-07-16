type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const DarkModeProvider = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>;
};

export default DarkModeProvider;
