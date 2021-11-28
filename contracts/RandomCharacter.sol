// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


 
contract RandomNumberConsumer is VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;

    mapping(bytes32 => address) private s_rollers;
    mapping(address => uint256) private s_results;
    uint256 private constant ROLL_IN_PROGRESS = 42;

    event DiceRolled(bytes32 indexed requestId, address indexed roller);
    event DiceLanded(bytes32 indexed requestId, uint256 indexed result);
    
    uint256 public randomResult;
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Polygon Mumbai Testnet
     * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
     * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    constructor() 
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.1 LINK (Varies by network)
    }
    
    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        address roller = msg.sender;
        require(s_results[roller] == 0, "Already rolled");
        requestId =  requestRandomness(keyHash, fee);
        s_rollers[requestId] = roller;
        s_results[roller] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, roller);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // randomResult = randomness%10 ;
        uint256 d10Value = (randomness%10)+1;
        s_results[s_rollers[requestId]] = d10Value;
        emit DiceLanded(requestId, d10Value);
    }

    function mithicRace() public view returns (string memory) {
        address player = msg.sender;
        require(s_results[player] != 0, "Dice not rolled");
        require(s_results[player] != ROLL_IN_PROGRESS, "Roll in progress");
        return getMithicRace(s_results[player]);
    }
    function getMithicRace(uint256 id) private pure returns (string memory) {
        string[10] memory mithicRaces = [
            "Elf",	
            "Hobbit",
            "Dwarf",	
            "Knight",
            "Magician",	
            "Orc",	
            "Troll",	
            "Barbarian",	
            "Centaur", 	
            "Minotaur"
        ];
        return mithicRaces[id-1];
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
