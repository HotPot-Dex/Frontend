var contractAddress = {}

var stakePoolAddress = {}

var stakeERCAddress = {}

var stakeERCContract = {}

var contractABI = {}

//createToken
var stakeInfos = {}

var ethAddress;

//createPairInfo
var univ2PairInfo = {}

var uniFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

var balanceOfHotpot = {};

var contractsInstance = {};

var contractList = ['nft', 'hotpot', 'gacha', 'loan', 'market', 'reward', 'stakepool', 'invite', 'reserve'];

var contractURL = {
    "nft": "https://etherscan.io/",
    "hotpot": "https://etherscan.io/",
    "gacha": "https://etherscan.io/",
    "loan": "https://etherscan.io/",
    "market": "https://etherscan.io/",
    "reward": "https://etherscan.io/",
    "stakepool": "https://etherscan.io/",
    "invite": "https://etherscan.io/",
    "reserve": "https://etherscan.io/"
}

var mainContracts = {
    "nft": "0xDd9b3510ad3407f534FD1309632152f708831061",
    "hotpot": "0xEfE9b392570863B04FFBE49C2c7531924954E27f",
    "gacha": "0xFFDeAb176C90c8De9E108584F52D5Cf71601216a",
    "loan": "0x935e64203056B900Fc6d2fAc83417635e3239d6d",
    "market": "0x7d03885e1F9c189681D1Af101bEffa83C59cc4fe",
    "reward": "0x734375A2d9de46068c47c15255b72DBC937Fa513",
    "invite": "0x2e107dF25C3c089bF34C6bfDbCe89e189989a4F7",
    "reserve": "0x758aa0717AA0A57B02DB414354C9350c2Ea0f482",
}

var ropstenContracts = {
    "nft": "0x27c26D4f9AdEF17497e41A2BeF4F641304B237bc",
    "hotpot": "0x849068872b4648D6Fa86851E6d132f7188f495E4",
    "gacha": "0x79D14bcf231087078B0EFa9d0e1Cd67073e074B1",
    "loan": "0xf7aCae676fB418249FAc9fDF15EE75c5d577944f",
    "market": "0xE6C549f4599E051889699a616AC1816d8D2c0Be7",
    "reward": "0xEDcdDD6ED6DD29c7bfe4b7eF6Cc05B7b064506Cb",
    'invite': '0xEECc6288566CFAb69df891894cC85eeE24dEa9d5',
    "reserve": "0xd5e25a61533a7b89d25422215927FC38fdb0bD9b",
}

var rinkebyContracts = {
    "nft": "0xDF2d4D949A57a79ef078BEfd94b979d0B72c9C15",
    "hotpot": "0x569611e36aF5CC8C796871259339c0D853442bD7",
    "gacha": "0x0b6D8Da669951BCBD8cd65cde93488a62Bc1269A",
    "loan": "0x7Fa7522C30156D603A2d646Ee932dE4D58564D9D",
    "market": "0x50487A9415809dFf3f1e275Ae64cf97e295D6328",
    "reward": "0x60Cb3e6A0C0A4b7bB5bd32c0888e0131AdcC1346",
    'invite': '0x068bE2Af721f8E45fA027b378F04b1f7DD0Af49c',
    "reserve": "0xe3E4fe9f69BCf0012877889c54BC4a93EF79b94a",
}

var ganacheContracts = {
    "nft": "0x37D910ac5f8628702E5B1839838dC0E52f1E407A",
    "hotpot": "0x829B25171ee154d6deFFA2eC2C1385AF9b356b42",
    "gacha": "0xf3B53787ccDD3a6Ab1bca7aCB4408e190ae4FB5B",
    "loan": "0xB1af5A68eBB8b7D7Fa5aD614D0A2F96A324975d0",
    "market": "0x006E6b60A11F6564E24A5aEfF2661B165Ee266F7",
    "reward": "0xD522D6dEc82F447EE99526Ed9f7F4493D58Dc2F3",
    "invite": "",
}


