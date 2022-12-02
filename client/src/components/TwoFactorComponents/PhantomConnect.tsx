import { FC, useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

const web3 = require("@solana/web3.js");

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: ()=>Promise<void>;
    on: (event: PhantomEvent, callback: (args:any)=>void) => void;
    isPhantom: boolean;
    
    
}

type WindowWithSolana = Window & { 
    solana?: PhantomProvider;
}


const PhantomConnect: FC = (props) => {

    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [ connected, setConnected ] = useState(false);
    const [ pubKey, setPubKey ] = useState<PublicKey | null>(null);

    const [ Holder, setHolder ] = useState(false);
    const [ Mess, setMess ] = useState("");


    useEffect( ()=>{
        if ("solana" in window) {
            const solWindow = window as WindowWithSolana;
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
                setWalletAvail(true);
                
                solWindow.solana.connect({ onlyIfTrusted: true });
            }
        }
    }, []);

    useEffect( () => {
        provider?.on("connect", (publicKey: PublicKey)=>{ 
            console.log(`connect event: ${publicKey}`);
            setConnected(true); 
            setPubKey(publicKey);

            
        });
        provider?.on("disconnect", ()=>{ 
            console.log("disconnect event");
            setConnected(false); 
            setPubKey(null);
            setMess("");
            setHolder(false);
            

            
        });



    }, [provider]);


    
    const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`connect handler`);
        provider?.connect()
        .catch((err) => { console.error("connect ERROR:", err); });


    }

    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("disconnect handler");
        provider?.disconnect()
        .catch((err) => {console.error("disconnect ERROR:", err); });
    }

    const validateWallet: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("Validating Wallet");
        const connection = new Connection("https://little-special-paper.solana-mainnet.discover.quiknode.pro/52e57037c604639840179d51c6e37af571c931dd/");

        let tokenMint = "F91KwtnAX3ZSXwwCRsYXouEC5oj2rfLcseAAgxEia7xr";

        const largestAccounts = connection.getTokenLargestAccounts(
            new PublicKey(tokenMint)
        );

        // console.log("Largest Accounts: ",largestAccounts);

        largestAccounts.then(function(result) {

            // console.log("LA Results: ",result);
            // console.log("Results Addy: ",result.value[0].address);

            const largestAccountInfo = connection.getParsedAccountInfo(
                result.value[0].address
            );

            largestAccountInfo.then(function(result) {
                // console.log("Parsed Info results: ",result);
                let x = result.value;

                let TrashScript = JSON.stringify(x);

                let Ojb = JSON.parse(TrashScript);

                let NFTHolder = Ojb.data.parsed.info.owner;
                console.log("Owner: ",Ojb.data.parsed.info.owner);

                if (NFTHolder == pubKey) {
                    props.Test(true);
                } else {
                    setMess("Wallet dose not contain valid Pass");
                }

            });
        });

    }



    return (
        <div id="PhCon">
            { walletAvail ?
                <>
                <div id="PhantomDiv">

                    <h2>Connect to Phantom</h2>
                    <br />
                    <div className="PHbtn">
                        <button id="ConnectPh" disabled={connected} onClick={connectHandler}>Connect to Phantom</button><br />
                    </div>
                    <br />
                    <div className="PHbtn">
                        <button id="Disconnect" disabled={!connected} onClick={disconnectHandler}>Disconnect from Phantom</button><br />
                    </div>

                </div>
                { connected ? <p>Connected! </p> : null }
                <br />
                <br />
                { connected ? <div> <button onClick={validateWallet}>Validate Wallet</button> <br/> <br/> <p className="text-danger">{Mess}</p> </div> : null}

                {}
                </>
            :
                <>
                <p>Opps!!! Phantom is not available. Go get it <a href="https://phantom.app/">https://phantom.app/</a>.</p>
                </>
            }
            
        </div>
    );
}
export default PhantomConnect;