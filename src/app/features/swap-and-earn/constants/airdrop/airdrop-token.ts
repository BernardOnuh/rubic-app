import { BLOCKCHAIN_NAME, EvmBlockchainName } from 'rubic-sdk';
import { BlockchainToken } from '@shared/models/tokens/blockchain-token';

type Token = Omit<BlockchainToken, 'blockchain'> & { blockchain: EvmBlockchainName };

export const newRubicToken: Token = {
  decimals: 18,
  symbol: 'FETS',
  name: 'FE TECH',
  address: '0x10aaed289a7b1b0155bf4b86c862f297e84465e0',
  blockchain: BLOCKCHAIN_NAME.ETHEREUM
};
