import { Transaction } from "@mysten/sui/transactions";
import { launchpadCoinType, launchpadPackageId, treasuryInitialVersion, treasuryObjectId } from "../config";

export const admin_deposit  = async (wallet: any, client: any, amount: number ) => {    // vram token deposit to contract using admin permission
    try{

        const tx: Transaction = new Transaction();
        const typeArguments = [launchpadCoinType]
    
        const treasuryObject = tx.sharedObjectRef({
            initialSharedVersion: treasuryInitialVersion,
            mutable: true,
            objectId: treasuryObjectId
        })

        let allCoins = [];
        let temp = await client.getAllCoins({
          owner: wallet.account?.address?.toString(),
        });
        allCoins = temp.data;
      
        while (temp.hasNextPage) {
          temp = await client.getAllCoins({
            owner: wallet.account?.address?.toString(),
            cursor: temp.nextCursor
          });
          console.log("temp ", temp)
          allCoins = [...allCoins, ...temp.data];
        }
        console.log("allCoins ", allCoins)
        // const selectedCoin = allCoins.filter((item: any) => item.coinType.toString() != launchpadCoinType.toString())
        const selectedCoin = allCoins.filter((item : any)=>item.coinType.includes(launchpadCoinType))

        console.log("selectedCoin ", selectedCoin);
      
        let coin = selectedCoin[0];
        if(selectedCoin.length > 1) {
          tx.mergeCoins(
            selectedCoin[0].coinObjectId,
            selectedCoin.slice(1).map((item:any, index: any) => {
                return item.coinObjectId
            })
          )
        }

    
        const splitted = tx.splitCoins(coin.coinObjectId, [
            amount, //111_000_000_000,
        ]);
    
        tx.moveCall({
            target: `${launchpadPackageId}::launchpad::admin_deposit`,
            arguments: [
                splitted,                           // split
                treasuryObject,                     // treasuryObject
            ],
            typeArguments: typeArguments
    
        }); 
    
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
          },
          {
            execute: ({ bytes, signature }: any) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
            },
          }
        );
        return true;
    }catch(err) {
        console.log(err)
        return false;
    }
}


export const buy  = async (wallet: any, client: any, amount: number) => {    // buy the vram token using sui
    try{
        const tx: Transaction = new Transaction();
        const typeArguments = [launchpadCoinType]
    
        const treasuryObject = tx.sharedObjectRef({
            initialSharedVersion: treasuryInitialVersion,
            mutable: true,
            objectId: treasuryObjectId
        })
    
        const splitted = tx.splitCoins(tx.gas, [
            amount * Number(1_000_000_000), //1_000_000, // 1_000_000_000 this is decimal
        ]);
    
        tx.moveCall({
            target: `${launchpadPackageId}::launchpad::buy`,
            arguments: [
                splitted,                           // split
                treasuryObject,                     // treasuryObject
            ],
            typeArguments: typeArguments
    
        });
    
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
          },
          {
            execute: ({ bytes, signature }: any) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
            },
          }
        );
        return true
    }catch(err){
        console.log("buy err", err)
        return false;
    }
    
}

export const claim  = async (wallet: any, client: any) => {    // buy the vram token using sui
  try{
      const tx: Transaction = new Transaction();
      const typeArguments = [launchpadCoinType]
  
      const treasuryObject = tx.sharedObjectRef({
          initialSharedVersion: treasuryInitialVersion,
          mutable: true,
          objectId: treasuryObjectId
      })
  
      tx.moveCall({
          target: `${launchpadPackageId}::launchpad::claim`,
          arguments: [
              treasuryObject,                     // treasuryObject
          ],
          typeArguments: typeArguments
  
      });
  
      const resData = await wallet.signAndExecuteTransaction({
          transaction: tx,
        },
        {
          execute: ({ bytes, signature }: any) => {
            return client.executeTransactionBlock({
              transactionBlock: bytes,
              signature,
              options: {
                showRawEffects: true,
                showObjectChanges: true,
              },
            });
          },
        }
      );
      return true
  }catch(err){
      console.log("buy err", err)
      return false;
  }
  
}