var ropstenPool = {
    "usdt": "0xf22EedE32e58df2266B101953E17030d813e0Fd1",
    "eth/usdt": "0x8E239Aa44e8Fd2CFeb0D790ED818455aC67Ca8e5",
    "wbtc": "0xB53d399345721Cb32Ce2164ec451F9Ff62EAFcac",
    "usdc": "0xB53d399345721Cb32Ce2164ec451F9Ff62EAFcac",
    "hotpot": "0xEbA362ebF91059c856F94af793d7686755C5e96D",
    "hotpot/eth": "0xd421E548D667BBc9B4ab516A3D9A8c21052531d6"
}

var ropstenStakeERC = {
    "usdt": "0xad6d458402f60fd3bd25163575031acdce07538d",  //dai
    "eth/usdt": "0x1c5DEe94a34D795f9EEeF830B68B80e44868d316",  //eth/dai
    "usdc": "0xB709f47e5FA51Fe61085Ab40302A25Fc7dbCe590",  //uni/eth
    "wbtc": "0xB709f47e5FA51Fe61085Ab40302A25Fc7dbCe590",
    "hotpot/eth": "0x4F0BE49909c59e7D832a717c09F4A83A17D4B965"
}

var rinkebyPool = {
    "usdt": "0x80B6958A5ddF18A45E0830eB636be1912a764747",
    "eth/usdt": "0x7C7c324c642Cf2CC36c5454467b10216c98f509e",
    "wbtc": "0x9ff2b972eA60D40F1C2C2B5f5eD98e73C2F6C3C6",
    "usdc": "0x80008Ef1fe5068C535AcE5749E77Cc2eaD02F63c",
    "hotpot": "0x131c78fccEB14D9F674d4BfF22E39Af7582B5eFe",
    "hotpot/eth": "0x99fF3DD9FFEBAc6f104407be20CD5FfAdCE48d6c"
}

var rinkebyStakeERC = {
    "usdt": "0x2448ee2641d78cc42d7ad76498917359d961a783",
    "eth/usdt": "0x78ab2e85eaf22dc7b6981e54432e17521bdadc23",
    "usdc": "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b",
    "wbtc": "0x01be23585060835e02b77ef475b0cc51aa1e0709",
    "wbtc/eth": "0x78ab2e85eaf22dc7b6981e54432e17521bdadc23",
    "hotpot/eth": "0x1873708fe151F82C723aB77dCEaCaB771f4d5875",
}

var ganachePool = {
    "usdt": "0xf22EedE32e58df2266B101953E17030d813e0Fd1",
    "eth/usdt": "0x8E239Aa44e8Fd2CFeb0D790ED818455aC67Ca8e5",
    "wbtc": "0xB53d399345721Cb32Ce2164ec451F9Ff62EAFcac",
    "usdc": "",
    "hotpot": "0xEbA362ebF91059c856F94af793d7686755C5e96D",
    "hotpot/eth": "0xd421E548D667BBc9B4ab516A3D9A8c21052531d6"
}

var ganacheStakeERC = {
    "usdt": "0x2Ba8B39C22e796d65e32FF6afcbFD4075379041e",
    "eth/usdt": "0x71aa19b27DE4272c9189d3228796A3518f79F4d4",
    "usdc": "0xB709f47e5FA51Fe61085Ab40302A25Fc7dbCe590",
    "wbtc": "",
    "hotpot/eth": "0x82538e5dF3E3457502EfFB6b1C3D94e8dFDEf485"
}

var mainPool = {
    "usdt": "0x835631c91B32797C86d86CE5f3C235d5B5255010",
    "eth/usdt": "0x4FD8dEb4E2E714883Dd3F7cA31987190D4CBca95",
    "wbtc": "0xE9Eb77c627773DAcBd85Fe48d409bd37fe6e7745",
    "usdc": "0xaEE62738d44b370A39419d204E65406216e828E3",
    "hotpot": "0xe033EA7877807ce9E3c667DBeD6B42Ccd1aa11F2",
    "hotpot/eth": "0xd2A887c6e66f5ccB684cfC5A6987abE7d04A8AF7"
}

var mainStakeERC = {
    "usdt": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "eth/usdt": "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
    "usdc": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "wbtc": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    "wbtc/eth": "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
    "hotpot/eth": "0xE18e778Fcec95E9733e3997581F20FF122Fa69bE",
}


