import { Header as GrommetHeader, Heading } from "grommet";

export default function Header() {
  return (
    <GrommetHeader
      background="#ffa6a6"
      pad={{ left: "medium" }}
      height="xxsmall"
    >
      <Heading level={4}>Chesapeake</Heading>
    </GrommetHeader>
  );
}
