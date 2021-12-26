import {Token} from "../Main"
import {useEthers, useTokenBalance} from "@usedapp/core";
import {formatUnits} from "@ethersproject/units"
import {BalanceMsg} from "../../components";

interface WalletBalanceProps{
    token: Token
}

export const WalletBalance = ({token}: WalletBalanceProps) => {
    const {image, name, address} = token
    const {account} = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedTokenBalance = tokenBalance ? parseFloat(formatUnits(tokenBalance,18)) : 0
    return(
        <BalanceMsg label={`Your un-staked ${name} balance`} amount={formattedTokenBalance} srcImage={image}/>
    )
}