function setChainId(chainId) {
    if (chainId === ChainId[0]) {
        if (printLog) console.log("connect main");
        contractAddress = mainContracts;
        stakePoolAddress = mainPool;
        stakeERCAddress = mainStakeERC;
        ethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    } else if (chainId === ChainId[1]) {
        if (printLog) console.log("connect ropsten")
        contractAddress = ropstenContracts;
        stakePoolAddress = ropstenPool;
        stakeERCAddress = ropstenStakeERC;
        ethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
    }
    else if (chainId === ChainId[2]) {
        if (printLog) console.log("connect rinkeby");

        contractAddress = rinkebyContracts;
        stakePoolAddress = rinkebyPool;
        stakeERCAddress = rinkebyStakeERC;
        ethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
    } else if (chainId === "0x29a") {
        if (printLog) console.log("connect ganache");
        contractAddress = ganacheContracts;
        stakePoolAddress = ganachePool;
        stakeERCAddress = ganacheStakeERC;
    }
    stakeERCAddress['hotpot'] = contractAddress['hotpot'];

}

function initContractAddress(){
    var prefix = "https://etherscan.io/address/";
    if (ETHENV.chainId === ChainId[0]) {
       
    } else if (ETHENV.chainId === ChainId[1]) {
        prefix = "https://ropsten.etherscan.io/address/";
    }
    else if (ETHENV.chainId === ChainId[2]) {
        prefix="https://rinkeby.etherscan.io/address/";
    }
    for (let i = 0; i < contractList.length; i++) {
        const name = contractList[i];
        contractURL[name] = prefix+contractAddress[name];
    }
    contractURL['stakepool']=prefix+stakePoolAddress['hotpot/eth'];
}


//name,address,poolAddress,weight,poolTotalStake,userStake,userBalance
function createToken(name, address, poolAddress) {
    var oTempToken = new Object;
    //contract instance of this token's stake pool
    oTempToken.instance = null;

    //stake token name
    oTempToken.name = name;

    //stake token address
    oTempToken.address = address;

    //satke pool address
    oTempToken.poolAddress = poolAddress;

    oTempToken.startTime = 0;

    oTempToken.periodFinish = 0;

    oTempToken.totalReward = 0;

    //this pool total stake token
    oTempToken.poolTotalStake = 0;

    //this pool user stake amount
    oTempToken.userStake = 0;

    //user balance of this stake token
    oTempToken.userBalance = 0;

    //user earned in this pool
    oTempToken.userEarn = 0;

    //stake token price
    oTempToken.price = 0;

    //The pool's end time
    oTempToken.periodFinish = 0;

    oTempToken.priceNormalize = false;

    oTempToken.decimals = 18;

    oTempToken.apy = 0;

    oTempToken.allowance = 0;

    oTempToken.rewardRate = 0;

    oTempToken.lastRewardTime = 0;

    return oTempToken;
}

function createPairInfo(address) {
    var pair = new Object;
    pair.address = address;
    pair.contractInstance = null;

    pair.token0 = null;

    pair.token1 = null;

    pair.reserve0 = null;

    pair.reserve1 = null;

    pair.totalSupply = 0;

    //by eth
    pair.lpPrice = 0;

    pair.decimals = 0;

    return pair;
}

var allPoolTokens = [
    "usdt",
    "eth/usdt",
    "wbtc",
    "usdc",
    "hotpot",
    "hotpot/eth",
    "wbtc/eth"
]

function createTokenInfo(name) {
    var token = new Object;
    token.name = name;
    token.decimals = 18;
    token.address = null;
    token.price = 0;
    return token;
}

var ChainId = ['main', 'ropsten', 'rinkey']

ETHENV = {
    Tokens: {},
    //chainId === "0x1" main, chainId === "0x3" ropsten, chainId === "0x4" rinkey
    chainId: null,
    ethPrice: 0,

    init: function (_chainId) {
        setChainId(_chainId);
        ETHENV.chainId = _chainId;
        initContractAddress();
    }
}