import React, {useEffect, useState} from "react"
import {Token} from "../Main"
import {useNotifications} from "@usedapp/core";
import {useStakingBalance, useUnstakeTokens} from "../../hooks";
import {formatUnits} from "@ethersproject/units";
import {BalanceMsg} from "../../components";
import {Button, CircularProgress, makeStyles, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
  },
}))

export interface UnstakeProps{
    token: Token
}

export const Unstake = ({token}: UnstakeProps)=>{
    const classes = useStyles()
    const {image, address: tokenAddress, name} = token
    const {notifications} = useNotifications()
    const balance = useStakingBalance(tokenAddress)
    const formatedBalance = balance ? parseFloat(formatUnits(balance, 18)) : 0
    const {send: unstakeTokenSend, state: unstakeTokenState} = useUnstakeTokens()
    const isMining = unstakeTokenState.status === "Mining"

    const handleUnstakeSubmit = () =>{
        return unstakeTokenSend(tokenAddress)
    }

    const [showUnstakeSuccess, setShowUnstakeSuccess] = useState(false)

    const handleCloseSnack = ()=>{
        setShowUnstakeSuccess(false)
    }

    useEffect(()=>{
        if(notifications.filter((notification)=>notification.type==="transactionSucceed"&&notification.transactionName==="Unstake Tokens").length>0){
            setShowUnstakeSuccess(true)
        }
    }, [notifications, showUnstakeSuccess])
    return(
        <>
            <div className={classes.contentContainer}>
                <BalanceMsg label={`Your staked ${name} balance`} amount={formatedBalance} srcImage={image}/>
                <Button color={"primary"} variant={"contained"} size={"large"} onClick={handleUnstakeSubmit} disabled={isMining}>
                    {isMining?<CircularProgress size={26}/>: `Unstake all ${name}`}
                </Button>
            </div>
            <Snackbar open={showUnstakeSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={"success"}>Tokens unstaked successfully!</Alert>
            </Snackbar>
        </>
    )
}