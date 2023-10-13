import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "rgb(184,155,232)",
  marginBottom: 24,
});

const Details = [
  {
    label: "Daily Return",
    value: 8,
  },
  {
    label: "APR",
    value: "2,920",
  },
  {
    label: "Treasury Fee",
    value: 6,
  },
];

export default function ContractDetails() {
  return (
    <CardWrapper>
      <CardContent>
        <Typography variant="h5" borderBottom="3px solid" paddingBottom={1}>
          Contract Details
        </Typography>
        <Box paddingTop={2}>
          {Details.map((f) => (
            <Grid container key={f.label} justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                {f.label}
              </Typography>
              <Typography gutterBottom>{f.value}%</Typography>
            </Grid>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}