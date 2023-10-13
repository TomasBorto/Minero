/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import PriceInput from "./BnbInput";
import { useAuthContext } from "../../providers/AuthProvider";
import { useContractContext } from "../../providers/ContractProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

const CardWrapper = styled(Card)({
    background: "rgb(184,155,232)",
    marginBottom: 24,
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "> div": {
            marginLeft: 0,
            marginRight: 0,
        },
    },
}));

const GenericButton = styled(Button)(({ theme }) => ({
    color: "black",
    backgroundColor: "rgb(149,69,70)",
    '&:hover': {
        backgroundColor: "rgb(161,43,156)"
    },
    [theme.breakpoints.down("md")]: {
        display: "block",
    }
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function MakeCard() {
    const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } = useContractContext();
    const { address, chainId } = useAuthContext();
    const [contractBNB, setContractBNB] = useState(0);
    const [walletBalance, setWalletBalance] = useState({
        bnb: 0,
        moons: 0,
        rewards: 0,
    });
    const [bakeBNB, setBakeBNB] = useState(0);
    const [loading, setLoading] = useState(false);
    const query = useQuery();

    const fetchContractBNBBalance = () => {
        if (!web3 || wrongNetwork) {
            setContractBNB(0);
            return;
        }
        getBnbBalance(config.contractAddress).then((amount) => {
            setContractBNB(fromWei(amount));
        });
    };

    const fetchWalletBalance = async () => {
        if (!web3 || wrongNetwork || !address) {
            setWalletBalance({
                bnb: 0,
                moons: 0,
                rewards: 0,
            });
            return;
        }

        try {
            const [bnbAmount, moonsAmount, rewardsAmount] = await Promise.all([
                getBnbBalance(address),
                contract.methods
                    .getMyMiners(address)
                    .call()
                    .catch((err) => {
                        console.error("myminers", err);
                        return 0;
                    }),
                contract.methods
                    .pulseRewards(address)
                    .call()
                    .catch((err) => {
                        console.error("moonsrewards", err);
                        return 0;
                    }),
            ]);
            setWalletBalance({
                bnb: fromWei(`${bnbAmount}`),
                moons: moonsAmount,
                rewards: fromWei(`${rewardsAmount}`),
            });
        } catch (err) {
            console.error(err);
            setWalletBalance({
                bnb: 0,
                moons: 0,
                rewards: 0,
            });
        }
    };

    useEffect(() => {
        fetchContractBNBBalance();
    }, [web3, chainId]);

    useEffect(() => {
        fetchWalletBalance();
    }, [address, web3, chainId]);

    const onUpdateBakeBNB = (value) => {
        setBakeBNB(value);
    };

    const getRef = () => {
        const ref = Web3.utils.isAddress(query.get("ref"))
            ? query.get("ref")
            : "0x0000000000000000000000000000000000000000";
        return ref;
    };

    const mine = async () => {
        setLoading(true);

        const ref = getRef();

        try {
            await contract.methods.buyEggs(ref).send({
                from: address,
                value: toWei(`${bakeBNB}`),
            });
        } catch (err) {
            console.error(err);
        }
        fetchWalletBalance();
        fetchContractBNBBalance();
        setLoading(false);
    };

    const reMine = async () => {
        setLoading(true);

        const ref = getRef();

        try {
            await contract.methods.hatchEggs(ref).send({
                from: address,
            });
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const withdraw = async () => {
        setLoading(true);

        try {
            await contract.methods.sellEggs().send({
                from: address,
            });
        } catch (err) {
            console.error(err);
        }
        fetchWalletBalance();
        fetchContractBNBBalance();
        setLoading(false);
    };

    return (
        <CardWrapper>
            {loading && <LinearProgress color="secondary" />}
            <CardContent>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                >
                    <Typography variant="body1">Contract</Typography>
                    <Typography variant="h5">{contractBNB} PLS</Typography>
                </Grid>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                >
                    <Typography variant="body1">Wallet</Typography>
                    <Typography variant="h5">{walletBalance.bnb} PLS</Typography>
                </Grid>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                >
                    <Typography variant="body1">Your Miners</Typography>
                    <Typography variant="h5">{walletBalance.moons} MINERS</Typography>
                </Grid>
                <Box paddingTop={4} paddingBottom={3}>
                    <Box >
                        <PriceInput max={+walletBalance.bnb} value={bakeBNB} onChange={(value) => onUpdateBakeBNB(value)} />
                    </Box>
                    <Box marginTop={3} marginBottom={3}>
                        <GenericButton
                            variant="contained"
                            fullWidth
                            disabled={wrongNetwork || !address || +bakeBNB === 0 || loading}
                            onClick={mine}
                        >
                            MINE
                        </GenericButton>
                    </Box>
                    <Divider />
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        mt={3}
                    >
                        <Typography variant="body1" fontWeight="bolder">
                            Your Rewards
                        </Typography>
                        <Typography variant="h5" fontWeight="bolder">
                            {walletBalance.rewards} PLS
                        </Typography>
                    </Grid>
                    <ButtonContainer container>
                        <Grid item flexGrow={1} marginRight={1} marginTop={3}>
                            <GenericButton
                                variant="contained"
                                color="secondary"
                                fullWidth
                                disabled={wrongNetwork || !address || loading}
                                onClick={reMine}
                            >
                                RE-MINE
                            </GenericButton>
                        </Grid>
                        <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
                            <GenericButton
                                variant="contained"
                                color="secondary"
                                fullWidth
                                disabled={wrongNetwork || !address || loading}
                                onClick={withdraw}
                            >
                                SELL MINERALS
                            </GenericButton>
                        </Grid>
                    </ButtonContainer>
                </Box>
            </CardContent>
        </CardWrapper>
    );
}
