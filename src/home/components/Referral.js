import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "rgb(184,155,232)",
});

const RefLink = styled("input")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 5,
  border: "1px solid #fff",
  background: "rgb(132,48,144)",
  width: "100%",
  outline: "none",
  color: "white",
}));

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;
  return (
    <CardWrapper>
      <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Typography gutterBottom variant="h5" textAlign="center" borderBottom="3px solid">
          Referral Link
        </Typography>
        <RefLink value={address ? link : ""} readOnly/>
        <Typography
          textAlign="center"
          variant="body2"
          marginTop={2}
          paddingX={3}
        >
          Earn 8% of the PLS used to buy miners from anyone who uses your
          referral link
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}