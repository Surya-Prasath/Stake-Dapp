import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import {useContractCall, useEthers} from "@usedapp/core";
import {constants, utils} from "ethers";

export const useStakingBalance = (tokenAddress: string)=>{
    const {account, chainId} = useEthers()
    const {abi} = TokenFarm
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0]: constants.AddressZero

    const [stakingBalance] = useContractCall({
        abi: tokenFarmInterface,
        address: tokenFarmContractAddress,
        method: "stakeBalance",
        args: [tokenAddress, account]
    }) ?? []

    return stakingBalance
}