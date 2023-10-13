import { styled } from "@mui/system";
import Connect from "./components/Connect";
import ContractDetails from "./components/ContractDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MakeCard from "./components/MainCard";
import { useAuthContext } from "../providers/AuthProvider";
import ReferralLink from "./components/Referral";

const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();
  return (
    <Wrapper>
      <Connect />
      <Header />
      <MakeCard />
      <ContractDetails />
      <ReferralLink address={address}/>
      <Footer />
    </Wrapper>
  );
}
