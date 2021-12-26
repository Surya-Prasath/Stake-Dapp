import {Token} from "../Main"
import React, {useState} from "react";
import {Box, makeStyles, Tab} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from "@material-ui/lab"
import {WalletBalance} from "./WalletBalance";
import {StakeForm} from "./StakeForm";
import {ConnectionRequired} from "../../components";
import {useEthers} from "@usedapp/core";

interface YourWalletProps{
    supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme)=>({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box:{
        backgroundColor: "white",
        borderRadius: "25px"
    },
    header:{
        color: "white"
    }
}))

export const YourWallet = ({supportedTokens}: YourWalletProps) => {
    const classes = useStyles()
    const {active} = useEthers()
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string)=>{
        setSelectedTokenIndex(parseInt(newValue))
    }
    return (
        <Box>
            <h1 className={classes.header}>Your Wallet!</h1>
            <Box className={classes.box}>
                <div> { active ? (
                    <TabContext value={selectedTokenIndex.toString()}>
                        <TabList onChange={handleChange} aria-label={"stake form tabs"}>
                            {
                                supportedTokens.map((token, index) => {
                                    return (
                                        <Tab label={token.name} value={index.toString()} key={index}/>
                                    )
                                })
                            }
                        </TabList>
                        {supportedTokens.map((token, index) => {
                            return (
                                <TabPanel value={index.toString()} key={index}>
                                    <div className={classes.tabContent}>
                                        <WalletBalance token={token}/>
                                        <StakeForm stakeToken={token}/>
                                    </div>
                                </TabPanel>
                            )
                        })}
                    </TabContext>
                ):(<ConnectionRequired/>)}
                </div>
            </Box>
        </Box>
    )
}