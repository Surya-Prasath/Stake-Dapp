import {useEthers} from "@usedapp/core"
import {Button, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme)=>({
    container: {
        display: "flex",
        padding: theme.spacing(4),
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    }
}))

export const Header = ()=> {
    const classes = useStyles()
    const {activateBrowserWallet, deactivate, active} = useEthers()
    return (
        <div className={classes.container}>
            <div>
                {active ?
                    <Button color="primary" variant={"contained"} onClick={deactivate} >
                        Disconnect
                    </Button>
                    :
                    <Button color="secondary" variant={"contained"} onClick={()=>activateBrowserWallet()} >
                        Connect
                    </Button>
                }
            </div>
        </div>
    )
}