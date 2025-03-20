// redux/slices/paymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BankInfo {
  bankType: string;
  accountNumber: string;
  depositor: string;
  svg?: string; // 은행 아이콘 정보가 필요한 경우 추가
}

interface PaymentState {
  bankInfo: BankInfo | null;
}

const initialState: PaymentState = {
  bankInfo: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setBankInfo(state, action: PayloadAction<BankInfo>) {
      state.bankInfo = action.payload;
    },
    clearBankInfo(state) {
      state.bankInfo = null;
    },
  },
});

export const { setBankInfo, clearBankInfo } = paymentSlice.actions;
export default paymentSlice.reducer;
