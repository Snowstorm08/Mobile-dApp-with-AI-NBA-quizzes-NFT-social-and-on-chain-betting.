import { BigNumber, ethers } from 'ethers';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import {
  mainContractABI,
  tokenAbi,
} from '@/contract-constant';
import {
  NFTInfo,
  PreQuestions,
  Question,
  Quiz,
} from '@/features/Game/types/Types';
import { useEthersSigner } from '@/utils/signer';

import { PostQuestions } from '../types/Types';

interface DepositFundsParams {
  amount: BigNumber;
  poolId: number;
}

interface WithdrawFundsParams {
  amount: BigNumber;
  poolId: number;
}

type QuizContext = {
  activeQuiz: boolean;
  setActiveQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  activeStep: 'pre-questions' | 'questions' | 'post-questions';
  setActiveStep: React.Dispatch<
    React.SetStateAction<'pre-questions' | 'questions' | 'post-questions'>
  >;
  preQuestions: PreQuestions;
  setPreQuestions: React.Dispatch<React.SetStateAction<PreQuestions>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  postQuestions: PostQuestions;
  setPostQuestions: React.Dispatch<React.SetStateAction<PostQuestions>>;

  NFTInfo: NFTInfo;
  setNFTInfo: React.Dispatch<React.SetStateAction<NFTInfo>>;

  reset: () => void;
  depositFunds: (params: DepositFundsParams) => Promise<ethers.ContractTransaction | undefined>;
  userTokenBalance: string;
  userDepositedBalance: string;
  poolBalance: string;
  makeRefferal: () => Promise<ethers.ContractTransaction | undefined>;
  withdrawlFunds: (params: WithdrawFundsParams) => Promise<ethers.ContractTransaction | undefined>;
};

export const QuizContext = React.createContext<QuizContext>({} as QuizContext);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizContextProvider');
  }
  return context;
};

const contractAddresses = {
  5611: { // OPBNB TESTNET
    token: '0x74F50199618ab213CdBA4b07dd7dd6614DC004B3', 
    main: '0xEb2bcb5A262904157B33895C86f7E58e445a1B3F',
    nft: '0xb98f9e73748Ac0B5275141E878faB653b4A0cAc8'
  }, 
  28122024: { // ANCIENT8 TESTNET
    token: '0xb8171c4E2002Deea048477D8B337ff27F9a36687', 
    main: '0xac13628e37628E8e8d9238F1564841cf220742a3',
    nft: '0x164D1bBaD8De402b80f65fCa468CacF294865ca7'
   }, 
};

const QuizContextProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const { chains, chain } = useNetwork();
  const [activeChain, setActiveChainId] = useState<keyof typeof contractAddresses | undefined>(chain?.id as keyof typeof contractAddresses | undefined);
  const [userTokenBalance, setUserTokenBalance] = useState<string>('0');
  const [userDepositedBalance, setUserDepositedBalance] = useState<string>('0');
  const [poolBalance, setPoolBalance] = useState<string>('0');

  useEffect(() => {
    setActiveChainId(chain?.id as keyof typeof contractAddresses);
  }, [chain?.id]);

  const signer = useEthersSigner({ chainId: activeChain });

  useEffect(() => {
    if (!signer) return;
    if (address) {
      const fetchBalance = async () => {
        try {
          const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
          if (!contractAddress) {
            throw new Error('Unsupported chain');
          }

          const degoTokenContract = new ethers.Contract(
            contractAddress.token,
            tokenAbi,
            signer
          );

          const balance = await degoTokenContract.balanceOf(address);
          console.log('balance', ethers.utils.formatEther(balance));
          setUserTokenBalance(ethers.utils.formatEther(balance));

          const contractInstance = new ethers.Contract(
            contractAddress.main,
            mainContractABI,
            signer
          );

          const depositedBalance = await contractInstance.userBalance(address);
          console.log('depositedBalance', ethers.utils.formatEther(depositedBalance));

          const poolBalance = await contractInstance.poolAmount(1);
          console.log('poolBalance', ethers.utils.formatEther(poolBalance));
          setPoolBalance(ethers.utils.formatEther(poolBalance));
          setUserDepositedBalance(ethers.utils.formatEther(depositedBalance));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };
      fetchBalance();
    }
  }, [address, signer, activeChain]);

  const makeRefferal = async () => {
    try {
      const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }

      const contractInstance = new ethers.Contract(
        contractAddress.main,
        mainContractABI,
        signer
      );

      const tx = await contractInstance.createUser();
      await tx.wait();
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const depositFunds = async ({
    amount,
    poolId,
  }: DepositFundsParams): Promise<ethers.ContractTransaction | undefined> => {
    try {
      const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }

      const degoTokenContract = new ethers.Contract(
        contractAddress.token,
        tokenAbi,
        signer
      );

      // Make amount as per decimals
      amount = BigNumber.from(amount).mul(
        BigNumber.from(10).pow(await degoTokenContract.decimals())
      );
      const approvetx = await degoTokenContract.approve(
        contractAddress.main,
        amount,
        { from: address }
      );

      await approvetx.wait();

      const contractInstance = new ethers.Contract(
        contractAddress.main,
        mainContractABI,
        signer
      );

      const tx = await contractInstance.deposit(amount, poolId, {
        from: address,
      });
      await tx.wait();

      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawlFunds = async ({
    amount,
    poolId,
  }: WithdrawFundsParams): Promise<ethers.ContractTransaction | undefined> => {
    try {
      const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }

      const contractInstance = new ethers.Contract(
        contractAddress.main,
        mainContractABI,
        signer
      );

      const tx = await contractInstance.withdraw(amount, poolId, {
        from: address,
      });
      await tx.wait();

      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const [activeQuiz, setActiveQuiz] = useState(false);
  const [activeStep, setActiveStep] =
    useState<Quiz['activeStep']>('pre-questions');
  const [preQuestions, setPreQuestions] = useState<PreQuestions>({
    NFTFlowId: '',
    players: [{ profileImage: '', handle: '', points: 0, countryImage: '' }],
    categoryImage: <></>,
    requiredBet: '',
  });
  const [questions, setQuestions] = useState<Question[]>({} as Question[]);
  const [postQuestions, setPostQuestions] = useState<PostQuestions>(
    {} as PostQuestions
  );
  const [NFTInfo, setNFTInfo] = useState<NFTInfo>({
    NFTId: '',
    NFTName: '',
    NFTDescription: '',
    NFTTotalPrice: '',
    NFTVideoSrc: '',
    maxBet: '',
    version: '',
  });

  const reset = () => {
    setNFTInfo({
      NFTId: '',
      NFTName: '',
      NFTDescription: '',
      NFTTotalPrice: '',
      NFTVideoSrc: '',
      maxBet: '',
      version: '',
    });

    setPreQuestions({
      NFTFlowId: '',
      players: [{ profileImage: '', handle: '', points: 0, countryImage: '' }],
      categoryImage: <></>,
      requiredBet: '',
    });
    setActiveQuiz(false);
    setActiveStep('pre-questions');
    setQuestions({} as Question[]);
    setPostQuestions({} as PostQuestions);
  };

  return (
    <QuizContext.Provider
      value={{
        activeQuiz,
        setActiveQuiz,
        activeStep,
        setActiveStep,
        preQuestions,
        setPreQuestions,
        questions,
        setQuestions,
        postQuestions,
        setPostQuestions,
        NFTInfo,
        setNFTInfo,
        reset,
        depositFunds,
        userTokenBalance,
        userDepositedBalance,
        poolBalance,
        makeRefferal,
        withdrawlFunds,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;