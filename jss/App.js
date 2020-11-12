const WalletConnectProvider = require("@walletconnect/web3-provider").default;
const Web3 = require('web3');

var defaultAccount = null;
var defaultBalance = 0;
var currentPagePoolID = "";
var currentPage = "";
var printLog = true;

function formatFomoTime(t) {
    if (t < 0) {
        return 'error';
    }
    // if(printLog)console.log("formatFomoTime : "+t)
    const times = Math.floor(t);
    const h = Math.floor(times / 3600);
    const m = Math.floor((times % 3600) / 60);
    const s = times % 60;
    return h + "h " + m + "m " + ' ' + + s + "s";
}

function showAlert() {
    document.getElementById('light').style.display = 'block';
    // document.getElementById('fade').style.display = 'block';
}

function hideAlert() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}

function showSellAlert(id) {
    document.getElementById("popTitle").innerHTML = "Sell";
    document.getElementById('stakeInput').value = 0;
    $("#sellToken").text(getString('sellnftid')+" : " + id);
    $(".popTitle").text(getString('selltitle'));
    $(".popTitle").attr('data-lang', 'selltitle');
    $("#loandiv").hide();
    $("#selldiv").show();
    $("#divsell").show();
    $("#borrowdiv").hide();
    $(".divloan").hide();
    $("#iddiv").text(id);
    $("#priceunit").text('HotPot');
}

function showLoanAlert(id) {
    document.getElementById('stakeInput').value = 0;
    $("#sellToken").text(getString('loannftid')+" : " + id);
    $(".popTitle").text(getString('loantitlepop'));
    $(".popTitle").attr('data-lang', 'loantitlepop');
    $("#loandiv").show();
    $("#selldiv").hide();
    $("#divsell").show();
    $(".divloan").show();
    $("#iddiv").text(id);
    $("#borrowdiv").hide();
    $("#priceinputdiv").show();
    $("#priceunit").text('HotPot/Day');
}

function showBorrowAlert(id) {
    document.getElementById('stakeInput').value = 0;
    $("#sellToken").text(getString('loannftid')+" : " + id);
    $(".popTitle").text(getString('loantitlepop'));
    $(".popTitle").attr('data-lang', 'loantitlepop');
    $("#loandiv").hide();
    $("#selldiv").hide();
    $("#borrowdiv").show();
    $("#divsell").show();
    $(".divloan").show();
    $("#iddiv").text(id);
    $("#priceinputdiv").hide();
    $("#priceunit").text('HotPot/Day');
}


function getSellAlertId() {
    return $("#iddiv").text();
}

function hideSellAlert() {
    $("#divsell").hide();
}


function getString(id) {
    return $.i18n.map[id];
}

function afterSendTx(error, result) {
    if (error) {
        if (printLog) console.log("stake approve error " + error);
        toastAlert("Error:" + error);
    } else {
        showTopMsg("Pending...", 0, getEthersanUrl(result));
        startListenTX(result);
    }
}

function getEthersanUrl(tx) {
    var url = "https://etherscan.io/tx/" + tx;
    if (ETHENV.chainId == ChainId[0]) {
        url = "https://etherscan.io/tx/" + tx;
    } else if (ETHENV.chainId == ChainId[1]) {
        url = "https://ropsten.etherscan.io/tx/" + tx;
    } else if (ETHENV.chainId == ChainId[2]) {
        url = "https://rinkeby.etherscan.io/tx/" + tx;
    }
    return url;
}

function startListenTX(tx) {
    if (printLog) console.log("startListenTX");
    var internal = setInterval(function () {
        web3.eth.getTransactionReceipt(tx, function (e, result) {
            if (e) {
                if (printLog) console.log("tx error:" + e);
                toastAlert("Error : " + e);
            } else {
                if (printLog) console.log("tx result:" + result);
            }
            if (result) {
                clearInterval(internal);
                if (printLog) console.log("getTransactionReceipt ");
                hideTopMsg();
                if (result.status == '0x0') {
                    showTopMsg(getString('txfail'), 5000, getEthersanUrl(result.transactionHash));
                    // toastAlert(getString('txfail'));
                }
                // autoRefresh();
            }
        });
    }, 3000);

}

function showTopMsg(msg, showTime, url) {
    $("#toprightmsg").text(msg);
    $("#toprightmsg").show();
    $("#toprightmsg").attr("href", url);
    if (showTime > 0) {
        setTimeout(function () {
            hideTopMsg();
        }, showTime);
    }
}

function hideTopMsg() {
    $("#toprightmsg").hide();
}

//importantmsg
function showImportantMsg(msg, url) {
    if (printLog) console.log("importantmsg = " + msg);
    $("#importantmsg").text(msg);
    $("#importantmsg").show();
    $("#importantmsg").attr("href", url);

    setTimeout(function () {
        $("#importantmsg").hide();
    }, 3000);
}

function toastAlert(msg) {
    if (printLog) console.log("toastAlert:" + msg);
    document.getElementById('alertdiv').style.display = 'block';
    document.getElementById('alertdiv').innerHTML = msg;
    setTimeout(function () {
        document.getElementById('alertdiv').style.display = 'none';
    }, 3000);
}


function formatZero(num, len) {
    if (String(num).length > len) return num;
    return (Array(len).join(0) + num).slice(-len);
}

function getString(id) {
    return $.i18n.map[id];
}

function formatTime(t) {
    if (t < 0) {
        return 'error';
    }

    const times = Math.floor(t);
    if (t > 86400) {
        const d = Math.floor(times / 86400);
        const gap = times % 86400;
        const h = Math.floor(gap / 3600);
        const m = Math.floor((gap % 3600) / 60);
        // const s = gap % 60;
        return d + "D " + h + "h " + m + "m";
    } else {
        const h = Math.floor(times / 3600);
        const m = Math.floor((times % 3600) / 60);
        const s = times % 60;
        return h + "h " + m + "m " + ' ' + + s + "s";
    }
    // if(printLog)console.log("formatFomoTime : "+t)
}



function formatTime2Min(t) {
    if (t < 0) {
        return 'error';
    }

    const times = Math.floor(t);
    if (t > 86400) {
        const d = Math.floor(times / 86400);
        const gap = times % 86400;
        const h = Math.floor(gap / 3600);
        const m = Math.floor((gap % 3600) / 60);
        // const s = gap % 60;
        return d + "D " + h + "h " + m + "m";
    } else {
        const h = Math.floor(times / 3600);
        const m = Math.floor((times % 3600) / 60);
        if (h == 0) {
            return m + " m";
        } else
            return h + "h " + m + "m ";
    }
    // if(printLog)console.log("formatFomoTime : "+t)
}

var eventBlocks = new Set();
function checkSameEvent(event) {
    var transactionHash = event.transactionHash;
    var name = event.event;
    var check = transactionHash + name;

    if (eventBlocks.has(check)) {
        return true;
    }
    eventBlocks.add(check);
    return false;
}

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

var contractList = ['nft', 'hotpot', 'gacha', 'loan', 'market', 'reward', 'invite', 'reserve'];

var etherscanPrefix="https://etherscan.io/";

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
    "nft": "",
    "hotpot": "",
    "gacha": "",
    "loan": "",
    "market": "",
    "reward": "",
    'invite': '',
    "reserve": "",
}

var rinkebyContracts = {
    "nft": "",
    "hotpot": "",
    "gacha": "",
    "loan": "",
    "market": "",
    "reward": "",
    'invite': '',
    "reserve": "",
}

var ganacheContracts = {
    "nft": "",
    "hotpot": "",
    "gacha": "",
    "loan": "",
    "market": "",
    "reward": "",
    'invite': '',
    "reserve": "",
}


var ropstenPool = {
    "usdt": "",
    "eth/usdt": "",
    "wbtc": "",
    "usdc": "",
    "hotpot": "",
    "hotpot/eth": ""
}

var ropstenStakeERC = {
    "usdt": "",  
    "eth/usdt": "",  
    "usdc": "",  
    "wbtc": "",
    "hotpot/eth": ""
}

var rinkebyPool = {
    "usdt": "",
    "eth/usdt": "",
    "wbtc": "",
    "usdc": "",
    "hotpot": "",
    "hotpot/eth": ""
}

var rinkebyStakeERC = {
    "usdt": "",  
    "eth/usdt": "",  
    "usdc": "",  
    "wbtc": "",
    "hotpot/eth": ""
}

var ganachePool = {
    "usdt": "",
    "eth/usdt": "",
    "wbtc": "",
    "usdc": "",
    "hotpot": "",
    "hotpot/eth": ""
}

