import {useContractFunction, useEthers} from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/ERC20Mock.json"
import networkMapping from "../chain-info/deployments/map.json"
import {Contract} from "@ethersproject/contracts"
import {constants, utils} from "ethers"
import {useState, useEffect} from "react";

export const useStakeTokens = (tokenAddress: string)=>{
    const {chainId} = useEthers()
    const tokenFarmABI = TokenFarm.abi
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(tokenFarmABI)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    const [amountToStake, setAmountToStake] = useState("0")

    const {send: approveERC20Send, state:approveERC20State} = useContractFunction(erc20Contract, "approve", {transactionName: "Approve ERC20 Transfer"})
    const approveAndStake = (amount: string)=>{
        setAmountToStake(amount)
        return approveERC20Send(tokenFarmAddress, amount)
    }

    const {send: stakeSend, state: stakeState} = useContractFunction(tokenFarmContract, "stakeTokens", {transactionName: "Stake Tokens"})

    useEffect(()=>{
        if (approveERC20State.status === "Success"){
            stakeSend(amountToStake, tokenAddress)
        }
    }, [approveERC20State, tokenAddress, amountToStake])

    const [state, setState] = useState(approveERC20State)

    useEffect(()=>{
        if(approveERC20State.status==="Success"){
            setState(stakeState)
        }else{
            setState(approveERC20State)
        }
    }, [approveERC20State, stakeState])

    return {state, approveAndStake}
}
