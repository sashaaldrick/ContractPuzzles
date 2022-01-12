const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const [owner] = await ethers.getSigners();
    const ownerAddress = owner.address;
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();
    const addr = game.address;
    console.log('contract address: ' + addr);
    console.log('signer address: ' + ownerAddress);

    // nested mappings are rough :}
    await game.write(ownerAddress);
    await game.win(ownerAddress);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
