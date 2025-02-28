import React, { useState, useEffect } from "react";
import {
  Wallet,
  Clock,
  ExternalLink,
  Lock,
  Info,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./components/Navbar";
import { useSuiClient, useWallet } from '@suiet/wallet-kit';
import { toast } from "react-hot-toast";
import { admin_deposit, admin_update_launchpad, admin_update_price, admin_withdraw, admin_update_claim_status, claim, buy, newLaunch } from "./lib/web3";
import { firstTargetSupply, launchpadCoinType, totalSaleSupply, treasuryObjectId } from "./config";
import axios from "axios";
import moment from "moment";

function App() {
  const wallet = useWallet();
  const client = useSuiClient();
  const [isBonus, setIsBonus] = useState(false);
  const [suiAmount, setSuiAmount] = useState(0);
  const [balance, setBalance] = useState<any>(0);
  const [claimableBalance, setClaimableBalance] = useState<any>(0);
  const [liveTime, setLiveTime] = useState<any>();
  const [progress, setProgress] = useState<any>(130);
  

  const [treasuryObject, setTreasuryObject] = useState<any>();
  const totalSupply = 500_000_000; // 500M VRAM
  const price = 0.0025; // Current price
  const futurePrice = 0.003; // Future price
  const fdv = totalSupply * futurePrice;

  useEffect(() => {
    axios.get("https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam")
    .then(data=>{
      const dateA = new Date('2025-03-05T12:00:00'); // Example future date
      const dateB = new Date(data.data?.dateTime); // Example past date

      // Calculate the initial difference in seconds
      const initialDifference = Math.floor((dateA - dateB) / 1000); // Difference in seconds
  
      setLiveTime(initialDifference)
    })
  }, [])

  // Toggle bonus stage effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBonus((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

 // live time
  useEffect(() => {
    if(liveTime){
      const interval = setInterval(() => {
        setLiveTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [liveTime]);

   // Function to format the time left into hh:mm:ss
   const formatTime = (seconds: any) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const newLaunchHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Launching ...");

      if(await newLaunch(wallet, client)){
        toast.success("new launched successfully", { id: tt });
      }else{
        toast.error("launched Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const adminDepositHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Depositing...");
      
      if(await admin_deposit(wallet, client, 2000_000_000_000)){
        toast.success("Deposited successfully", { id: tt });
      }else{
        toast.error("Deposit Error", { id: tt });
      }
    }catch(err){
      console.log(err) 
    }
  }

  const adminWithdrawHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Withdrawing...");
      
      if(await admin_withdraw(wallet, client)){
        toast.success("Withdraw successfully", { id: tt });
      }else{
        toast.error("Withdraw Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const adminUpdateLaunchpadHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Update launchpad...");
      
      if(await admin_update_launchpad(wallet, client, true)){
        toast.success("Update launchpad successfully", { id: tt });
      }else{
        toast.error("Update launchpad Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const adminUpdatePriceHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Update launchpad price...");
      
      if(await admin_update_price(wallet, client, 3200)){
        toast.success("Update launchpad price successfully", { id: tt });
      }else{
        toast.error("Update launchpad price Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const adminUpdateClaimStatusHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Update launchpad ClaimStatus...");
      
      if(await admin_update_claim_status(wallet, client, true)){
        toast.success("Update launchpad ClaimStatus successfully", { id: tt });
      }else{
        toast.error("Update launchpad ClaimStatus Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const buyHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }
      if(suiAmount == 0){
        return toast.error("Input Amount");
      }

      const tt = toast.loading("Buying $Vram ...");

      if(await buy(wallet, client, suiAmount)){
        toast.success("Bought successfully", { id: tt });
      }else{
        toast.error("Buying $Vram Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const claimHandle = async () => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      if(treasuryObject && treasuryObject?.data.content.fields.claimStatus == false){
        return toast.error("Yet cant claim, plz wait some time...");
      }

      const tt = toast.loading("Claim $Vram ...");

      if(await claim(wallet, client)){
        toast.success("Claimed successfully", { id: tt });
      }else{
        toast.error("Claim $Vram Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    if(wallet){
      client.getObject({
        id: treasuryObjectId,
        options: {
          showContent: true
        }
      }).then((data: any) => {
        console.log("treauryObject ", data);
        const vramTreasury = Number(data?.data?.content?.fields?.vramTreasury)
        console.log("participants len ", data?.data?.content?.fields.balanceOf?.fields?.contents.length)
        console.log("progress ", Number(data?.data?.content?.fields?.totalSoldVram) / totalSaleSupply)
        const decimal = 1_000_000;
        setProgress(((Number(data?.data?.content?.fields?.totalSoldVram) / totalSaleSupply) / decimal * 100).toFixed(6))
        setTreasuryObject(data)
        let temp = data?.data?.content?.fields?.balanceOf.fields.contents.filter((item: any)=> item?.fields?.key.includes(wallet?.account?.address))
        // console.log(temp && temp.length > 0 && temp[0]?.fields.value)
        const vramPrice = (1_000_000_000 * 3200 * 10000 / 25 / 1000 /1_000_000_000).toFixed(2)
        const sui = temp && temp.length > 0 && Number(temp[0]?.fields.value) * Number(vramPrice) / 1_000_000_000 || 0;
        setClaimableBalance(sui);
        // console.log(data?.data?.content?.fields?.balanceOf.fields.contents) 
      })     
    }
  }, [client, wallet])

  useEffect(() => {
    if(wallet.account?.address){
      (client.getBalance({owner:wallet?.account?.address})).then((data: any)=>{
        setBalance((Number(data?.totalBalance)/Number(1000000000)).toFixed(3))
      }).catch((err: any)=>{});
    }
  }, [wallet])


  useEffect(() => {
    if(wallet.account?.address && client) {
      getAllCoins();
    }
  }, [wallet, client])

  const getAllCoins = async () => {
    let cursor = null;
    let coins: any = []
    while (true) {
        const objects: any = await client.getOwnedObjects({
            owner: wallet?.account?.address?.toString()!,
            options: { showType: true, showContent:true, showDisplay:true,  },
            cursor,
        });
        objects.data.map((item: any) => {
            if(item.data?.type?.includes("0x3::staking")){
                // coins.push(item.data);
            } else if(!item.data?.type?.includes("0x2::coin")){
                // nft.push(item.data);
            }
            else {
                coins.push(item.data);
            }
        })
        cursor = objects.nextCursor;
        if(!objects.hasNextPage){
            break;
        }
    }
    const filtered = coins.filter((item : any)=>item.type.includes(launchpadCoinType))
    console.log("coins ", filtered)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pt-16">
      {/* Background gradients */}
      {/* <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(76,217,100,0.15)_0%,rgba(0,1,3,0)_100%)] opacity-70 blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(31,227,101,0.15)_0%,rgba(0,1,3,0)_100%)] opacity-70 blur-3xl" /> */}

      {/* Navigation */}
      <button
      style={{background: "red"}}
      // onClick={newLaunchHandle}
      // onClick={adminDepositHandle}
      // onClick={adminWithdrawHandle} 
      // onClick={adminUpdateLaunchpadHandle}
      // onClick={adminUpdatePriceHandle}
      onClick={adminUpdateClaimStatusHandle}
      
      >test</button>
      <NavBar /> 

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-8">
            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl border border-green-800/20 p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0">
                <div className="flex-shrink-0 w-full md:w-auto">
                  <img
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=300"
                    alt="VRAM Logo"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover mx-auto md:mx-0"
                  />
                </div>
                <div className="flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                    <h1 className="text-2xl text-white md:text-3xl font-bold">
                      VRAM Presale
                    </h1>
                    <span className="bg-green-900/30 px-3 py-1 rounded-full text-sm text-white w-fit">
                      $VRAM
                    </span>
                  </div>
                  <p className="text-white mb-4 text-sm md:text-base">
                    Join the VRAM.AI presale on the SUI network. Early
                    participants get access to exclusive benefits and future
                    airdrops.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-900/30 p-4 rounded-lg">
                      <div className="text-sm text-white mb-1">Network</div>
                      <div className="font-semibold text-white">SUI Chain</div>
                    </div>
                    <div className="bg-green-900/30 p-4 rounded-lg">
                      <div className="text-sm text-white mb-1">
                        Total Supply
                      </div>
                      <div className="font-semibold text-white">500M $VRAM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Info and Buy Section */}
            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl border border-green-800/20 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="text-sm text-white mb-1">Current Price</div>
                  <div className="text-xl font-bold text-green-500">
                    $0.0025
                  </div>
                  <div className="text-sm text-white">per $VRAM</div>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="text-sm text-white mb-1">Future Price</div>
                  <div className="text-xl font-bold text-green-600">$0.003</div>
                  <div className="text-sm text-white">per $VRAM</div>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="text-sm text-text-muted text-text-primary mb-1">
                    FDV
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    ${(fdv / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-text-muted text-text-primary">
                    Fully Diluted Value
                  </div>
                </div>
              </div>

              {/* Buy Form */}
              <div className="bg-green-900/30 md:p-6 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-text-primary">
                      Buy $VRAM
                    </div>
                    <div className="text-sm text-text-muted text-green-600">
                      1 SUI = {(1_000_000_000 * 3200 * 10000 / 25 / 1000 /1_000_000_000).toFixed(2)} $VRAM
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">Balance</div>
                    <div className="font-semibold text-text-primary">{balance} SUI</div>
                    <div className="text-sm text-white">Claimable Vram</div>
                    <div className="font-semibold text-text-primary">{claimableBalance} Vram</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Enter SUI amount"
                      value={suiAmount}
                      onChange={(e: any)=>setSuiAmount(e.target.value)}
                      className="w-full bg-green-900/20 border border-green-800/20 rounded-lg px-4 py-3 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  </div>
                  <button onClick={buyHandle} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                    Buy Now
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <button onClick={claimHandle} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                    Claim Now
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar with Bonus Stage */}
            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl border border-green-800/20 p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-text-primary">
                    Sale Progress
                  </span>
                  <span className="text-text-primary">{progress}%</span>
                </div>
                <div className="relative w-full h-4 bg-green-900/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      progress >= 100
                        ? isBonus
                          ? "bg-green-600"
                          : "bg-green-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                {progress >= 100 && (
                  <div
                    className={`text-center mt-2 font-bold ${
                      isBonus ? "text-green-600" : "text-green-500"
                    } animate-pulse`}
                  >
                    BONUS STAGE ACTIVE! +10% Extra Tokens
                  </div>
                )}
              </div>
              <div className="text-sm text-white text-center">
                {progress >= 100
                  ? "Bonus stage unlocked!"
                  : `${(Number(treasuryObject?.data?.content?.fields?.totalSoldVram)/ Number(1_000_000_000)).toLocaleString()} / ${totalSaleSupply.toLocaleString()} $VRAM sold`}
              </div>
            </div>
          </div>

          {/* Right Column - Sale Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl border border-green-800/20 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-text-primary">
                    Live Now
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span>{liveTime && formatTime(liveTime)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="md:text-sm text-xs text-white mb-1">
                    Min Purchase
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    10 SUI
                  </div>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="text-sm text-white mb-1">Max Purchase</div>
                  <div className="text-xl font-bold text-text-primary">
                    1,000 SUI
                  </div>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <div className="text-sm text-white mb-1">Participants</div>
                  <div className="text-xl font-bold text-text-primary">
                    {
                      treasuryObject && treasuryObject?.data?.content?.fields.balanceOf?.fields ? 
                      treasuryObject?.data?.content?.fields.balanceOf?.fields?.contents.length : 0 
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl border border-green-800/20 p-6">
              <h3 className="font-semibold mb-4">Important Information</h3>
              <ul className="space-y-3 text-sm text-white">
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
                  <span>
                    Tokens will be automatically distributed after the sale ends
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
                  <span>Bonus stage participants receive 10% extra tokens</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
                  <span>Price will increase to $0.003 after presale</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