var ganacheStakeERC = {
    "usdt": "",  
    "eth/usdt": "",  
    "usdc": "",  
    "wbtc": "",
    "hotpot/eth": ""
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
    etherscanPrefix = prefix;
    // for (let i = 0; i < contractList.length; i++) {
    //     const name = contractList[i];
    //     contractURL[name] = prefix+contractAddress[name];
    // }
    // contractURL['stakepool']=prefix+stakePoolAddress['hotpot/eth'];
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

Gacha = {
    gachaHx: null,
    getGacha: function () {
        if (printLog) console.log("getGacha init");
        contractsInstance.Gacha.methods.getPosibilityNow().call(function (e, r) {
            if (!e) {
                r = parseInt(r);
                $("#posibilitynow").text("1/" + r);
                $("#posibilitylater").text("1/" + (r * 2));
            }
        });
        contractsInstance.Gacha.events.GachaTicket(function (error, result) {
            if (error) { if (printLog) console.log("GachaTicket error " + error); }
            else {
                // if(printLog)console.log("GachaTicket block num=" + result.blockNumber);
                if (checkSameEvent(result)) {
                    return;
                }
                if (printLog) console.log("GachaTicket " + result.returnValues);
                $("#globalmsg").show();

                $("#globalmsg").attr("href", getEthersanUrl(result.transactionHash));
                $("#gachauser").text(result.returnValues._owner);
                setTimeout(function () {
                    $("#globalmsg").hide();
                }, 5000);

                if (result.returnValues._owner == defaultAccount) {
                    hideTopMsg();
                }

                UserNFT.totalNFT = UserNFT.totalNFT.plus(1);
                UserNFT.updateTotalNFT();
            }
        });
        if (printLog) console.log("getGacha");
        contractsInstance.Gacha.events.GachaNothing({
            filter: { _owner: defaultAccount },
            fromBlock: 'latest',
            toBlock: 'latest'
        }, function (e, result) {
            if (result.returnValues._owner != defaultAccount) {
                return;
            }
            if (e) {
                if (printLog) console.log("GachaTicket error " + e);
            } else {
                // if(printLog)console.log("GachaNothing block num=" + result.blockNumber);

                if (checkSameEvent(result)) {
                    return;
                }

                if (printLog) console.log("GachaNothing " + result.returnValues);
                showImportantMsg(getString('GachaNothing'), getEthersanUrl(result.transactionHash));
            }
        });
    },
    pull: function () {
        if (printLog) console.log("pull");

        if (defaultBalance.lt(new BigNumber(20 * 10 ** 18))) {
            toastAlert(getString('hotnotenough'));
            return;
        }
        contractsInstance.Gacha.methods.pull().send({ from: defaultAccount, gas: 1200000 }, function (e, result) {
            if (e) {
                if (printLog) console.log("pull error:" + e);
            } else {
                if (printLog) console.log("pull " + result);

                showTopMsg("Pending...", 0, getEthersanUrl(result));
                startListenTX(result);
            }
        });
    },
    pull10: function () {
        if (printLog) console.log("pull10");
        if (defaultBalance.lt(new BigNumber(190 * 10 ** 18))) {
            toastAlert(getString('hotnotenough'));
            return;
        }
        contractsInstance.Gacha.methods.pull10().send({ from: defaultAccount, gas: 1200000 }, function (e, result) {
            if (e) {
                if (printLog) console.log("pull 10 error:" + e);
            } else {
                if (printLog) console.log("pull 10:" + result);

                showTopMsg("Pending...", 0, getEthersanUrl(result));
                startListenTX(result);
            }
        });
    },
    approve: function () {
        contractsInstance.HotPot.methods.approve(contractAddress.gacha, web3.utils.numberToHex(new BigNumber(Math.pow(10, 30)))).send({ from: defaultAccount }, function (e, result) {
            if (e) {
                if (printLog) console.log("Gacha approve error " + e);
            } else {
                showTopMsg("Pending...", 0, getEthersanUrl(result));
                startListenTX(result);
            }
        });
    }
}

Invite = {
    claimRatio: 0,
    myInviteCode: 0,
    inputvalidated: false,
    initInviteInfo: function () {

        contractsInstance.Invite.events.InviteCreated({ filter: { creator: defaultAccount } }, function (error, result) {
            if (!error) {
                if (result.returnValues.creator != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }
                if (printLog) console.log("InviteCreated");
                Invite.getMyInviteCode();
            }
        });

        contractsInstance.Invite.events.InviteInput({ filter: { user: defaultAccount } }, function (error, result) {
            if (!error) {
                if (result.returnValues.user != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }
                if (printLog) console.log("InviteInput");
                Invite.getInputInviteCode();
            }
        });
        contractsInstance.Invite.events.InviteValidate({ filter: { validator: defaultAccount } }, function (error, result) {
            if (!error) {
                if (result.returnValues.validator != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }
                if (printLog) console.log("InviteValidate");
                $("#invitevalidated").show();
                $("#inviteinputed").hide();
                Invite.claimRatio += 0.01;
                Invite.updateRatio();
            }
        });
        Invite.getMyInviteCode();
        contractsInstance.Invite.methods.getInviteNum(defaultAccount).call(function (e, r) {
            $("#totalinvite").text(r);
        });
        contractsInstance.Invite.methods.calValidNum(defaultAccount).call(function (e, r) {
            $("#validateinvite").text(r);
        });
        contractsInstance.Invite.methods.calRatioUpdate(defaultAccount).call(function (e, r) {
            var ratio = parseInt(r) / 1000;
            if (printLog) console.log("calRatioUpdate=" + ratio);
            Invite.claimRatio += ratio;
            Invite.updateRatio();
        });
        Invite.getInputInviteCode();

        contractsInstance.Invite.methods.checkValidated(defaultAccount).call(function (e, r) {
            if (printLog) console.log("checkValidated=" + r);
            Invite.inputvalidated = r;
            if (r) {
                $("#invitevalidated").show();
                $("#inviteinputed").hide();
            } else {
                $("#invitevalidated").hide();
            }
        });
    },
    getInputInviteCode: function () {
        contractsInstance.Invite.methods.getInputInviteCode(defaultAccount).call(function (e, r) {
            if (printLog) console.log("getInputInviteCode=" + r);
            if (parseInt(r) == 0) {
                $("#inputinvitecode").show();
                $("#inviteinputed").hide();
            } else {
                $("#inputinvitecode").hide();
                if (!Invite.inputvalidated)
                    $("#inviteinputed").show();
            }
        });
    },
    getMyInviteCode: function () {
        contractsInstance.Invite.methods.getMyInviteCode(defaultAccount).call(function (e, r) {
            r = parseInt(r);
            if (printLog) console.log("getMyInviteCode=" + r);
            if (r != 0) {
                Invite.myInviteCode = r;
                $("#myinvitecode").text(r);
                $("#nocodetip").hide();
                $("#myinvitecode").show();
            }
            else {
                $("#nocodetip").show();
                $("#myinvitecode").hide();
            }
        });
    },
    updateRatio: function () {
        $("#claimratioup").text(100 * Invite.claimRatio + "%");
    },
    inputCode: function () {
        var code = $("#inviteInput").val();
        if (printLog) console.log("code=" + code);
        var regex = /^\d+$/;
        if (regex.test(code)) {
            if (code == Invite.myInviteCode) {
                toastAlert(getString('inputyourcode'));
            } else if (code < 1000) {
                toastAlert(getString('inputwrong'));
            } else
                contractsInstance.Invite.methods.inputCode(code).send({ from: defaultAccount }, function (e, r) {
                    afterSendTx(e, r);
                });
        } else {
            toastAlert(getString('inputwrong'));
        }
    },
}


Loan = {
    listSize: 0,
    listIds: [],
    listTokens: {},
    allowance: 0,
    historyList: {},
    historyTimes: [],
    historyLength: 0,
    threadtime:10*60,
    getLoan: function () {
        Loan.initLoanTable();
        contractsInstance.HotPot.methods.allowance(defaultAccount, contractsInstance.Loan._address).call(function (e, r) {
            if (!e) {
                Loan.allowance = new BigNumber(r);
            }
            contractsInstance.Loan.methods.getLoanList().call(function (e, r) {
                if (printLog) console.log("loan getListToken=" + r);
                for (var i = 0; i < r.length; i++) {
                    Loan.listIds.push(parseInt(r[i]));
                    Loan.getNFTInfo(parseInt(r[i]));
                }
            });
        });
        contractsInstance.Loan.methods.getLoanSize().call(function (e, r) {
            r = parseInt(r);
            if (printLog) console.log("getLoanSize=" + r);
            if (!e) {
                Loan.listSize = r;
            }
        });

        contractsInstance.Loan.events.TokenDeposit(function (e, result) {
            if (checkSameEvent(result)) {
                return;
            }
            if (printLog) console.log("TokenDeposit");
            Loan.listIds.push(parseInt(result.returnValues.tokenId));
            Loan.getNFTInfo(parseInt(result.returnValues.tokenId));
            if (result.returnValues.owner == defaultAccount) {
                UserNFT.addLoanList(parseInt(result.returnValues.tokenId));
            }
        });

        contractsInstance.Loan.events.TokenCancelDeposit(function (e, result) {
            if (checkSameEvent(result)) {
                return;
            }
            if (printLog) console.log("TokenCancelDeposit block num=" + result.blockNumber);

            if (result.returnValues.owner == defaultAccount) {
                UserNFT.removeLoanList(parseInt(result.returnValues.tokenId));
            }
            Loan.removeNFT(parseInt(result.returnValues.tokenId));
        });
        contractsInstance.Loan.events.TokenBorrowed(function (e, result) {
            if (checkSameEvent(result)) {
                return;
            }
            if (printLog) console.log("TokenBorrowed block num=" + result.blockNumber);

            Loan.removeNFT(parseInt(result.returnValues.tokenId));

            UserNFT.nftBorrowed(result.returnValues);
        });

        // event TokenBorrowed(
        //     address indexed borrower,
        //     uint256 indexed tokenId,
        //     uint256 indexed start,
        //     uint256 borrowDays,
        //     uint256 pricePerDay,
        //     uint8 grade
        // );

        Loan.addHistory();
    },
    removeNFT: function (tokenId) {
        // listIds
        // listTokens
        var position = -1;
        for (var i = 0; i < Loan.listIds.length; i++) {
            if (tokenId == Loan.listIds[i]) {
                position = i;
                break;
            }
        }
        if (position != -1) {
            Loan.listIds.splice(position, 1);
        }
        delete Loan.listTokens[tokenId];

        Loan.initLoanTable();
    },
    addHistory: function () {
        if (printLog) console.log("addHistory");
        $("#tableloanhistory").empty();
        var node = $("<tr  style='height:60px!important;'></tr>");

        var nodeid = $("<td>ID</td>");
        var nodegrade = $("<td data-lang='grade'></td>").text(getString('grade'));
        var nodeprice = $("<td data-lang='priceday'></td>").text(getString('priceday'));
        var nodeendtime = $("<td data-lang='borrowtime'></td>").text(getString('borrowtime'));
        var nodeaction = $("<td data-lang='borrower' style='text-align: center!important;'></td>").text(getString('borrower'));
        var nodeblock = $("<td data-lang='actiontime' style='text-align: center;'></td>").text(getString('actiontime'));
        node.append(nodeid);
        node.append(nodegrade);
        node.append(nodeprice);
        node.append(nodeendtime);
        node.append(nodeaction);
        node.append(nodeblock);
        $("#tableloanhistory").append(node);

        contractsInstance.Loan.getPastEvents('TokenBorrowed', { fromBlock: 0, toBlock: 'latest' }, function (e, r) {
            Loan.historyLength = r.length;
            for (var i = 0; i < r.length; i++) {
                var event = r[i];
                if (event.event == 'TokenBorrowed') {
                    if (printLog) console.log("TokenBorrowed");
                    // grade
                    var borrow = Loan.createBorrowInfo(event.returnValues.borrower, event.returnValues.tokenId,
                        new BigNumber(event.returnValues.pricePerDay), event.returnValues.borrowDays, event.transactionHash, event.blockNumber);
                    Loan.addBorrowInfo(borrow);
                }
            }
        });
    },
    createBorrowInfo: function (borrower, tokenId, pricePerDay, borrowDays, hash, blockNumber) {
        var info = new Object();
        info.borrower = borrower;
        info.id = tokenId;
        info.price = pricePerDay;
        info.borrowDays = borrowDays;
        info.grade = 1;
        info.hash = hash;
        info.blockNumber = blockNumber;
        return info;
    },
    addBorrowInfo: function (nft) {
        var node = $("<tr style='height:60px!important;'></tr>");

        var nodeid = $("<td></td>").text(formatZero(nft.id, 3));
        node.append(nodeid);

        var nodegradein;
        if (nft.grade == 1) {
            nodegradein = $("<span data-lang='grade1'></span>").text(getString('grade1'));
        }
        else if (nft.grade == 2) {
            nodegradein = $("<span data-lang='grade2'></span>").text(getString('grade2'));
        } else if (nft.grade == 3) {
            nodegradein = $("<span data-lang='grade3'></span>").text(getString('grade3'));
        }

        var nodegrade = $("<td></td>");
        nodegrade.append(nodegradein);
        node.append(nodegrade);

        var price = nft.price.div(Math.pow(10, 18));
        var nodeprice = $("<td></td>").text(price.toFixed(2));
        node.append(nodeprice);

        var nodedays = $("<span></span>").text(nft.borrowDays + " ");
        var nodeday = $("<span data-lang='day'></span>").text(getString('day'));
        var nodeendtime = $("<td></td>");
        nodeendtime.append(nodedays);
        nodeendtime.append(nodeday);

        node.append(nodeendtime);

        var pre = nft.borrower.substr(0, 5);
        var last = nft.borrower.substr(nft.borrower.length - 5, nft.borrower.length - 1);
        var text = pre + "..." + last;
        var nodea = $("<a target='_blank' style='color:blue'></a>").text(text);
        nodea.attr("href", getEthersanUrl(nft.hash));
        var nodetdbtn = $("<td style='text-align: center;'></td>").append(nodea);

        node.append(nodetdbtn);

        web3.eth.getBlock(nft.blockNumber, function (e, r) {
            var timestamp = r.timestamp;
            var now = Math.floor((new Date()).getTime() / 1000);
            var delay = now - timestamp;
            var delaynode = $("<span></span>").text(formatTime2Min(delay) + " ");
            var agonode = $("<span data-lang='ago'></span>").text(getString('ago'));
            var nodeblockNumber = $("<td style='text-align: center;'></td>");
            nodeblockNumber.append(delaynode);
            nodeblockNumber.append(agonode);
            node.append(nodeblockNumber);
            Loan.historyList[timestamp] = node;
            Loan.historyTimes.push(timestamp);
            if (Loan.historyTimes.length == Loan.historyLength) {
                Loan.addAllHistory();
            }

        });

    },
    addAllHistory: function () {
        Loan.historyTimes.sort();
        for (var i = Loan.historyTimes.length - 1; i >= 0; i--) {
            var time = Loan.historyTimes[i];
            var node = Loan.historyList[time];
            $("#tableloanhistory").append(node);
        }
    },
    getNFTInfo: function (id) {
        if (printLog) console.log("getNFTInfo id=" + id);
        contractsInstance.NFTHotPot.methods.getGrade(id).call(function (e, r) {
            var grade = parseInt(r);
            var nft = Loan.createLoanNft(id, grade);
            Loan.listTokens[id] = nft;

            contractsInstance.Loan.methods.reservations(id).call(function (e, r) {
                var tokenId = r[0];
                var borrower = r[2];
                var borrowEndTime = r[3];
                var pricePerDay = r[4];
                var start = r[5];
                var times = r[6];

                var nft = Loan.listTokens[id];

                nft.id = parseInt(tokenId);
                nft.price = new BigNumber(pricePerDay);
                nft.days = parseInt(times);
                nft.startTime = parseInt(start);
                nft.borrower = borrower;
                nft.borrowEndTime = parseInt(borrowEndTime);
                contractsInstance.NFTHotPot.methods.ownerOf(id).call(function (e, r) {
                    if (!e) {
                        nft.owner = r;
                        Loan.addNFTToTable(nft);
                        UserNFT.checkMyBorrowed(nft);
                    }
                });
            });
        });
    },
    initLoanTable: function () {
        if (printLog) console.log("initLoanTable");
        $("#tableloan").empty();
        var node = $("<tr></tr>");
        var nodeid = $("<td>ID</td>");
        var nodegrade = $("<td data-lang='grade'></td>").text(getString('grade'));
        var nodeprice = $("<td data-lang='priceday'></td>").text(getString('priceday'));
        var nodeendtime = $("<td data-lang='nodeendtime'></td>").text(getString('nodeendtime'));
        var nodeaction = $("<td data-lang='action' style='text-align: center;'></td>").text(getString('action'));
        node.append(nodeid);
        node.append(nodegrade);
        node.append(nodeprice);
        node.append(nodeendtime);
        node.append(nodeaction);
        $("#tableloan").append(node);

        for (var i = 0; i < Loan.listIds.length; i++) {
            var id = Loan.listIds[i];
            var nft = Loan.listTokens[id];
            Loan.addNFTToTable(nft);
        }
    },
    addNFTToTable: function (nft) {
        var lasttime = nft.days * (86400) + (nft.startTime);
        var timenow = Math.floor((new Date()).getTime() / 1000);
        if (timenow > lasttime-Loan.threadtime) {
            if (printLog) console.log("this token is out of date");
            return;
        }
        if (nft.borrowEndTime > timenow) {
            if (printLog) console.log("This token is borrowed");
            return;
        }

        var node = $("<tr></tr>");
        node.attr("id", "tr" + nft.id);

        var nodeid = $("<td></td>").text(formatZero(nft.id, 3));
        node.append(nodeid);

        var nodegradein;
        if (nft.grade == 1) {
            nodegradein = $("<span data-lang='grade1'></span>").text(getString('grade1'));
        }
        else if (nft.grade == 2) {
            nodegradein = $("<span data-lang='grade2'></span>").text(getString('grade2'));
        } else if (nft.grade == 3) {
            nodegradein = $("<span data-lang='grade3'></span>").text(getString('grade3'));
        }

        var nodegrade = $("<td></td>");
        nodegrade.append(nodegradein);
        node.append(nodegrade);

        var price = nft.price.div(Math.pow(10, 18));
        var nodeprice = $("<td></td>").text(price.toFixed(2));
        node.append(nodeprice);

        var delay = lasttime - timenow;

        var nodeendtime = $("<td></td>").text(formatTime2Min(delay));
        node.append(nodeendtime);

        var nodetdbtn = $("<td style='text-align: center;'></td>");

        if (Loan.allowance == 0) {
            var nodebtn = $("<button class='green button' data-lang='approve'></button>").text(getString('approve'));
            nodetdbtn.on("click", nodebtn, function () { Loan.approve() });
            nodetdbtn.append(nodebtn);
        } else {
            if (nft.owner == defaultAccount) {
                var nodebtn = $("<button class='green button' data-lang='cancelloan'></button>").text(getString('cancelloan'));
                nodetdbtn.on("click", nodebtn, function () { Loan.cancelDeposit(nft.id) });
                nodetdbtn.append(nodebtn);
            } else {
                var nodebtn = $("<button class='green button' data-lang='borrow'></button>").text(getString('borrow'));
                nodetdbtn.on("click", nodebtn, function () { Loan.borrowNFT(nft.id) });
                nodetdbtn.append(nodebtn);
            }
        }
        node.append(nodetdbtn);

        $("#tableloan").append(node);
    },
    cancelDeposit: function (id) {
        if (printLog) console.log("cancelDeposit " + id);
        var timenow = Math.floor((new Date()).getTime() / 1000);
        if (UserNFT.nftInfos[id].borrowEndTime > timenow) {
            toastAlert(getString('isborrowed'));
            return;
        }
        contractsInstance.Loan.methods.cancelDeposit(id).send({ from: defaultAccount }, function (e, r) {
            afterSendTx(e, r);
        });
    },
    borrowNFT: function (id) {
        if (printLog) console.log("borrowNFT " + id);
        showBorrowAlert(id);
    },
    borrowSure: function () {
        if (printLog) console.log("borrowSure");
        var id = getSellAlertId();
        if (printLog) console.log("loan sure id=" + id);

        hideSellAlert();

        id = parseInt(id);

        //loanInput
        var time = $('.loanInput').val();

        var regex = /^\d+$/;
        if (regex.test(time)) {
            if (time < 366 && time > 0) {

            } else {
                toastAlert(getString('errorloanday'));
                return;
            }
        } else {
            toastAlert(getString('errorloanday'));
            return;
        }
        // object.grade = grade;
        // object.price = 0;
        // object.days = 0;
        // object.startTime = 0;
        // object.owner = null;
        // object.borrowEndTime=0;
        var day = parseInt(time);

        var nft = Loan.listTokens[id];
        var price = nft.price;
        var days = nft.days;
        var starttime = nft.startTime;

        var lasttime = nft.days * (86400) + (nft.startTime);
        var timenow = Math.floor((new Date()).getTime() / 1000);
        var timedelay = lasttime - (timenow);
        var loantime = (day - 1) * 86400;
        if (timedelay < loantime) {
            toastAlert(getString('cannotloanthislong'));
            return;
        }
        if (price.times(day).gt(defaultBalance)) {
            toastAlert(getString('hotnotenough'));
            return;
        }
        contractsInstance.Loan.methods.borrow(id, day).send({ from: defaultAccount }, function (e, result) {
            afterSendTx(e, result);
        });
    },
    approve: function () {
        contractsInstance.HotPot.methods.approve(contractsInstance.Loan._address, web3.utils.numberToHex(new BigNumber(Math.pow(10, 30)))).send({ from: defaultAccount }, function (e, r) {
            afterSendTx(e, r);
        });
    },
    loanNFT: function (id) {
        var nft = UserNFT.nftInfos[id];
        if (!NFT.isAvailable(nft.usetime)) {
            toastAlert(getString('nftnotavailable'));
            return;
        }
        if (nft.loan) {
            toastAlert(getString('loaning'));
            return;
        }
        showLoanAlert(id);
    },
    loanSure: function () {
        var id = getSellAlertId();
        if (printLog) console.log("loan sure id=" + id);

        hideSellAlert();
        var input = $('.stakeInput').val();
        var price = parseFloat(input);
        if (price <= 0) {
            toastAlert(getString('priceerror'));
            return;
        }
        price = web3.utils.numberToHex(new BigNumber(price * Math.pow(10, 18)));
        id = parseInt(id);

        //loanInput
        var time = $('.loanInput').val();

        var regex = /^\d+$/;
        if (regex.test(time)) {
            if (time < 366 && time > 0) {

            } else {
                toastAlert(getString('errorloanday'));
                return;
            }
        } else {
            toastAlert(getString('errorloanday'));
            return;
        }

        var day = parseInt(time);

        contractsInstance.Loan.methods.deposit(id, day, price).send({ from: defaultAccount }, function (e, result) {
            afterSendTx(e, result);
        });
    },
    createLoanNft: function (id, grade) {
        var object = new Object;
        object.id = id;
        object.grade = grade;
        object.price = 0;
        object.days = 0;
        object.startTime = 0;
        object.owner = null;
        object.borrowEndTime = 0;
        object.borrower = null;
        return object;
    }
}

function getPriceBytes(price) {
    var p = (new BigNumber(price)).times(10 ** 18);
    return web3.utils.padLeft(web3.utils.numberToHex(p), 64)
}

Market = {
    listSize: 0,
    listIds: [],
    listTokens: {},
    allowance: 0,
    historyList: {},
    historyTimes: [],
    historyLength: 0,
    initMarketInfo: function () {
        if (printLog) console.log("initMarketInfo");

        Market.initSellTable();
        contractsInstance.HotPot.methods.allowance(defaultAccount, contractsInstance.NFTMarket._address).call(function (e, r) {
            if (!e) {
                Market.allowance = new BigNumber(r);
            }
            contractsInstance.NFTMarket.methods.getListToken().call(function (e, r) {
                if (printLog) console.log("market getListToken=" + r);
                for (var i = 0; i < r.length; i++) {
                    Market.listIds.push(parseInt(r[i]));
                    Market.getNFTInfo(parseInt(r[i]));
                }
            });
        });
        contractsInstance.NFTMarket.methods.getListSize().call(function (e, r) {
            if (printLog) console.log("market size=" + r);
            Market.listSize = parseInt(r);
        });

        contractsInstance.NFTMarket.events.Swapped(function (e, result) {
            if (!e) {
                if (checkSameEvent(result)) {
                    return;
                }
                if (result._buyer == defaultAccount) {
                    toastAlert(getString('buysuccess'));
                }
                if (result._seller == defaultAccount) {
                    toastAlert(getString('sellsuccess'));
                }
            }
        });

        contractsInstance.NFTMarket.events.Listed(function (e, result) {
            if (checkSameEvent(result)) {
                return;
            }

            if (e) {
                if (result.returnValues._seller == defaultAccount)
                    toastAlert("Error:" + e.message);
            } else {
                if (printLog) console.log("Listed " + result.returnValues._tokenId);
                if (result.returnValues._seller == defaultAccount)
                    showTopMsg("List Success", 4000);

                var id = parseInt(result.returnValues._tokenId);
                var price = result.returnValues._price;
                var seller = result.returnValues._seller;

                Market.listIds.push(3);
                var nft = Market.createSellNft(id, 1);
                nft.price = new BigNumber(price);
                nft.seller = seller;
                contractsInstance.NFTHotPot.methods.getGrade(id).call(function (e, r) {
                    if (!e) {
                        nft.grade = parseInt(r);
                        Market.addNFTToTable(nft);
                        Market.listTokens[id] = nft;
                        if (nft.seller == defaultAccount) {
                            UserNFT.addSellList(nft);
                        }
                    }
                });
            }
        });
        if (printLog) console.log("Unlisted");
        contractsInstance.NFTMarket.events.Unlisted(function (e, result) {
            if (checkSameEvent(result)) {
                return;
            }
            if (printLog) console.log("Unlisted block num=" + result.blockNumber);
            if (result.returnValues._seller == defaultAccount) {
                UserNFT.removeSellList(parseInt(result.returnValues._tokenId));
            }
            Market.removeNFT(parseInt(result.returnValues._tokenId));
            if (result.returnValues._seller == defaultAccount)
                showTopMsg("Unlist Success", 4000);
        });
        Market.addHistory();
    },
    addHistory: function () {
        if (printLog) console.log("addHistory");
        $("#tablesellhistory").empty();
        var node = $("<tr  style='height:60px!important;'></tr>");
        var nodeid = $("<td>ID</td>");
        var nodegrade = $("<td data-lang='grade'></td>").text(getString('grade'));
        var nodeprice = $("<td data-lang='price'></td>").text(getString('price'));
        var nodeaction = $("<td data-lang='buyer' style='text-align: center!important;'></td>").text(getString('buyer'));
        var nodeblock = $("<td data-lang='actiontime' style='text-align: center;'></td>").text(getString('actiontime'));
        node.append(nodeid);
        node.append(nodegrade);
        node.append(nodeprice);
        node.append(nodeaction);
        node.append(nodeblock);
        $("#tablesellhistory").append(node);

        contractsInstance.NFTMarket.getPastEvents('Swapped', { fromBlock: 0, toBlock: 'latest' }, function (e, r) {
            Market.historyLength = r.length;
            for (var i = 0; i < r.length; i++) {
                var event = r[i];
                if (event.event == 'Swapped') {
                    if (printLog) console.log("Swapped");
                    var info = Market.createSellInfo(event.returnValues._buyer, event.returnValues._tokenId,
                        new BigNumber(event.returnValues._price), event.transactionHash, event.blockNumber);
                    Market.addSellInfo(info);
                }
            }
        });
    },
    createSellInfo: function (buyer, tokenId, price, hash, blockNumber) {
        var info = new Object();
        info.buyer = buyer;
        info.id = tokenId;
        info.price = price;
        info.grade = 1;
        info.hash = hash;
        info.blockNumber = blockNumber;
        return info;
    },
    addSellInfo: function (nft) {
        // var h = $("<p></p>").text(info.borrower+" borrowed ID="+info.tokenId+",price per day "+info.pricePerDay/10**18+" HotPot");
        // $("#loanhistory").append(h);
        var node = $("<tr  style='height:60px!important;'></tr>");

        var nodeid = $("<td></td>").text(formatZero(nft.id, 3));
        node.append(nodeid);

        var nodegradein;
        if (nft.grade == 1) {
            nodegradein = $("<span data-lang='grade1'></span>").text(getString('grade1'));
        }
        else if (nft.grade == 2) {
            nodegradein = $("<span data-lang='grade2'></span>").text(getString('grade2'));
        } else if (nft.grade == 3) {
            nodegradein = $("<span data-lang='grade3'></span>").text(getString('grade3'));
        }

        var nodegrade = $("<td></td>");
        nodegrade.append(nodegradein);
        node.append(nodegrade);

        var price = nft.price.div(Math.pow(10, 18));
        if (price > 10000) {
            price = 0;
        }
        var nodeprice = $("<td></td>").text(price.toFixed(2));
        node.append(nodeprice);

        var pre = nft.buyer.substr(0, 5);
        var last = nft.buyer.substr(nft.buyer.length - 5, nft.buyer.length - 1);
        var text = pre + "..." + last;
        var nodea = $("<a target='_blank' style='color:blue'></a>").text(text);
        nodea.attr("href", getEthersanUrl(nft.hash));
        var nodetdbtn = $("<td style='text-align: center;'></td>").append(nodea);

        node.append(nodetdbtn);

        web3.eth.getBlock(nft.blockNumber, function (e, r) {
            var timestamp = r.timestamp;
            var now = Math.floor((new Date()).getTime() / 1000);
            var delay = now - timestamp;

            var delaynode = $("<span></span>").text(formatTime2Min(delay) + " ");
            var agonode = $("<span data-lang='ago'></span>").text(getString('ago'));
            var nodeblockNumber = $("<td style='text-align: center;'></td>");
            nodeblockNumber.append(delaynode);
            nodeblockNumber.append(agonode);
            node.append(nodeblockNumber);
            Market.historyList[timestamp] = node;
            Market.historyTimes.push(timestamp);
            if (Market.historyTimes.length == Market.historyLength) {
                Market.addAllHistory();
            }

        });

    },
    addAllHistory: function () {
        Market.historyTimes.sort();
        for (var i = Market.historyTimes.length - 1; i >= 0; i--) {
            var time = Market.historyTimes[i];
            var node = Market.historyList[time];
            $("#tablesellhistory").append(node);
        }
    },
    removeNFT: function (tokenId) {
        if (printLog) console.log("removeNFT=" + tokenId);
        var position = -1;
        for (var i = 0; i < Market.listIds.length; i++) {
            if (tokenId == Market.listIds[i]) {
                position = i;
                break;
            }
        }
        if (position != -1) {
            Market.listIds.splice(0, 1);
        }
        delete Market.listTokens[tokenId];
        var id = "#tr" + tokenId;
        $(id).remove();
    },
    approve: function () {
        contractsInstance.HotPot.methods.approve(contractsInstance.NFTMarket._address, web3.utils.numberToHex(new BigNumber(Math.pow(10, 30)))).send({ from: defaultAccount }, function (e, r) {
            afterSendTx(e, r);
        });
    },
    cancelSell: function (id) {
        if (printLog) console.log("cancleSell " + id);
        contractsInstance.NFTMarket.methods.unlist(id).send({ from: defaultAccount }, function (e, r) {
            afterSendTx(e, r);
        });
    },
    buyNFT: function (id) {
        if (printLog) console.log("buyNFT " + id);
        var price = Market.listTokens[id].price;
        if (defaultBalance.lt(price)) {
            toastAlert(getString('hotnotenough'));
            return;
        }
        contractsInstance.NFTMarket.methods.swap(id).send({ from: defaultAccount }, function (e, r) {
            afterSendTx(e, r);
        })
    },
    sellNFT: function (id) {
        if (!UserNFT.isAvailable(id)) {
            toastAlert(getString('nftnotavailable'));
            return;
        }
        var nft = UserNFT.nftInfos[id];
        if (nft.loan) {
            toastAlert(getString('loaning'));
            return;
        }
        showSellAlert(id);
    },
    sellSure: function () {
        var id = getSellAlertId();
        if (printLog) console.log("sell sure id=" + id);

        hideSellAlert();
        var input = $('.stakeInput').val();
        var price = parseFloat(input);
        if (price <= 0) {
            toastAlert(getString('priceerror'));
            return;
        }
        id = parseInt(id);
        //['address,address,uint256,bytes']
        contractsInstance.NFTHotPot.methods.safeTransferFrom(defaultAccount, contractAddress.market, id, getPriceBytes(price)).send({ from: defaultAccount }, function (e, result) {
            if (e) {
                toastAlert("Error:" + e.message);
            } else {
                showTopMsg("Pending...", 0, getEthersanUrl(result));
                startListenTX(result);
            }
        });
    },
    getNFTInfo: async function (id) {
        if (printLog) console.log("getNFTInfo id=" + id);
        contractsInstance.NFTMarket.methods.sellerOf(id).call(function (e, r) {
            if (r == defaultAccount) {
                var nft = NFT.createNFTInfo(id, defaultAccount);
                UserNFT.sellNFTs[id] = nft;
                UserNFT.sellNFTs[id].sell = true;
                UserNFT.sellIds.push(id);
                UserNFT.userBalance = UserNFT.userBalance.plus(1);
                UserNFT.updateUserNFT();
            }
            contractsInstance.NFTHotPot.methods.getGrade(id).call(function (e, r) {
                var grade = parseInt(r);
                if (UserNFT.sellNFTs[id])
                    UserNFT.sellNFTs[id].grade = grade;
                var nft = Market.createSellNft(id, grade);
                Market.listTokens[id] = nft;

                contractsInstance.NFTMarket.methods.priceOf(id).call(function (e, r) {
                    var price = new BigNumber(r);
                    Market.listTokens[id].price = price;
                    contractsInstance.NFTMarket.methods.sellerOf(id).call(function (e, r) {
                        Market.listTokens[id].seller = r;
                        Market.addNFTToTable(Market.listTokens[id]);
                    });

                });
            });
        });

    },

    initSellTable: function () {
        if (printLog) console.log("initSellTable");
        $("#tablesell").empty();
        var node = $("<tr></tr>");
        var nodeid = $("<td>ID</td>");
        var nodegrade = $("<td data-lang='grade'></td>").text(getString('grade'));
        var nodeprice = $("<td data-lang='price'></td>").text(getString('price'));
        var nodeaction = $("<td data-lang='action' style='text-align: center;'></td>").text(getString('action'));
        node.append(nodeid);
        node.append(nodegrade);
        node.append(nodeprice);
        node.append(nodeaction);
        $("#tablesell").append(node);

        for (var i = 0; i < Market.listIds.length; i++) {
            var id = Market.listIds[i];
            var nft = Market.listTokens[id];
            if (printLog) console.log("i=" + i + ",id=" + id + ",nft id=" + nft.id);
            Market.addNFTToTable(nft);
        }
    },
    addNFTToTable: function (nft) {
        var node = $("<tr></tr>");
        node.attr("id", "tr" + nft.id);

        var nodeid = $("<td></td>").text(formatZero(nft.id, 3));
        node.append(nodeid);

        var nodegradein;
        if (nft.grade == 1) {
            nodegradein = $("<span data-lang='grade1'></span>").text(getString('grade1'));
        }
        else if (nft.grade == 2) {
            nodegradein = $("<span data-lang='grade2'></span>").text(getString('grade2'));
        } else if (nft.grade == 3) {
            nodegradein = $("<span data-lang='grade3'></span>").text(getString('grade3'));
        }

        var nodegrade = $("<td></td>");
        nodegrade.append(nodegradein);
        node.append(nodegrade);

        var price = nft.price.div(Math.pow(10, 18));
        var nodeprice = $("<td></td>").text(price.toFixed(2));
        node.append(nodeprice);

        var nodetdbtn = $("<td style='text-align: center;'></td>");

        if (Market.allowance == 0) {
            var nodebtn = $("<button class='green button' data-lang='approve'></button>").text(getString('approve'));
            nodetdbtn.on("click", nodebtn, function () { Market.approve() });
            nodetdbtn.append(nodebtn);
        } else {
            if (nft.seller == defaultAccount) {
                var nodebtn = $("<button class='green button' data-lang='cancelsell'></button>").text(getString('cancelsell'));
                nodetdbtn.on("click", nodebtn, function () { Market.cancelSell(nft.id) });
                nodetdbtn.append(nodebtn);
            } else {
                var nodebtn = $("<button class='green button' data-lang='buy'></button>").text(getString('buy'));
                nodetdbtn.on("click", nodebtn, function () { Market.buyNFT(nft.id) });
                nodetdbtn.append(nodebtn);
            }
        }
        node.append(nodetdbtn);

        $("#tablesell").append(node);
    },
    createSellNft: function (id, grade) {
        var object = new Object;
        object.id = id;
        object.grade = grade;
        object.price = 0;
        object.seller = null;
        return object;
    }
}
var nftUse = [
    'reward',
    'stake',
    'me'
]

NFT = {
    createNFT: function (nft, use) {
        var nodeli = $("<li class='pricingTable-firstTable_table'></li>");

        var nodename = $("<span data-lang='grade1mb'></span>").text(getString('grade1mb'));
        if (nft.grade == 2) {
            nodename = $("<span data-lang='grade2mb'></span>").text(getString('grade2mb'));
        } else if (nft.grade == 3) {
            nodename = $("<span data-lang='grade3mb'></span>").text(getString('grade3mb'));
        }
        var nodeh1 = $("<h1 class='pricingTable-firstTable_table__header'></h1>");
        nodeh1.append(nodename);

        //<span>ID:</span><span>002</span><span>/1000</span>
        var phtml = "<span>ID:</span><span>" + formatZero(nft.id, 3) + "</span><span>/1000</span>";
        var nodep = $("<p class='pricingTable-firstTable_table__pricing'></p>").html(phtml);
        var nodeul = $("<ul class='pricingTable-firstTable_table__options'></ul>");
        var nodeavailable = $("<span data-lang='available'></span>").text(getString('available'));
        var canUse = true;

        if (nft.loan) {
            nodeavailable = $("<span data-lang='loaninginfo'></span>").text(getString('loaninginfo'));
        } else if (nft.sell) {
            nodeavailable = $("<span data-lang='selling'></span>").text(getString('selling'));
        }
        else {
            var usetime = parseInt((nft.usetime).valueOf());
            var delay = usetime + 86400 - ((new Date()).getTime()) / 1000;

            if (delay > 0) {
                canUse = false;

                let fomoTime = Math.floor(delay);
                if (printLog) console.log("charger time=" + fomoTime + ",id=" + nft.id);
                nodeavailable = $("<span></span>");
                var nodetime0 = $("<span  data-lang='charging'></span>").text(getString('charging'));
                nodeavailable.append(nodetime0);
                var nodetime = $("<span></span>");
                nodetime.attr("id", "nftusetime" + nft.id);
                nodeavailable.append(nodetime);
                if (fomoTime > 0) {
                    setInterval(() => {
                        fomoTime -= 1;
                        $("#nftusetime" + nft.id).text(" : " + formatTime(fomoTime))
                    }, 1000);
                }
            }
        }

        var nodeli1 = $("<li></li>");
        nodeli1.append(nodeavailable);
        nodeul.append(nodeli1);

        var borrowEndTime = nft.borrowEndTime;
        var now = Math.floor(((new Date()).getTime()) / 1000);

        if (borrowEndTime > now) {
            var nodeli2 = $("<li></li>");
            var nodeborrow = $("<span></span>");
            var nodeborrowinfo = $("<span  data-lang='borrowed'></span>").text(getString('borrowed'));
            nodeborrow.append(nodeborrowinfo);
            var nodeborrowtime = $("<span></span>").text(" : " + formatTime2Min(borrowEndTime - now));
            nodeborrow.append(nodeborrowtime);
            nodeli2.append(nodeborrow);
            nodeul.append(nodeli2);
        }

        nodeli.append(nodeh1);
        nodeli.append(nodep);
        nodeli.append(nodeul);

        var nodediv;
        if (!nft.sell && !nft.loan) {
            if (use === nftUse[1]) {
                if (canUse) {
                    nodediv = $("<div data-lang='claim'  class='pricingTable-firstTable_table__getstart'></div>").text(getString('claim'));
                    nodeli.on("click", nodediv, function () { Stake.claimByNFT(nft.id) });
                }
                else {
                    nodediv = $("<div data-lang='waitcharge' class='pricingTable-firstTable_table__getstart'></div>").text(getString('waitcharge'));
                }
            } else if (use === nftUse[0]) {
                if (canUse) {
                    nodediv = $("<div data-lang='bonus' class='pricingTable-firstTable_table__getstart'></div>").text(getString('bonus'));
                    nodeli.on("click", nodediv, function () { Reward.rewardByNFT(nft.id) });
                }
                else {
                    nodediv = $("<div data-lang='waitcharge' class='pricingTable-firstTable_table__getstart'></div>").text(getString('waitcharge'));
                }
            } else if (use === nftUse[2] && !nft.borrowed) {
                if (!nft.loan && !nft.sell) {
                    nodediv = $("<table></table>");
                    var nodetr = $("<tr></tr>");
                    var nodeth1 = $("<th style='background-color: white!important;padding:0px!important;'></th>");
                    var nodebtn1 = $("<div style='margin-right:5px;margin-left:5px;' data-lang='loan' class='pricingTable-firstTable_table__getstart' onclick='Loan.loanNFT(" + nft.id + ")'></div>").text(getString('loan'));
                    nodeth1.append(nodebtn1);
                    var nodeth2 = $("<th style='background-color: white!important;padding:0px!important;'></th>");
                    var nodedivsell = $("<div style='margin-right:5px;margin-left:5px;' data-lang='sell' class='pricingTable-firstTable_table__getstart' onclick='Market.sellNFT(" + nft.id + ")'></div>").text(getString('sell'));
                    nodeth2.append(nodedivsell);
                    nodetr.append(nodeth1);
                    nodetr.append(nodeth2);
                    nodediv.append(nodetr);
                }
            }
        } else {
            if (nft.loan)
                nodediv = $("<div data-lang='cancelloan' class='pricingTable-firstTable_table__getstart' onclick='Loan.cancelDeposit(" + nft.id + ")'></div>").text(getString('cancelloan'));
            if (nft.sell)
                nodediv = $("<div data-lang='cancelsell' class='pricingTable-firstTable_table__getstart' onclick='Market.cancelSell(" + nft.id + ")'></div>").text(getString('cancelsell'));
        }
        nodeli.append(nodediv);
        return nodeli;
    },
    createNFTs: function (ids, nfts, use) {
        if (ids.length <= 3) {
            var nodeul = $("<ul class='pricingTable-firstTable'></ul>");
            for (var i = 0; i < ids.length; i++) {
                var node = NFT.createNFT(nfts[ids[i]], use);
                nodeul.append(node);
            }
            return nodeul;
        } else {
            var nodediv = $("<div></div>");
            var size = Math.ceil(ids.length / 3);
            for (var j = 0; j < size; j++) {
                var nodeul = $("<ul class='pricingTable-firstTable'></ul>");
                for (var i = 0; i < 3; i++) {
                    var count = 3 * j + i;
                    if (count > ids.length - 1) {
                        break;
                    }
                    var node = NFT.createNFT(nfts[ids[count]], use);
                    nodeul.append(node);
                }
                nodediv.append(nodeul);
            }
            return nodediv;
        }
    },
    createNFTInfo: function (id, owner) {
        var nft = new Object;
        nft.id = id;
        nft.grade = 0;
        nft.owner = owner;
        nft.usetime = 0;
        nft.loan = false;
        nft.sell = false;
        nft.borrowed = false;
        nft.borrowEndTime = 0;
        return nft;
    },
    isAvailable: function (usetime) {
        var now = Math.floor((new Date()).getTime() / 1000);
        return usetime + 86400 < now;
    }
}


UserNFT = {
    nftIds: Array(),
    nftInfos: {},
    sellIds: Array(),
    sellNFTs: {},
    borrowIds: Array(),
    borrowNFTs: {},
    totalNFT: 0,
    userBalance: 0,
    gotoMyPage: function () {

    },
    nftBorrowed: function (object) {
        var borrower = object.borrower;
        var tokenId = parseInt(object.tokenId);
        if (borrower == defaultAccount) {
            if (printLog) console.log("I borrow this nft");
            UserNFT.borrowIds.push(tokenId);
            var borrow = NFT.createNFTInfo(tokenId, object.owner);
            borrow.grade = parseInt(object.grade);
            borrow.borrowed = true;
            borrow.borrowEndTime = parseInt(object.borrowEndTime);
            UserNFT.borrowNFTs[tokenId] = borrow;
            contractsInstance.NFTHotPot.methods.getUseTime(tokenId).call(function (e, r) {
                if (!e) {
                    UserNFT.borrowNFTs[tokenId].usetime = parseInt(r);
                }
            });
            UserNFT.updateNFTTable();
            if(printLog) console.log("UseTicket set id="+tokenId);

            contractsInstance.NFTHotPot.events.UseTicket({ filter: { tokenId: tokenId } }, function (e, r) {
                if(printLog) console.log("UseTicket id="+r.returnValues.tokenId);
                var id = parseInt(r.returnValues.tokenId);
                if (UserNFT.borrowNFTs[id].grade==0) {
                    return;
                }
                if (checkSameEvent(r)) {
                    return;
                }
                if (printLog) console.log("nft UseTicket tokenid=" + r.returnValues.tokenId);
                
                var time = parseInt(r.returnValues.useTime);
                UserNFT.borrowNFTs[id].usetime = time;
                UserNFT.updateNFTTable();
            });
        } else {
            var nft = UserNFT.nftInfos[tokenId];
            if (nft.id != 0) {
                if (printLog) console.log("My nft is borrowed");
                nft.borrowed = true;
                nft.borrowEndTime = parseInt(object.borrowEndTime);
                UserNFT.updateNFTTable();
            }
        }
    },
    checkMyBorrowed: function (nft) {
        if (nft.borrower == defaultAccount) {
            var id = nft.id;
            var timenow = Math.floor((new Date()).getTime() / 1000);
            if (nft.borrowEndTime < timenow) {
                return;
            }
            UserNFT.borrowIds.push(nft.id);
            var borrow = NFT.createNFTInfo(nft.id, nft.owner);
            borrow.grade = nft.grade;
            borrow.borrowed = true;
            borrow.borrowEndTime = nft.borrowEndTime;
            UserNFT.borrowNFTs[nft.id] = borrow;
            contractsInstance.NFTHotPot.methods.getUseTime(id).call(function (e, r) {
                if (!e) {
                    UserNFT.borrowNFTs[id].usetime = parseInt(r);
                }
            });
            if (printLog) console.log("checkMyBorrowed UseTicket=" + id);

            contractsInstance.NFTHotPot.events.UseTicket({ filter: { tokenId: id } }, function (e, r) {
                var id = parseInt(r.returnValues.tokenId);
                if(printLog) console.log("UseTicket id="+r.returnValues.tokenId);
                if (UserNFT.borrowNFTs[id].grade==0) {
                    return;
                }
                if (checkSameEvent(r)) {
                    return;
                }
                if (printLog) console.log("nft UseTicket tokenid=" + r.returnValues.tokenId);
               
                var time = parseInt(r.returnValues.useTime);
                UserNFT.borrowNFTs[id].usetime = time;
                UserNFT.updateNFTTable();
            });
        }
    },
    addLoanList: function (tokenId) {
        if (printLog) console.log("addLoanList " + tokenId);
        UserNFT.nftInfos[tokenId].loan = true;
        UserNFT.updateNFTTable();
    },
    removeLoanList: function (tokenId) {
        if (printLog) console.log("removeLoanList " + tokenId);
        UserNFT.nftInfos[tokenId].loan = false;
        UserNFT.updateNFTTable();
    },
    removeSellList: function (tokenId) {
        if (printLog) console.log("removeSellList " + tokenId);
        var position = -1;
        for (var i = 0; i < UserNFT.sellIds.length; i++) {
            if (tokenId == UserNFT.sellIds[i]) {
                position = i;
                break;
            }
        }
        if (position != -1) {
            UserNFT.sellIds.splice(position, 1);
        }
        delete UserNFT.sellNFTs[tokenId];
        UserNFT.updateNFTTable();
        UserNFT.userBalance = UserNFT.userBalance.minus(1);
        UserNFT.updateUserNFT();
    },
    addSellList: function (nft) {
        var id = nft.id;
        if (printLog) console.log("addSellList id=" + nft.id);
        UserNFT.sellNFTs[id] = nft;
        UserNFT.sellNFTs[id].sell = true;
        UserNFT.sellIds.push(id);
        UserNFT.userBalance = UserNFT.userBalance.plus(1);
        UserNFT.updateUserNFT();
    },
    isAvailable: function (id) {
        var nft = UserNFT.nftInfos[id];
        return NFT.isAvailable(nft.usetime);
    },
    updateMysell: function () {
        $(".mysell").text(sellIds.length);
    },
    updateMyLoan: function () {
        $(".myloan").text();
    },
    updateTotalNFT: function () {
        $(".ticketbalance").text(UserNFT.totalNFT);
    },
    updateUserNFT: function () {
        if (printLog) console.log("updateUserNFT");
        $(".myticketbalance").text(UserNFT.userBalance);
    },
    deleteNFT: function (tokenId) {
        if (printLog) console.log("deleteNFT " + tokenId);
        var position = -1;
        for (var i = 0; i < UserNFT.nftIds.length; i++) {
            if (tokenId == UserNFT.nftIds[i]) {
                position = i;
                break;
            }
        }
        if (position != -1) {
            UserNFT.nftIds.splice(position, 1);
        }
        delete UserNFT.nftInfos[tokenId];
        UserNFT.updateNFTTable();
    },
    addNFT: function (tokenId) {
        if (printLog) console.log("addNFT " + tokenId);
        UserNFT.nftIds.push(tokenId);
        var nft = NFT.createNFTInfo(tokenId, defaultAccount);
        UserNFT.nftInfos[tokenId] = nft;
        contractsInstance.NFTHotPot.methods.getGrade(tokenId).call(function (e, result) {
            if (printLog) console.log("get grade id=" + tokenId + ",grade=" + result);
            UserNFT.nftInfos[tokenId].grade = parseInt(result);
            UserNFT.getUseTime(tokenId);
            UserNFT.updateNFTTable();
        });
    },
    getNFTBalances: function () {
        if (printLog) console.log("getNFTBalances");
        // initiate contract for an address

        contractsInstance.NFTHotPot.methods.totalSupply().call(function (e, result) {
            UserNFT.totalNFT = new BigNumber(result);
            UserNFT.updateTotalNFT();
        });
        // event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
        // Transfer
        contractsInstance.NFTHotPot.events.Transfer({ filter: { from: defaultAccount } }, function (e, r) {
            if (r.returnValues.from != defaultAccount) {
                return;
            }
            if (checkSameEvent(r)) {
                return;
            }
            if (printLog) console.log("nft out tokenid=" + r.returnValues.tokenId + ",to " + r.returnValues.to);
            if (printLog) console.log("nft block num=" + r.blockNumber);
            UserNFT.deleteNFT(parseInt(r.returnValues.tokenId));
            UserNFT.userBalance = UserNFT.userBalance.minus(1);
            UserNFT.updateUserNFT();
        });
        contractsInstance.NFTHotPot.events.Transfer({ filter: { to: defaultAccount } }, function (e, r) {
            if (r.returnValues.to != defaultAccount) {
                return;
            }
            if (checkSameEvent(r)) {
                return;
            }
            if (printLog) console.log("nft in tokenid=" + r.returnValues.tokenId + ",from " + r.returnValues.from);
            UserNFT.addNFT(parseInt(r.returnValues.tokenId));
            UserNFT.userBalance = UserNFT.userBalance.plus(1);
            UserNFT.updateUserNFT();
        });
        contractsInstance.NFTHotPot.events.UseTicket({ filter: { owner: defaultAccount } }, function (e, r) {
            if (r.returnValues.owner != defaultAccount) {
                return;
            }
            if (checkSameEvent(r)) {
                return;
            }
            if (printLog) console.log("nft UseTicket tokenid=" + r.returnValues.tokenId);
            var id = parseInt(r.returnValues.tokenId);
            var time = parseInt(r.returnValues.useTime);
            UserNFT.nftInfos[id].usetime = time;

            UserNFT.updateNFTTable();
        });

        // call constant function
        contractsInstance.NFTHotPot.methods.balanceOf(defaultAccount).call(function (error, result) {
            if (printLog) console.log("getNFTBalances balanceOf=" + result) // '0x25434534534'
            UserNFT.userBalance = new BigNumber(result);
            UserNFT.nftIds = Array();

            $(".myticketbalance").text(result);

            for (var i = 0; i < result; i++) {
                contractsInstance.NFTHotPot.methods.tokenOfOwnerByIndex(defaultAccount, i).call(function (e, result) {
                    result = parseInt(result);
                    if (printLog) console.log("tokenOfOwnerByIndex id=" + result);
                    UserNFT.nftIds.push(result);
                    var nft = NFT.createNFTInfo(result, defaultAccount);
                    UserNFT.nftInfos[result] = nft;
                    UserNFT.getNFTInfo(result);
                });
            }
        });
    },
    getNFTInfo: function (id) {
        contractsInstance.NFTHotPot.methods.getGrade(id).call(function (e, result) {
            result = parseInt(result);
            if (printLog) console.log("get grade id=" + id + ",grade=" + result);
            UserNFT.nftInfos[id].grade = result;
            if (result == 1) {
                $("#grade1num").text(parseInt($("#grade1num").text()) + 1);
            } else if (result == 2) {
                $("#grade2num").text(parseInt($("#grade2num").text()) + 1);
            } else if (result == 3) {
                $("#grade3num").text(parseInt($("#grade3num").text()) + 1);
            }
            UserNFT.getUseTime(id);
        });

        contractsInstance.Loan.methods.reservations(id).call(function (e, r) {
            var tokenId = r[0];
            var owner = r[1];
            var borrower = r[2];
            var borrowEndTime = parseInt(r[3]);
            var pricePerDay = r[4];
            var start = parseInt(r[5]);
            var times = parseInt(r[6]);

            var lasttime = times * (86400) + (start);
            var timenow = Math.floor((new Date()).getTime() / 1000);
            if (timenow < lasttime) {
                if (printLog) console.log("this token is loan");
                UserNFT.nftInfos[id].loan = true;
            }
            if (borrowEndTime > timenow) {
                UserNFT.nftInfos[id].borrowed = true;
                UserNFT.nftInfos[id].borrowEndTime = borrowEndTime;
            }
        });
    },
    getUseTime: function (id) {
        contractsInstance.NFTHotPot.methods.getUseTime(id).call(function (e, result) {
            result = parseInt(result);
            if (printLog) console.log("get use time id=" + id + ",time=" + result);
            UserNFT.nftInfos[id].usetime = parseInt(result);
            var endTime = result + 86400;
            var now = (new Date()).getTime() / 1000;
            var grade = UserNFT.nftInfos[id].grade;
            //it is not available now
            if (endTime > now) {

            } else {
                if (grade == 1) {
                    $("#grade1unuse").text(parseInt($("#grade1unuse").text()) + 1);
                } else if (grade == 2) {
                    $("#grade2unuse").text(parseInt($("#grade2unuse").text()) + 1);
                } else if (grade == 3) {
                    $("#grade3unuse").text(parseInt($("#grade3unuse").text()) + 1);
                }
            }

        });
    },
    initNFTTable: function (use) {
        $("#pricingTable").empty();
        var totalIds = Array();
        var nfts = {};
        for (var i = 0; i < UserNFT.nftIds.length; i++) {
            var id = UserNFT.nftIds[i];
            totalIds.push(id);
            nfts[id] = UserNFT.nftInfos[id];
        }
        for (var i = 0; i < UserNFT.sellIds.length; i++) {
            var id = UserNFT.sellIds[i];
            totalIds.push(id);
            nfts[id] = UserNFT.sellNFTs[id];
        }
        for (var i = 0; i < UserNFT.borrowIds.length; i++) {
            var id = UserNFT.borrowIds[i];
            totalIds.push(id);
            nfts[id] = UserNFT.borrowNFTs[id];
        }
        $("#pricingTable").append(NFT.createNFTs(totalIds, nfts, use));
    },
    updateNFTTable: function () {
        if (printLog) console.log("updateNFTTable page=" + currentPage);
        if (currentPage === "reward") {
            UserNFT.initNFTTable(nftUse[0]);
        } else if (currentPage === "me") {
            UserNFT.initNFTTable(nftUse[2]);
        } else {
            if (currentPagePoolID != "") {
                UserNFT.initNFTTable(nftUse[1]);
            }
        }
    }
}



Reward = {
    gotoPage: function () {
        if (printLog) console.log("Reward gotoPage");
        Reward.getRewardInfo();
    },
    getRewardInfo: function () {
        if (printLog) console.log("getReward");

        // call constant function
        contractsInstance.Reward.methods.getBalance().call(function (error, result) {
            if (error) {
                if (printLog) console.log("Reward.getBalance error : " + error);
                return;
            }
            if (printLog) console.log("reward balanceOf=" + result) // '0x25434534534'
            var total = (result / Math.pow(10, 18)).toFixed(2);
            $(".totalreward").text(total + " HotPot");
        });
        contractsInstance.Reward.methods.calNormalReward(1).call(function (e, result) {
            if (e) {
                toastAlert("Error with calReward:" + e);
                return console.error('Error with getReward:', e);
            }

            var total = (result / Math.pow(10, 18)).toFixed(2);
            if (printLog) console.log("calReward " + total);
            $("#rewardpercard").text(total);
        });
    },
    claim: function () {
        if (UserNFT.nftIds.length + UserNFT.borrowIds.length == 0) {
            //$.i18n.map[i]
            toastAlert($.i18n.map['nocard']);
        } else {
            UserNFT.initNFTTable(nftUse[0]);
            showTable(true);
        }
    },
    rewardByNFT: function (id) {
        if (printLog) console.log("rewardByNFT : " + id);
        contractsInstance.Reward.events.WithdrawReward({ filter: { sender: defaultAccount } }, function (e, result) {
            if (!e) {
                if (result.returnValues.sender != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }
                toastAlert(getString('rewardsuccess'));
            }
        });

        contractsInstance.Reward.methods.getReward(id).send({ from: defaultAccount }, function (e, result) {
            if (e) {
                toastAlert("Error with getReward:" + e);
                return console.error('Error with getReward:', e);
            }
            showTopMsg("Pending...", 0, getEthersanUrl(result));
            startListenTX(result);
        });
    },
}

Stake = {
    count: 0,
    cliamTimer: null,
    maxEnable:false,
    notifyRewardAmount: function (token, amount) {
        var amount = web3.utils.numberToHex(new BigNumber(amount * 10 ** 18));
        stakeInfos[token].instance.methods.notifyRewardAmount(amount).send({ from: defaultAccount }, function (e, result) {
            if (e) {
                if (printLog) console.log("stake approve error " + e);
            } else {
                var url = "https://etherscan.io/tx/" + result;
                if (ETHENV.chainId == '0x1') {
                    url = "https://etherscan.io/tx/" + result;
                } else if (ETHENV.chainId == '0x3') {
                    url = "https://ropsten.etherscan.io/tx/" + result;
                }
                showTopMsg("Pending...", 0, url);
                startListenTX(result);
            }
        });
    },
    claimByNFT: function (id) {
        if (printLog) console.log("claimByNFT " + id);
        var token = stakeInfos[currentPagePoolID];
        if (token.userEarn == 0) {
            toastAlert(getString('noearned'));
            return;
        } else {
            token.instance.methods.getRewardByNFT(id).send({ from: defaultAccount }, function (e, r) {
                afterSendTx(e, r);
            });
        }
    },
    approve: function () {
        if (printLog) console.log("stake approve:" + currentPagePoolID);
        if (currentPagePoolID != "") {
            var stakeToken = stakeERCContract[currentPagePoolID];
            if (printLog) console.log("approve " + stakeToken._address);
            var num = new BigNumber(10 ** 30);
            stakeToken.methods.approve(stakePoolAddress[currentPagePoolID], web3.utils.numberToHex(num)).send({ from: defaultAccount }, function (e, result) {
                afterSendTx(e, result);
                if (!e) {
                    $("#approvestake").text(getString('approvestake') + "...");
                }
            });
        }
    },
    //currentPagePoolID
    claimFree: function () {
        var token = stakeInfos[currentPagePoolID];
        if (token.userEarn == 0) {
            toastAlert(getString('noearned'));
            return;
        } else {

            var lastRewardTime = parseInt((token.lastRewardTime).valueOf());
            var now = Math.floor(((new Date()).getTime()) / 1000);
            var delay = lastRewardTime + 86400 - now;
            if (delay > 0) {
                toastAlert(getString('canclaimtoday'));
                return;
            }
            token.instance.methods.getRewardFree().send({ from: defaultAccount }, function (e, r) {
                afterSendTx(e, r);
            });
        }
    },
    claimNFT: function () {
        var token = stakeInfos[currentPagePoolID];
        if (token.userEarn == 0) {
            toastAlert(getString('noearned'));
            return;
        }
        if (UserNFT.nftIds.length + UserNFT.borrowIds.length == 0) {
            //$.i18n.map[i]
            toastAlert($.i18n.map['nocard']);
        } else {
            toastAlert(getString('choosecard'));
            UserNFT.initNFTTable(nftUse[1]);
            showTable(true);
        }
    },
    stake: function () {
        if (printLog) console.log("stake");
        if (stakeInfos[currentPagePoolID].userBalance == 0) {
            toastAlert(getString('noenoughstake'));
            return;
        }
        Stake.maxEnable = false;
        document.getElementById("popTitle").innerHTML = "Stake";
        var userBalance = (stakeInfos[currentPagePoolID].userBalance / Math.pow(10, stakeInfos[currentPagePoolID].decimals)).toFixed(4);
        $('#maxAvaliable').text(userBalance);
        document.getElementById('stakeInput').value = 0;
        $("#withdrawdiv").hide();
        $("#stakediv").show();
        showAlert();
    },
    withdraw: function () {
        if (printLog) console.log("stake");
        if (stakeInfos[currentPagePoolID].userStake == 0) {
            toastAlert(getString('noenoughwithdraw'));
            return;
        }
        Stake.maxEnable = false;
        document.getElementById("popTitle").innerHTML = "WithDraw";
        var userStake = (stakeInfos[currentPagePoolID].userStake / Math.pow(10, stakeInfos[currentPagePoolID].decimals)).toFixed(4);
        $('#maxAvaliable').text(userStake);
        document.getElementById('stakeInput').value = 0;
        $("#withdrawdiv").show();
        $("#stakediv").hide();
        showAlert();
    },

    maxStake: function () {
        var max = $('#maxAvaliable').text();
        // if(printLog)console.log("maxStake=" + max);
        document.getElementById('stakeInput').value = max
        Stake.maxEnable = true;
    },
    withdrawSure: function () {
        hideAlert();
        var token = stakeInfos[currentPagePoolID];
        if (token && token.poolAddress) {
            var stake = parseFloat(document.getElementById('stakeInput').value);
            if (stake <= 0) {
                toastAlert(getString('withdrawcannotbezero'));
                return;
            }
            var num = new BigNumber(stake * Math.pow(10, token.decimals));
            if(Stake.maxEnable){
                num = token.userStake;
            }
            if(token.userStake.lt(num)){
                toastAlert(getString('noenoughwithdraw'));
                return;
            }
            var hex = web3.utils.numberToHex(num);
            token.instance.methods.withdraw(hex).send({ from: defaultAccount }, function (e, result) {
                if (e) {
                    return console.error('Error with stake:', e);
                }
                showTopMsg("Pending...", 0, getEthersanUrl(result));
                startListenTX(result);
            });
        }
    },
    stakeSure: function () {
        hideAlert();
        var token = stakeInfos[currentPagePoolID];
        if (token && token.poolAddress) {
            var stake = parseFloat(document.getElementById('stakeInput').value);
            if (stake <= 0) {
                toastAlert(getString('stakecannotbezero'));
                return;
            }
            var num = new BigNumber(stake * Math.pow(10, token.decimals));
            if(Stake.maxEnable){
                num = token.userBalance;
            }
            if(token.userBalance.lt(num)){
                toastAlert(getString('noenoughstake'));
                return;
            }
            var hex = web3.utils.numberToHex(num);
            token.instance.methods.stake(hex).send({ from: defaultAccount }, { from: defaultAccount }, function (e, result) {
                if (e) {
                    return console.error('Error with stake:', e);
                }
                showTopMsg("Pending...", 0, getEthersanUrl(result));
                startListenTX(result);
            });
        }
    },
    getAllPoolBalance: function () {
        for (var i = 0; i < allPoolTokens.length; i++) {
            var token = allPoolTokens[i];
            if (token)
                Stake.getSinglePoolBalance(token);
        }
    },
    getSinglePoolBalance: function (name) {
        if (printLog) console.log("getSinglePoolBalance name=" + name);
        var poolAddress = stakePoolAddress[name];
        if (poolAddress)
            contractsInstance.HotPot.methods.balanceOf(poolAddress).call(function (e, result) {
                if (printLog) console.log("pool balance name=" + name + ",balance=" + result);
                balanceOfHotpot[name] = new BigNumber(result);
                Stake.count++;
                if (Stake.count == allPoolTokens.length - 1) {
                    Stake.calTotalCirculation();
                }
            });
    },
    getFreeRewardRatio: function () {
        stakeInfos['usdt'].instance.methods.freeRewardRatio().call(function (e, r) {
            if (printLog) console.log("freeRewardRatio=" + r);
            $(".cliamratio").text(r + "%");
        });
    },
    calTotalCirculation: function () {
        var total = balanceOfHotpot['total'];
        for (var i = 0; i < allPoolTokens.length; i++) {
            var token = allPoolTokens[i];
            if (balanceOfHotpot[token])
                total = total.minus(balanceOfHotpot[token]);
        }
        total = total.minus(200000 * 10 ** 18);
        total = total.div(Math.pow(10, 18));
        if (printLog) console.log("calTotalCirculation=" + total);
        $("#totalcir").text(total.toFixed(2));
    },
    initpooldata: function (name) {
        if (Stake.cliamTimer != null) {
            clearInterval(Stake.cliamTimer);
            Stake.cliamTimer = null;
        }
        var upername = (name + "").toUpperCase();

        $('.farmname').text(upername);
        currentPagePoolID = name;

        let token = stakeInfos[name];
        var allowance = token.allowance;
        if (allowance > 0) {
            $('body').addClass('approved');
        } else {
            $("#approvestake").text(getString('approvestake'));
        }

        var stakeDecimals = token.decimals;
        let totalStake = token.poolTotalStake;
        // if(printLog)console.log("totalStake=" + totalStake);

        $('.totalstake').text((totalStake.div(Math.pow(10, stakeDecimals))).toFixed(2) + " " + name);
        // pools[name].poolTotalStake = totalStake;

        let userStake = token.userStake;
        // if(printLog)console.log("userStake=" + userStake);
        $('.stakedbalance').text((userStake.div(Math.pow(10, stakeDecimals))).toFixed(2) + " " + name);

        $('#stakeToken').text(name + " ");

        let earned = token.userEarn;
        earned = (earned / Math.pow(10, stakeInfos["hotpot"].decimals));
        $('.rewardbalance').text(earned.toFixed(2));

        var lastRewardTime = parseInt((token.lastRewardTime).valueOf());
        var now = Math.floor(((new Date()).getTime()) / 1000);
        var delay = lastRewardTime + 86400 - now;
        if (printLog) console.log("lastRewardTime=" + lastRewardTime + ",delay=" + delay + ",token=" + name);
        if (delay > 0) {
            $("#claimtimep").show();
            Stake.cliamTimer = setInterval(() => {
                delay -= 1;
                if (delay == 0) {
                    $("#claimtimep").hide();
                    clearInterval(Stake.cliamTimer);
                }
                $("#claimtime").text(formatFomoTime(delay));
            }, 1000);
        } else {
            $("#claimtimep").hide();
        }
    },
    initStakePool: function () {
        if (printLog) console.log("initStakePool");

        for (var i = 0; i < allPoolTokens.length; i++) {
            var poolName = allPoolTokens[i];
            if (poolName)
                Stake.initSinglePool(poolName);
        }
        Stake.getFreeRewardRatio();
    },
    checkTotalStaked: function () {
        if (Stake.totalStake) {
            return;
        }
        var totalPrice = new BigNumber(0);
        for (var i = 0; i < allPoolTokens.length; i++) {
            var poolName = allPoolTokens[i];
            if (!poolName) {
                break;
            }
            var periodFinish = stakeInfos[poolName].periodFinish;
            if (!periodFinish) {
                return;
            }
            if (periodFinish == 0) {
                return;
            }
        }

        for (var i = 0; i < allPoolTokens.length; i++) {
            var poolName = allPoolTokens[i];
            if (!poolName) {
                break;
            }
            var stake = stakeInfos[poolName].poolTotalStake;
            if (stakeInfos[poolName])
                if (printLog) console.log("checkTotalStaked: pool=" + poolName + ",price=" + stakeInfos[poolName].price + ",stake=" + stake);
            if (stake == 0) {
                continue;
            }
            var stakePrice = stake.div(Math.pow(10, stakeInfos[poolName].decimals)).times(stakeInfos[poolName].price);
            if (printLog) console.log("checkTotalStaked: pool=" + poolName + ",stake price=" + stakePrice);
            totalPrice = totalPrice.plus(stakePrice);
        }
        Stake.totalStake = totalPrice;
        $("#totalstake").text(totalPrice.toFixed(2));
    },
    initSinglePool: function (poolName) {
        var poolAddress = stakePoolAddress[poolName];
        if (printLog) console.log("initSinglePool poolname=" + poolName);
        stakeInfos[poolName].instance = new web3.eth.Contract(contractABI['stakepool'], poolAddress);

        stakeInfos[poolName].instance.events.Staked({ filter: { user: defaultAccount } }, function (err, result) {
            if (result.returnValues.user != defaultAccount) {
                return;
            }
            if (err) {
                return console.error('Error with stake:', err);
            }
            if (result) {
                if (checkSameEvent(result)) {
                    return;
                }
                // if(printLog)console.log('eventResult:', eventResult);
                toastAlert("Stake success!");
                if (printLog) console.log("Staked");
                stakeInfos[poolName].userStake = stakeInfos[poolName].userStake.plus(result.returnValues.amount);
                stakeInfos[poolName].poolTotalStake = stakeInfos[poolName].poolTotalStake.plus(result.returnValues.amount);
                if (currentPagePoolID == poolName)
                    Stake.initpooldata(currentPagePoolID);
            }
        });

        stakeInfos[poolName].instance.events.Withdrawn({ filter: { user: defaultAccount } }, function (err, result) {
            if (result.returnValues.user != defaultAccount) {
                return;
            }
            if (err) {
                return console.error('Error with stake:', err);
            }
            if (result) {
                // if(printLog)console.log('eventResult:', eventResult);
                if (checkSameEvent(result)) {
                    return;
                }
                toastAlert("Withdraw success!");
                if (printLog) console.log("Withdrawn");
                stakeInfos[poolName].userStake = stakeInfos[poolName].userStake.minus(result.returnValues.amount);
                stakeInfos[poolName].poolTotalStake = stakeInfos[poolName].poolTotalStake.minus(result.returnValues.amount);
                if (currentPagePoolID == poolName)
                    Stake.initpooldata(currentPagePoolID);
            }
        });

        stakeInfos[poolName].instance.events.RewardPaid({ filter: { user: defaultAccount } }, function (err, result) {
            if (result.returnValues.user != defaultAccount) {
                return;
            }
            if (err) {
                return console.error('Error with stake:', err);
            }
            if (result) {
                if (checkSameEvent(result)) {
                    return;
                }
                // if(printLog)console.log('eventResult:', eventResult);
                // toastAlert("Withdraw success!");
                if (printLog) console.log("RewardPaid");
                toastAlert(getString('getreward'));
                stakeInfos[poolName].userEarn = stakeInfos[poolName].userEarn.minus(result.returnValues.reward);

                if (printLog) console.log("currentPagePoolID=" + currentPagePoolID + ",poolName=" + poolName);
                // stakeInfos[poolName].lastRewardTime = Math.floor((new Date()).getTime() / 1000);
                stakeInfos[poolName].instance.methods.lastRewardTime(defaultAccount).call(function (e, r) {
                    if (printLog) console.log("initSinglePool pool=" + poolName + ",lastRewardTime:" + r);
                    r = parseInt(r);
                    stakeInfos[poolName].lastRewardTime = r;
                    if (currentPagePoolID == poolName)
                        Stake.initpooldata(currentPagePoolID);
                });

            }
        });

        if (poolName == 'usdt' || poolName == 'hotpot')
            stakeInfos[poolName].instance.methods.starttime().call(function (e, result) {
                if (!e) {
                    result = parseInt(result);
                    if (printLog) console.log("pool=" + poolName + ",starttime=" + result);
                    stakeInfos[poolName].startTime = result;
                    var now = Math.floor((new Date()).getTime() / 1000);
                    var delay = result - now;
                    if (delay > 0) {
                        if (poolName == 'usdt') {
                            $(".startbadge").show();
                            $(".starttime").text(formatTime2Min(delay));
                        }
                        if (poolName == 'hotpot') {
                            $(".startbadge2").show();
                            $(".starttime2").text(formatTime2Min(delay));
                        }
                    }
                }
            });

        if (poolName == 'usdt' || poolName == 'hotpot')
            stakeInfos[poolName].instance.methods.periodFinish().call(function (e, result) {
                if (!e) {
                    result = parseInt(result);
                    if (printLog) console.log("pool=" + poolName + ",periodFinish=" + result);
                    stakeInfos[poolName].periodFinish = result;
                    var now = Math.floor((new Date()).getTime() / 1000);
                    var delay = result - now;
                    if (delay > 0 && delay < 86400) {
                        if (poolName == 'usdt') {
                            $(".decresebadge").show();
                            $(".reducetime").text(formatTime2Min(delay));
                        }
                        if (poolName == 'hotpot') {
                            $(".decresebadge2").show();
                            $(".reducetime2").text(formatTime2Min(delay));
                        }
                    }
                    if (delay < 0) {
                        if (poolName == 'usdt') {
                            $(".endbadge").show();
                        }
                        if (poolName == 'hotpot') {
                            $(".endbadge2").show();
                        }
                    }
                }
            });

        stakeInfos[poolName].instance.methods.totalSupply().call(function (e, result) {
            result = new BigNumber(result);
            if (printLog) console.log("initSinglePool pool=" + poolName + ",totalSupply:" + result);
            stakeInfos[poolName].poolTotalStake = result;
            stakeInfos[poolName].instance.methods.balanceOf(defaultAccount).call(function (e, result) {
                if (printLog) console.log("initSinglePool pool=" + poolName + ",balanceOf:" + result);
                stakeInfos[poolName].userStake = new BigNumber(result);
                stakeInfos[poolName].instance.methods.earned(defaultAccount).call(function (e, result) {
                    if (printLog) console.log("initSinglePool pool=" + poolName + ",earned:" + result);

                    stakeInfos[poolName].userEarn = new BigNumber(result);
                    stakeInfos[poolName].instance.methods.rewardRate().call(function (e, result) {
                        if (printLog) console.log("initSinglePool pool=" + poolName + ",rewardRate:" + result);
                        stakeInfos[poolName].rewardRate = new BigNumber(result);
                        Stake.updateAPY(poolName);

                        if (printLog) console.log("initSinglePool poolName=" + poolName + ",currentPagePoolID=" + currentPagePoolID);
                        if (currentPagePoolID === poolName) {
                            Stake.initpooldata(currentPagePoolID);
                        }
                        stakeInfos[poolName].instance.methods.periodFinish().call(function (e, r) {
                            if (printLog) console.log("initSinglePool pool=" + poolName + ",periodFinish:" + r);
                            stakeInfos[poolName].periodFinish = parseInt(r);

                            Stake.checkTotalStaked();
                        });
                        stakeInfos[poolName].instance.methods.lastRewardTime(defaultAccount).call(function (e, r) {
                            if (printLog) console.log("initSinglePool pool=" + poolName + ",lastRewardTime:" + r);
                            stakeInfos[poolName].lastRewardTime = parseInt(r);
                        });
                    });
                });
            });
        });

    },
    updateAPY: function (name) {
        if (printLog) console.log("updateapy " + name);
        var hotpotDecimals = 18;
        //pool reward per second
        let rewardRate = stakeInfos[name].rewardRate.div(Math.pow(10, hotpotDecimals));
        if (printLog) console.log("rewardRate=" + rewardRate);

        //pool reward price per second
        let rewardPrice = rewardRate * stakeInfos["hotpot"].price;

        let stakeToken = stakeInfos[name];
        let totalStake = stakeToken.poolTotalStake;

        let totalStakePrice = totalStake.div(Math.pow(10, stakeToken.decimals)).times(stakeToken.price);

        if (printLog) console.log("updateapy token price=" + stakeToken.price + ",total price=" + totalStakePrice);

        let aps = 1;
        if (totalStakePrice != 0)
            aps = rewardPrice / totalStakePrice;

        let apy = aps * 60 * 60 * 24 * 365;

        if (printLog) console.log("totalStakePrice=" + totalStakePrice + ",apy=" + apy+",token="+name);

        stakeToken.apy = apy;

        var apyStr = parseInt(apy) * 100 + ' %';
        if (totalStakePrice < 1) {
            apyStr = "Infinity %";
        }
        // "eth/usdt",
        // "uni/eth",
        // "hotpot",
        // "hotpot/eth",

        if (name == "eth/usdt") name = "ethusdt";
        if (name == "uni/eth") name = "unieth";
        if (name == "hotpot/eth") name = "hotpoteth";
        if (name == "wbtc/eth") name = "wbtceth";

        var apyp = ".poolyield" + name;
        if (printLog) console.log("apy str=" + apyStr);
        $(apyp).animateNumbers(apyStr);

        $("#divloading").hide();
    }
}



App = {
    web3Provider: null,
    erc20ABI: null,
    uniV2PairABI: null,
    enableWalletConnect: true,
    init: function () {
        App.createSeletcContract();
        App.createSeletPoolContract();
        return App.initWeb3();
    },
    createSeletcContract:function(){
        var obj = document.getElementById('selectcontract');
		$("#selectcontract").unbind('change');
		obj.options.length = 0;
		obj.options.add(new Option($.i18n.map['contractselet'], ""));
		for (var i = 0; i < contractList.length; i++) {
			var contract = contractList[i];
			var value = getString(contract + "contract");
			obj.options.add(new Option(value, contract));
		}
		$("#selectcontract").change(function () {
			var val = $("#selectcontract").val();
			if(val!=null && val.length!=0)
			{
                var url = etherscanPrefix + contractAddress[val]+"#code";
                window.open(url);
            }
		});
    },
    createSeletPoolContract:function(){
        var obj = document.getElementById('selectpoolcontract');
		$("#selectpoolcontract").unbind('change');
		obj.options.length = 0;
		obj.options.add(new Option($.i18n.map['poolsselect'], ""));
		for (var i = 0; i < allPoolTokens.length; i++) {
            var contract = allPoolTokens[i];
            if(contract=='wbtc/eth'){
                continue;
            }

			obj.options.add(new Option(contract.toUpperCase(), contract));
		}
		$("#selectpoolcontract").change(function () {
			var val = $("#selectpoolcontract").val();
			if(val!=null && val.length!=0)
			{
                var url = etherscanPrefix + stakePoolAddress[val]+"#code";
                window.open(url);
            }
		});
    },
    changelang:function(){
        var new_lang;
		if (language_pack.now_lang == 0) {
			new_lang = 1;
			$("#changelang").text("中");
		} else {
			new_lang = 0;
			$("#changelang").text("EN");
		}
		document.cookie = new_lang;
		language_pack.loadProperties(new_lang);
        App.createSeletcContract();
        App.createSeletPoolContract();
    },
    connectMetamask: function () {
        if (typeof window.ethereum != 'undefined') {
            App.initWeb3();
        } else {
            toastAlert(getString('nometamask'));
        }
    },
    connectWallet: async function () {
        if (!App.enableWalletConnect) {
            toastAlert(getString('comingsoon'));
            return;
        }
        //  Create WalletConnect Provider
        const provider = new WalletConnectProvider({
            infuraId: "3c4e7e3302614427bd0afc40b7e332db" // Required
        });
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            if (printLog) console.log(accounts);
            window.location.reload();
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            if (printLog) console.log(chainId);
            window.location.reload();
        });

        // Subscribe to session connection
        provider.on("connect", () => {
            if (printLog) console.log("connect");
        });

        // Subscribe to session disconnection
        provider.on("disconnect", (code, reason) => {
            if (printLog) console.log(code, reason);
            window.location.reload();
        });
        //  Enable session (triggers QR Code modal)
        await provider.enable();
        //  Create Web3
        // web3 = new Web3(provider);
        web3 = new Web3(provider);

        if (web3 == null) {
            toastAlert(getString('noconnectwallet'));
            return;
        }

        if (web3 != null) {
            $('body').addClass('web3');
        }
        //  Get Accounts
        const accounts = provider.accounts;

        //  Get Chain Id
        const chainId = provider.chainId;
        var chain = ChainId[0];

        if (chainId == 1) {
            chain = ChainId[0];
        } else if (chainId == 3) {
            chain = ChainId[1];
        } else if (chainId == 4) {
            chain = ChainId[2];
        }
        ETHENV.init(chain);
        if (printLog) console.log("account=" + accounts[0]);
        // await provider.disconnect();

        // if(printLog)console.log("address Yes:" + window.tronWeb.defaultAddress.base58)
        defaultAccount = accounts[0];
        if (printLog) console.log("chainid=" + chainId + ",account=" + defaultAccount);
        return App.initContract();
    },
    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof window.ethereum != 'undefined') {
            if (printLog) console.log("Metamask is installed!");
            App.web3Provider = window.ethereum;
            web3 = new Web3(window.ethereum);
            window.ethereum.on('accountsChanged', (accounts) => {
                // Handle the new accounts, or lack thereof.
                // "accounts" will always be an array, but it can be empty.
                if (printLog) console.log("accountsChanged");
                window.location.reload();
            });

            window.ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                // We recommend reloading the page unless you have a very good reason not to.
                if (printLog) console.log("chainChanged");
                window.location.reload();
            });
            if (printLog) console.log("chainid=" + window.ethereum.chainId);
            var chainId = window.ethereum.chainId;
            ////chainId === "0x1" main, chainId === "0x3" ropsten, chainId === "0x4" rinkey
            var chain = ChainId[0];
            if (chainId === '0x1') {
                chain = ChainId[0];
            } else if (chainId === '0x3') {
                chain = ChainId[1];
            } else if (chainId === '0x4') {
                chain = ChainId[2];
            }
            ETHENV.init(chain);
            return App.initWallet();
        } else {
            if (App.enableWalletConnect)
                App.connectWallet();
        }
    },

    initWallet: async function () {
        if (printLog) console.log("initWallet");
        if (web3 != null) {
            $('body').addClass('web3');
        }
        var v = web3.version;
        if (printLog) console.log("web3 version=" + v);
        let accounts = await ethereum.request(
            {
                method: 'eth_requestAccounts'
            }
        );
        if (printLog) console.log("account=" + accounts[0]);
        defaultAccount = web3.utils.toChecksumAddress(accounts[0]);
        return App.initContract();
    },
    initContract: function () {
        $("#divloading").show();
        $.getJSON('contracts/StakePool.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            if (printLog) console.log("StakePool create");
            // contractsInstance.StakePool = new web3.eth.Contract(data.abi);
            contractABI['stakepool'] = data.abi;
            return App.getStakePools();
        });
        $.getJSON('contracts/HotPot.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            contractsInstance.HotPot = new web3.eth.Contract(data.abi, contractAddress.hotpot);
            erc20ABI = data.abi;
            // erc20Contract = new web3.eth.Contract(data.abi,contractAddress.hotpot);
            // contractsInstance.HotPot = contractsInstance.HotPot.at(contractAddress.hotpot);

            $.getJSON('contracts/Loan.json', function (data) {
                // Get the necessary contract artifact file and instantiate it with truffle-contract.
                contractsInstance.Loan = new web3.eth.Contract(data.abi, contractAddress['loan']);
                // contractsInstance.Loan = contractsInstance.Loan.at(contractAddress['loan']);

                $.getJSON('contracts/NFTokenHotPot.json', function (data) {
                    contractsInstance.NFTHotPot = new web3.eth.Contract(data.abi, contractAddress.nft);
                    // contractsInstance.NFTHotPot = contractsInstance.NFTHotPot.at(contractAddress.nft);
                    return UserNFT.getNFTBalances();
                });
                return Loan.getLoan();
            });
            return App.getBalances();
        });

        $.getJSON('contracts/Reward.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            contractsInstance.Reward = new web3.eth.Contract(data.abi, contractAddress.reward);
            // contractsInstance.Reward = contractsInstance.Reward.at(contractAddress.reward);
            return Reward.getRewardInfo();
        });

        $.getJSON('contracts/Gacha.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            contractsInstance.Gacha = new web3.eth.Contract(data.abi, contractAddress.gacha);
            // contractsInstance.Gacha = contractsInstance.Gacha.at(contractAddress.gacha);
            return Gacha.getGacha();
        });


        $.getJSON('contracts/NFTMarket.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            contractsInstance.NFTMarket = new web3.eth.Contract(data.abi, contractAddress['market']);
            // contractsInstance.NFTMarket = contractsInstance.NFTMarket.at(contractAddress['market']);
            return Market.initMarketInfo();
        });

        $.getJSON('contracts/Invite.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            contractsInstance.Invite = new web3.eth.Contract(data.abi, contractAddress['invite']);
            // contractsInstance.Invite = contractsInstance.Invite.at(contractAddress['invite']);
            return Invite.initInviteInfo();
        });
    },
    getUniV2Pairs: function () {
        for (var i = 0; i < allPoolTokens.length; i++) {
            var token = allPoolTokens[i];
            if (printLog) console.log("getUniV2Pairs " + token);
            if (token == 'eth/usdt' || token == "hotpot/eth" || token == "wbtc/eth") {
                App.getUniV2Pair(token);
            }
            if (token != "wbtc/eth")
                App.getStakeERCInfo(token);
        }
    },
    getStakeERCInfo: function (token) {
        if (stakeERCAddress[token] == null || stakeERCAddress[token] == "") {
            return;
        }
        stakeERCContract[token] = new web3.eth.Contract(erc20ABI, stakeERCAddress[token]);
        if (printLog) console.log("getStakeERCInfo token=" + token);
        stakeERCContract[token].methods.balanceOf(defaultAccount).call(function (e, result) {
            stakeInfos[token].userBalance = new BigNumber(result);
            if (printLog) console.log("getStakeERCInfo balance=" + result + ",name=" + token);
            stakeERCContract[token].methods.decimals().call(function (e, result) {
                stakeInfos[token].decimals = parseInt(result);
                stakeERCContract[token].methods.allowance(defaultAccount, stakePoolAddress[token]).call(function (e, result) {
                    if (printLog) console.log("getStakeERCInfo allowance=" + result + ",name=" + token);
                    stakeInfos[token].allowance = new BigNumber(result);
                    if (currentPagePoolID != "") {
                        Stake.initpooldata(currentPagePoolID);
                    }
                });
            });
        });

        // watch for an event with {some: 'args'}
        stakeERCContract[token].events.Approval({ filter: { owner: defaultAccount } }, function (error, result) {
            if (!error) {
                if (result.returnValues.owner != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }

                result.returnValues.value = new BigNumber(result.returnValues.value);
                if (result.returnValues.value.lt(new BigNumber(10 ** 30))) {
                    if (printLog) console.log("stakeERCContract Approval less");
                    return;
                }

                if (printLog) console.log(token + ":approval " + result.returnValues);
                hideTopMsg();

                stakeInfos[token].allowance = result.returnValues.value;
                if (currentPagePoolID != "") {
                    Stake.initpooldata(currentPagePoolID);
                }
                var spender = result.returnValues.spender.toLowerCase();
                var gacha = contractAddress.gacha.toLowerCase();
                if (spender == gacha) {
                    $("#pull1").show();
                    $("#pull10").show();
                    $("#approvegacha").hide();
                }
            }
        });
    },
    updateUserBalance: function () {
        var b = (defaultBalance.div(Math.pow(10, 18)).toFixed(2));
        if (printLog) console.log("updateUserBalance " + b);
        $('.mybalance').text(b);
    },
    getUniV2Pair: function (pair) {
        if (printLog) console.log("getUniV2Pair=" + pair);
        univ2PairInfo[pair] = createPairInfo(pair);
        if (stakeERCAddress[pair] == null || stakeERCAddress[pair] == "") {
            return;
        }
        univ2PairInfo[pair].contractInstance = new web3.eth.Contract(App.uniV2PairABI, stakeERCAddress[pair]);
        univ2PairInfo[pair].contractInstance.methods.token0().call(function (e, r) {
            univ2PairInfo[pair].token0 = r;
            if (printLog) console.log("getUniV2Pair pair=" + pair + ", token0=" + r);
        });
        univ2PairInfo[pair].contractInstance.methods.token1().call(function (e, r) {
            univ2PairInfo[pair].token1 = r;
            if (printLog) console.log("getUniV2Pair pair=" + pair + ",token1=" + r);
        });
        univ2PairInfo[pair].contractInstance.methods.decimals().call(function (e, result) {
            if (printLog) console.log("getUniV2Pair decimals=" + result + ",name=" + pair);
            univ2PairInfo[pair].decimals = parseInt(result);
            univ2PairInfo[pair].contractInstance.methods.getReserves().call(function (e, result) {
                if (printLog) console.log("getUniV2Pair getReserves=" + result + ",name=" + pair);

                var reserve0 = new BigNumber(result[0]);
                var reserve1 = new BigNumber(result[1]);
                if (reserve0 == 0) {
                    reserve0 = reserve0.plus(1);
                }
                if (reserve1 == 0) {
                    reserve1 = reserve1.plus(1);
                }

                univ2PairInfo[pair].reserve0 = reserve0;
                univ2PairInfo[pair].reserve1 = reserve1;

                univ2PairInfo[pair].contractInstance.methods.totalSupply().call(function (e, result) {
                    if (printLog) console.log("getUniV2Pair totalSupply=" + result + ",name=" + pair);
                    result = new BigNumber(result);
                    if (result == 0) {
                        result = result.plus(1);
                    }
                    univ2PairInfo[pair].totalSupply = result;
                    univ2PairInfo[pair].lpPrice = univ2PairInfo[pair].reserve0.div(Math.pow(10, 18)).times(2).div(univ2PairInfo[pair].totalSupply.div(Math.pow(10, univ2PairInfo[pair].decimals)));
                    if (printLog) console.log("pair=" + pair + ",lp price=" + univ2PairInfo[pair].lpPrice);
                    App.checkAllUni();
                });
            });
        });
    },
    checkAllUni: function () {
        for (var i = 0; i < allPoolTokens.length; i++) {
            var token = allPoolTokens[i];
            if (token == 'eth/usdt' || token == "hotpot/eth" || token == "wbtc/eth") {
                if (univ2PairInfo[token].lpPrice == 0) {
                    return
                }
            }
        }
        App.calTokenPrice();
    },
    calTokenPrice: function () {
        if (printLog) console.log("calTokenPrice");
        var ethusdt = univ2PairInfo["eth/usdt"];
        var vEth = ethusdt.reserve0.div(Math.pow(10, 18));
        var vUsdt = ethusdt.reserve1.div(Math.pow(10, 6));
        if (ETHENV.chainId == ChainId[1] || ETHENV.chainId == ChainId[2]) {
            vEth = ethusdt.reserve1.div(Math.pow(10, 18));
            vUsdt = ethusdt.reserve0.div(Math.pow(10, 6));
        }

        var priceEth = vUsdt.div(vEth);
        if (printLog) console.log("calTokenPrice price eth=" + priceEth);


        var hotpoteth = univ2PairInfo["hotpot/eth"];
        var vHot = hotpoteth.reserve1.div(Math.pow(10, 18));
        var vE = hotpoteth.reserve0.div(Math.pow(10, 18));

        var priceHot = vE.div(vHot).times(priceEth);
        if (printLog) console.log("calTokenPrice eth price=" + priceEth + ",hot price=" + priceHot);


        var btceth = univ2PairInfo["wbtc/eth"];
        var vbtc = btceth.reserve0.div(Math.pow(10, 8));
        var vE2 = btceth.reserve1.div(Math.pow(10, 18));

        var pricebtc = vE2.div(vbtc).times(priceEth);
        if (printLog) console.log("calTokenPrice eth price=" + priceEth + ",btc price=" + pricebtc);

        //usdt
        stakeInfos["usdt"].price = 1;
        stakeInfos["usdc"].price = 1;
        stakeInfos["hotpot"].price = priceHot;
        stakeInfos['wbtc'].price = pricebtc;

        for (var i = 0; i < allPoolTokens.length; i++) {
            var name = allPoolTokens[i];
            if (name == 'eth/usdt' || name == "hotpot/eth" || name == "wbtc/eth") {
                stakeInfos[name].price = univ2PairInfo[name].lpPrice.times(priceEth);
            }
            if (printLog) console.log("calTokenPrice stake token price name:" + name + ",price=" + stakeInfos[name].price);
        }
        delete allPoolTokens[allPoolTokens.length - 1];
        Stake.initStakePool();
    },
    getStakePools: function () {
        // allPoolTokens
        for (var i = 0; i < allPoolTokens.length; i++) {
            var poolToken = allPoolTokens[i];
            var poolAddress = stakePoolAddress[poolToken];
            var lpAddress = stakeERCAddress[poolToken];
            stakeInfos[poolToken] = createToken(poolToken, lpAddress, poolAddress);
        }

        $.getJSON('contracts/UniV2Pair.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            // contractsInstance.UniV2Pair = new Web3.eth.contract(data.abi);
            App.uniV2PairABI = data.abi;
            return App.getUniV2Pairs();
        });

    },
    refreshBalances: function () {
        contractsInstance.HotPot.methods.balanceOf(defaultAccount).call(function (e, result) {
            if (e) {
                if (printLog) console.log("HotPot.balanceOf error : " + e);
                return;
            }
            defaultBalance = new BigNumber(result);
            if (printLog) console.log("balanceOf " + result / 10 ** 18);
            App.updateUserBalance();
        });
    },
    getBalances: async function () {
        if (printLog) console.log('Getting balances...');

        // watch for an event with {some: 'args'}
        contractsInstance.HotPot.events.Approval({ filter: { owner: defaultAccount }, fromBlock: 'latest', toBlock: 'latest' }, function (error, result) {
            if (!error) {
                if (result.returnValues.owner != defaultAccount) {
                    return;
                }
                // toastAlert("Approve success!");
                if (checkSameEvent(result)) {
                    return;
                }
                if (printLog) console.log("approval spender=" + result.returnValues.spender);
                result.returnValues.value = new BigNumber(result.returnValues.value);
                if (result.returnValues.value.lt(new BigNumber(10 ** 30))) {
                    if (printLog) console.log("approval less");
                    return;
                }

                hideTopMsg();
                var spender = result.returnValues.spender.toLowerCase();
                var gacha = contractAddress.gacha.toLowerCase();
                if (spender === gacha) {
                    $("#pull1").show();
                    $("#pull10").show();
                    $("#approvegacha").hide();
                }
                if(spender==contractAddress.loan.toLowerCase()){
                    Loan.allowance = result.returnValues.value;
                    if (printLog) console.log("approval spender=" + result.returnValues.spender);
                    Loan.initLoanTable();
                }
                if(spender == contractAddress.market.toLowerCase()){
                    Market.allowance = result.returnValues.value;
                    if (printLog) console.log("approval spender=" + result.returnValues.spender);
                    Market.initSellTable();
                }
            }
        });

        // watch for an event with {some: 'args'}
        contractsInstance.HotPot.events.Transfer({ filter: { to: defaultAccount }, fromBlock: 'latest', toBlock: 'latest' }, function (error, result) {
            if (!error) {
                if (result.returnValues.to != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }
                // toastAlert("Approve success!");
                if (printLog) console.log("Transfer in=" + result.returnValues.value);
                if (printLog) console.log("to =" + result.returnValues.to + ",default=" + defaultAccount + ",from=" + result.returnValues.from);

                defaultBalance = defaultBalance.plus(new BigNumber(result.returnValues.value));
                stakeInfos['hotpot'].userBalance = defaultBalance;
                App.updateUserBalance();
            }
        });

        // watch for an event with {some: 'args'}
        contractsInstance.HotPot.events.Transfer({ filter: { from: defaultAccount }, fromBlock: 'latest', toBlock: 'latest' }, function (error, result) {
            if (!error) {
                if (result.returnValues.from != defaultAccount) {
                    return;
                }
                if (checkSameEvent(result)) {
                    return;
                }
                // toastAlert("Approve success!");
                // if(printLog)console.log("Transfer out=" + result.returnValues.value);

                if (printLog) console.log("out  to=" + result.returnValues.to + ",default=" + defaultAccount + ",from=" + result.returnValues.from);
                defaultBalance = defaultBalance.minus(new BigNumber(result.returnValues.value));
                App.updateUserBalance();
            }
        });

        // var result = await contractsInstance.HotPot.balanceOf(defaultAccount).call();

        // call constant function
        contractsInstance.HotPot.methods.balanceOf(defaultAccount).call(function (e, result) {
            if (e) {
                if (printLog) console.log("HotPot.balanceOf error : " + e);
                return;
            }
            defaultBalance = new BigNumber(result);
            balanceOfHotpot['total'] = new BigNumber(1000000 * 10 ** 18);
            if (printLog) console.log("balanceOf " + result / 10 ** 18);
            App.updateUserBalance();
            contractsInstance.HotPot.methods.allowance(defaultAccount, contractAddress.gacha).call(function (e, result) {
                var allowance = result;
                if (allowance == 0) {

                } else {
                    $("#pull1").show();
                    $("#pull10").show();
                    $("#approvegacha").hide();
                }
            });
            Stake.getAllPoolBalance();
        });

    },
    selectBuy: function () {
        $("#selectbuy").addClass('tableselect');
        $("#selectloan").removeClass('tableselect');
        $("#divbuytable").show();
        $("#divloantable").hide();
        $("#sellhistory").show();
        $("#loanhistory").hide();
    },
    selectLoan: function () {
        $("#selectloan").addClass('tableselect');
        $("#selectbuy").removeClass('tableselect');
        $("#divbuytable").hide();
        $("#divloantable").show();
        $("#sellhistory").hide();
        $("#loanhistory").show();
    }
};


