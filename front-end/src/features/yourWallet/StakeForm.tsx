import {Token} from "../Main";
import {useEthers, useNotifications, useTokenBalance} from "@usedapp/core";
import {formatUnits} from "@ethersproject/units";
import {Button, CircularProgress, Input, Snackbar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useStakeTokens} from "../../hooks"
import {utils} from "ethers";
import {Alert} from "@material-ui/lab";

interface StakeFormProps{
    stakeToken: Token
}
export const StakeForm = ({stakeToken}: StakeFormProps)=>{
    const {address: tokenAddress} = stakeToken
    const {account} = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    // const formattedTokenBalance = tokenBalance? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const [amount, setAmount] = useState<number|string>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setAmount(event.target.value)
    }
    const {notifications} = useNotifications()
    const {state, approveAndStake} = useStakeTokens(tokenAddress)

    const isMining = state.status === "Mining"
    const [ERC20AlertApproval, setERC20AlertApproval] = useState(false)
    const [stakeAlertSuccess, setstakeAlertSuccess] = useState(false)

    const handleStakeSubmit = ()=>{
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const handleCloseSnack = ()=>{
        setstakeAlertSuccess(false)
        setERC20AlertApproval(false)
    }

    useEffect(()=>{
        if(notifications.filter((notification)=>
            notification.type==="transactionSucceed" && notification.transactionName==="Approve ERC20 Transfer").length > 0
        ){
            setERC20AlertApproval(true)
            setstakeAlertSuccess(false)
        }
        if(notifications.filter((notification)=>
            notification.type==="transactionSucceed" && notification.transactionName==="Stake Tokens").length > 0
        ){
            setstakeAlertSuccess(true)
            setERC20AlertApproval(false)
        }
    }, [notifications, stakeAlertSuccess, ERC20AlertApproval])
    return (
        <>
            <div>
                <Input onChange={handleInputChange}/>
                <Button onClick={handleStakeSubmit} color={"primary"} size={"large"} disabled={isMining}>
                    {isMining ? <CircularProgress size={26}/>:"Stake"}
                </Button>
            </div>
            <Snackbar open={ERC20AlertApproval} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={"success"}>
                    ERC-20 token transfer approved! Now approve the 2nd transaction.</Alert></Snackbar>
            <Snackbar open={stakeAlertSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={"success"}>
                    Congratulations! Token Staked.
                </Alert>
            </Snackbar>
        </>
    )

}