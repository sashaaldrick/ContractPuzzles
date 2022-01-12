const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck

    while(true) {
      wallet = ethers.Wallet.createRandom();
      if(BigInt(wallet.address) < BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf")) {
        break;
      } 
    }
    // random wallet address doesn't have any funds, so have to send some over before calling it.

    const signer = ethers.provider.getSigner(0); // pulls out the first account from hardhat
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1")
    });

    await game.connect(wallet.connect(ethers.provider)).win(); 
    // game.connect returns a new instance of the contract but connected to a provider or signer, and then connect the wallet to the provider and past that through as a signer. The provider in this case is hardhat backend.

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});