function hidepages() {
    $('main').hide();
}

function recoveABottom() {
    document.getElementById("ahome").style.borderBottomColor = "transparent";
    document.getElementById("areward").style.borderBottomColor = "transparent";
    document.getElementById("afarms").style.borderBottomColor = "transparent";
    document.getElementById("aexchange").style.borderBottomColor = "transparent";
    document.getElementById("agacha").style.borderBottomColor = "transparent";
    document.getElementById("aabout").style.borderBottomColor = "transparent";
    document.getElementById("ame").style.borderBottomColor = "transparent";
    document.getElementById("ainvite").style.borderBottomColor = "transparent";
}

window.nav = (classname) => {
    nav(classname);
}

function nav(classname) {
    hidepages();
    currentPage = classname;
    $('body').removeClass('approved');
    currentPagePoolID = "";
    if (classname.indexOf('pool') === 0) {
        $('#singlepool').show();
        currentPagePoolID = classname.slice(4);
        Stake.initpooldata(currentPagePoolID);
        $('main.pool').show();
    } else {
        $('main.' + classname).show();
    }
    if (classname === "home") {
        $("#infodiv").show();
        App.refreshBalances();
    } else {
        $("#infodiv").hide();
    }
    recoveABottom();

    if (classname == "home") {
        $("#ticketinfo").hide();
    } else {
        $("#ticketinfo").show();
    }
    if (classname.indexOf('pool') != 0) {
        let aa = "a" + classname;
        //border-bottom-color: rgba(255, 255, 255, .25);
        document.getElementById(aa).style.borderBottomColor = "rgba(255, 255, 255, .25)";
    }

    showTable(false);
    if (classname === "reward") {
        Reward.gotoPage();
    } else if (classname === "me") {
        App.refreshBalances();
        UserNFT.initNFTTable(nftUse[2]);
        showTable(true);
    }

    if (classname == 'exchange') {
        App.selectBuy();
    }
}

$(function () {
    $(window).load(function () {
        App.init();
    });
});

window.showTable = (flag) => {
    if (flag) {
        $(".pricingTable").show();
        // black_overlay
    } else {
        $(".pricingTable").hide();
    }
}
