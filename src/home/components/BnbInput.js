import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BnbInput = styled("input")({
  fontSize: 24,
  fontWeight: 500,
  padding: "12px 90px 12px 16px",
  textAlign: "right",
  borderRadius: 5,
  border: "1px solid #fff",
  background: "rgb(132,48,144)",
  width: "100%",
  outline: "none",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

export default function PriceInput({ value, max, onChange = () => { } }) {
  return (
    <Box position="relative">
      <BnbInput
        min={0}
        max={max}
        value={value}
        type="number"
        onChange={(e) => onChange(e.target.value)}
      />
      <Typography
        fontSize={24}
        position="absolute"
        top={9}
        right={18}
        fontWeight={500}
        color="black"
      >
        PLS
      </Typography>
    </Box>
  );
}
