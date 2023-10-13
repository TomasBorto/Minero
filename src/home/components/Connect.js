import Button from "@mui/material/Button"
import { styled } from "@mui/system"
import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "rgb(149,69,70)",
  width: "10%",
  right: 48,
  top: 48,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  '&:hover': {
    backgroundColor: "rgb(161,43,156)"
  }
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  display: "none",
  backgroundColor: "rgb(149,69,70)",
  marginTop: -24,
  marginBottom: 48,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
  '&:hover': {
    backgroundColor: "rgb(161,43,156)"
  }
}));

export default function Connect({ responsive = true }) {
  const { address, loading, connect, disconnect } = useAuthContext();
  return responsive ? (
    <ConnectButton color="secondary" variant="contained" disabled={loading}
      onClick={() => (address ? disconnect() : connect())}>
      {address ? "Disconnect" : "Connect"}
    </ConnectButton>
  ) : (
    <SmallScreenConnectButton color="secondary" variant="contained" disabled={loading}
      onClick={() => (address ? disconnect() : connect())}>
      {address ? "Disconnect" : "Connect"}
    </SmallScreenConnectButton>
  );
}