import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Connect from "./Connect";
import logo from "../../media/dminer.png"

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

export default function Header() {
  return (
    <Wrapper>
      <img src={logo} alt="" width={"100%"} style={{ marginTop: -70, marginBottom: -60}} />
      <Connect responsive={false} />
      <Typography color="white" variant="h6" marginTop={5}>
        ReHire at least six times a week. <br/>
        Sell your Minerals, once a week.
        If you sale too much your daily return will be lower!
        
      </Typography>
    </Wrapper>
  );
}
