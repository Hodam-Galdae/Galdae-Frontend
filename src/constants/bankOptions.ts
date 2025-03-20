// src/constants/bankOptions.ts
import * as svg from '../assets/svg';

export type BankOption = {
  code: string;
  name: string;
  svg: keyof typeof svg;
};

export const banks: BankOption[] = [
  { code: 'kb', name: 'KB 국민은행', svg: 'Bank_KB' },
  { code: 'kbin', name: 'KB 증권', svg: 'Bank_KB' },
  { code: 'shinhan', name: '신한은행', svg: 'Bank_Jeju' },
  { code: 'woori', name: '우리은행', svg: 'Bank_Woori' },
  { code: 'hana', name: '하나은행', svg: 'Bank_Hana' },
  { code: 'nh', name: 'NH 농협은행', svg: 'Bank_NHINVESTMENT' },
  { code: 'nhin', name: 'NH 투자증권', svg: 'Bank_NHINVESTMENT' },
  { code: 'ibk', name: 'IBK기업은행', svg: 'Bank_IBK' },
  { code: 'jeju', name: '제주은행', svg: 'Bank_Jeju' },
  { code: 'jeonbuk', name: '전북은행', svg: 'Bank_Jeonbuk' },
  { code: 'k', name: 'K은행', svg: 'Bank_K' },
  { code: 'keb', name: 'KEB외환은행', svg: 'Bank_KEB' },
  { code: 'kakao', name: '카카오뱅크', svg: 'Bank_Kakao' },
  { code: 'koreaInvestment', name: '한국투자은행', svg: 'Bank_KoreaInvestment' },
  { code: 'kwangju', name: '광주은행', svg: 'Bank_KWANGJU' },
  { code: 'nacufok', name: '신협은행', svg: 'Bank_NACUFOK' },
  { code: 'Bank_Postbank', name: '우체국은행', svg: 'Bank_Postbank' },
  { code: 'Bank_SavingsBank', name: '저축은행', svg: 'Bank_SavingsBank' },
  { code: 'Bank_SBI', name: 'SBI저축', svg: 'Bank_SBI' },
  { code: 'Bank_SC', name: 'SC제일', svg: 'Bank_SC' },
  { code: 'Bank_Suhyup', name: '수협은행', svg: 'Bank_Suhyup' },
  { code: 'busan', name: '부산은행', svg: 'Bank_Busan' },
  { code: 'gyeongnam', name: '경남은행', svg: 'Bank_Busan' },
  { code: 'Bank_Toss', name: '토스뱅크', svg: 'Bank_Toss' },
  { code: 'citi', name: '씨티은행', svg: 'Bank_Citi' },
  { code: 'daegu', name: '대구은행', svg: 'Bank_DaeGu' },
  { code: 'forestry', name: '산림조합은행', svg: 'Bank_ForestryCooperative' },
  { code: 'Bank_Saemaul', name: '새마을금고', svg: 'Bank_Saemaul' },
  { code: 'Bank_KDB', name: 'KDB산업은행', svg: 'Bank_KDB' },
];
