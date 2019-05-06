require('dotenv').config()
const Consensus = artifacts.require('./Consensus.sol')
const {toBN, toWei} = web3.utils

const {
  DEPLOY_CONSENSUS,
  CONSENSUS_ADDRESS,
  INITIAL_VALIDATOR_ADDRESS,
  MIN_STAKE_ETH
} = process.env

module.exports = function(deployer, network, accounts) {
  if (network !== 'test' && network !== 'ganache') {
    let consensusAddress = CONSENSUS_ADDRESS
    let initialValidatorAddress = INITIAL_VALIDATOR_ADDRESS || '0x0'
    let minStake = toWei(toBN(MIN_STAKE_ETH || 0), 'ether')

    let validatorSet

    deployer.then(async function() {
      if (!!DEPLOY_CONSENSUS === true) {
        validatorSet = await Consensus.new(minStake, initialValidatorAddress)
        consensusAddress = validatorSet.address
      } else {
        validatorSet = Consensus.at(consensusAddress)
      }
      console.log(`Consensus.address ........................ ${consensusAddress}`)
    }).catch(function(error) {
      console.error(error)
    })
  }
}
