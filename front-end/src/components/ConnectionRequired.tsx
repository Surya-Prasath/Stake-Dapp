import React from "react"
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    container:{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: "150px"
    }
}))

export const ConnectionRequired = () =>{
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant="h6" component={"span"}>Please Connect Your Metamask wallet account</Typography>
        </div>
    )

}