export const admin_withdraw  = async (wallet: any, client: any) => {
    try{
        const tx: Transaction = new Transaction();
    
        const typeArguments = [launchpadCoinType]
    
        const treasuryObject = tx.sharedObjectRef({
            initialSharedVersion: treasuryInitialVersion,
            mutable: true,
            objectId: treasuryObjectId
        })
    
        tx.moveCall({
            target: `${launchpadPackageId}::launchpad::admin_withdraw`,
            arguments: [
                treasuryObject,                     // treasuryObject
            ],
            typeArguments: typeArguments
    
        });
    
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
          },
          {
            execute: ({ bytes, signature }: any) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
            },
          }
        );
        return true;
    }catch(err) {
        return false;
    }
}

export const admin_update_launchpad  = async (wallet: any, client: any, status: boolean) => {
    try{
        
        const tx: Transaction = new Transaction();
    
        const typeArguments = [launchpadCoinType];
    
        const treasuryObject = tx.sharedObjectRef({
            initialSharedVersion: treasuryInitialVersion,
            mutable: true,
            objectId: treasuryObjectId
        })
    
        tx.moveCall({
            target: `${launchpadPackageId}::launchpad::update_launchpad`,
            arguments: [
                treasuryObject,                     // treasuryObject
                tx.pure.bool(true)
            ],
            typeArguments: typeArguments
    
        });

        console.log("admin_update_launchpad...")
    
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
          },
          {
            execute: ({ bytes, signature }: any) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
            },
          }
        );
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
}

export const admin_update_price  = async (wallet: any, client: any, sui_price: number) => {
    try{

        const tx: Transaction = new Transaction();
    
        const typeArguments = [launchpadCoinType]
    
        const treasuryObject = tx.sharedObjectRef({
            initialSharedVersion: treasuryInitialVersion,
            mutable: true,
            objectId: treasuryObjectId
        })
    
        tx.moveCall({
            target: `${launchpadPackageId}::launchpad::update_price_launchpad`,
            arguments: [
                treasuryObject,                     // treasuryObject
                tx.pure.u64(sui_price)
            ],
            typeArguments: typeArguments
    
        });
    
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
          },
          {
            execute: ({ bytes, signature }: any) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
            },
          }
        );
        return true;
    }catch(err) {
        return false;
    }
}

export const admin_update_claim_status  = async (wallet: any, client: any, claimStatus: boolean) => {
  try{

      const tx: Transaction = new Transaction();
  
      const typeArguments = [launchpadCoinType]
  
      const treasuryObject = tx.sharedObjectRef({
          initialSharedVersion: treasuryInitialVersion,
          mutable: true,
          objectId: treasuryObjectId
      })
  
      tx.moveCall({
          target: `${launchpadPackageId}::launchpad::update_claim_launchpad`,
          arguments: [
              treasuryObject,                     // treasuryObject
              tx.pure.bool(claimStatus)
          ],
          typeArguments: typeArguments
  
      });
  
      const resData = await wallet.signAndExecuteTransaction({
          transaction: tx,
        },
        {
          execute: ({ bytes, signature }: any) => {
            return client.executeTransactionBlock({
              transactionBlock: bytes,
              signature,
              options: {
                showRawEffects: true,
                showObjectChanges: true,
              },
            });
          },
        }
      );
      return true;
  }catch(err) {
      return false;
  }
}

export const newLaunch  = async (wallet: any, client: any) => {
    try {

        const tx: Transaction = new Transaction();
    
        const typeArguments = [launchpadCoinType]
    
        tx.moveCall({
            target: `${launchpadPackageId}::launchpad::new_launchpad`,
            typeArguments: typeArguments
        });
    
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
          },
          {
            execute: ({ bytes, signature }: any) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
            },
          }
        );
        return true;
    }catch(err: any) {
        return false
    }
}