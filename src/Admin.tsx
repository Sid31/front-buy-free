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
  const [vramAmount, setVramAmount] = useState(2000_000_000_000);
  const [suiPrice, setSuiPrice] = useState(3200);
  const [balance, setBalance] = useState<any>(0);
  const [liveTime, setLiveTime] = useState<any>();
  const [coinType, setCoinType] = useState<any>(launchpadCoinType);
  const [progress, setProgress] = useState<any>(130);
  

  const [treasuryObject, setTreasuryObject] = useState<any>();
  const totalSupply = 500_000_000; // 500M VRAM
  const price = 0.0025; // Current price
  const futurePrice = 0.003; // Future price
  const fdv = totalSupply * futurePrice;

  useEffect(() => {
    axios.get("https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam")
    .then(data=>{
      const dateA = new Date('2025-02-20T12:00:00'); // Example future date
      const dateB = new Date(data.data?.dateTime); // Example past date

      // Calculate the initial difference in seconds
      const initialDifference = Math.floor((dateA - dateB) / 1000); // Difference in seconds
  
      setLiveTime(initialDifference)
    })
  }, [])

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

      if(suiPrice <= 0){
        return toast.error("Input the exact sui price");
      }

      const tt = toast.loading("Update launchpad price...");
      
      if(await admin_update_price(wallet, client, suiPrice)){
        toast.success("Update launchpad price successfully", { id: tt });
      }else{
        toast.error("Update launchpad price Error", { id: tt });
      }
    }catch(err){
      console.log(err)
    }
  }

  const adminUpdateClaimStatusHandle = async (status: boolean) => {
    try{
      if(!wallet?.account?.address){
        return toast.error("Wallet Connect");
      }

      const tt = toast.loading("Update launchpad ClaimStatus...");
      
      if(await admin_update_claim_status(wallet, client, status)){
        toast.success("Update launchpad ClaimStatus successfully", { id: tt });
      }else{
        toast.error("Update launchpad ClaimStatus Error", { id: tt });
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
      <NavBar /> 
      {/* Admin Form */}
      <div className="bg-green-900/30 md:p-6 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <div className="text-lg font-semibold text-text-primary">
                  Admin Setting
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white">Balance</div>
                <div className="font-semibold text-text-primary">{balance} SUI</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                  <label className="text-white"> coin type</label>
                  <input
                    type="text"
                    placeholder="Enter Coin Type"
                    value={coinType}
                    onChange={(e: any)=>coinType(e.target.value)}
                    className="w-full bg-green-900/20 border border-green-800/20 rounded-lg px-4 py-3 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
              </div>
              <button onClick={newLaunchHandle} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                New Launch(admin)
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="text-white"> deposit amount</label>
                <input
                  type="number"
                  placeholder="Enter SUI price"
                  value={vramAmount}
                  onChange={(e: any)=>setVramAmount(e.target.value)}
                  className="w-full bg-green-900/20 border border-green-800/20 rounded-lg px-4 py-3 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                />
              </div>
              <button onClick={adminDepositHandle} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Deposit vram(admin)
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="text-white"> sui price 3.2$ = 3200</label>
                <input
                  type="number"
                  placeholder="Enter SUI price"
                  value={suiPrice}
                  onChange={(e: any)=>setSuiPrice(e.target.value)}
                  className="w-full bg-green-900/20 border border-green-800/20 rounded-lg px-4 py-3 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                />
              </div>
              <button onClick={adminUpdatePriceHandle} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Update Price(admin)
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button onClick={adminWithdrawHandle} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Withdraw-SUI-Vram(admin)
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button onClick={()=>adminUpdateClaimStatusHandle(true)} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Claim Status(enable)
              </button>
              <button onClick={()=>adminUpdateClaimStatusHandle(false)} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-light text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Claim Status(disable)
              </button>
            </div>
      </div>
       
    </div>
  );
}

export default App;
