const { expect } = require("chai");
const { ethers } = require("hardhat");

const initialSupply = 1000000;
const tokenName = "EimerToken";
const tokenSymbol = "EMR";

describe("Eimer token tests", function() {
    before(async function() {
        const availableSigners = await ethers.getSigners();
        this.deployer = availableSigners[0];

        const EimerToken = await ethers.getContractFactory("EimerToken");
        this.eimerToken = await EimerToken.deploy(initialSupply);
        await this.eimerToken.deployed();
    });

    it('Should be named EimerToken', async function() {
        const fetchedTokenName = await this.eimerToken.name();
        expect(fetchedTokenName).to.be.equal(tokenName);
    });

    it('Should have symbol "EMR"', async function() {
        const fetchedTokenSymbol = await this.eimerToken.symbol();
        expect(fetchedTokenSymbol).to.be.equal(tokenSymbol);
    });

    it('Should have totalSupply passed in during deploying', async function() {
        const [fetchedTotalSupply, decimals] = await Promise.all([
            this.eimerToken.totalSupply(),
            this.eimerToken.decimals(),
        ]);
        const expectedTotalSupply = ethers.BigNumber.from(initialSupply).mul(ethers.BigNumber.from(10).pow(decimals));
        expect(fetchedTotalSupply.eq(expectedTotalSupply)).to.be.true;
    });
});