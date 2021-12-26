import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import {useContractFunction, useEthers} from "@usedapp/core";
import {constants, utils} from "ethers";
import {Contract} from "@ethersproject/contracts";

export const useUnstakeTokens = () =>{
    const {chainId} = useEthers()
    const {abi} = TokenFarm
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmContract = new Contract(tokenFarmContractAddress, tokenFarmInterface)

    return useContractFunction(tokenFarmContract, "unstakeTokens", {
        transactionName: "Unstake Tokens"
    })
}