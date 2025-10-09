/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import styles from '../../styles/SettlementRequestPopup.style';
import BasicButton from '../button/BasicButton';
import SVGButton from '../button/SVGButton';
import SVG from '../SVG';
import { useNavigation } from '@react-navigation/native';
import SettlementCostEditModal from './SettlementCostEditModal';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getUserInfo } from '../../api/membersApi';
import { banks, BankOption } from '../../constants/bankOptions';
import moment from 'moment';
import { ChatMember } from '../../api/chatApi';

export interface SettlementRequestPopupRef {
  open: () => void;
  close: () => void;
}

export interface SettlementRequestPopupProps {
  onClose?: () => void;
  titleLeft: string;
  titleRight: string;
  member: ChatMember[];
  sendPayment: (settlementCost: string) => void;
  initialCost: number;
}

type RootStackParamList = {
  Payment: undefined;
};

const SettlementRequestPopup = forwardRef<
  SettlementRequestPopupRef,
  SettlementRequestPopupProps
>(({ titleLeft, titleRight, member, sendPayment, initialCost }, ref) => {
  const modalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Payment'>>();
  // 외부에서 open/close 함수를 사용할 수 있도록 함
  useImperativeHandle(ref, () => ({
    open: () => {
      modalizeRef.current?.open();
    },
    close: () => {
      modalizeRef.current?.close();
    },
  }));

  const [settlementCost, setSettlementCost] = useState<number>(initialCost);
  useEffect(() => {
    setSettlementCost(initialCost);
  }, [initialCost]);
  
  const [isLastSettlement, setIsLastSettlement] = useState(false);
  const [isVisibleCostEditPopup, setIsVisibleCostEditPopup] =
    useState<boolean>(false);
  const [myData, setMyData] = useState({
    'nickname': '',
    'image': '',
    'university': '',
    'isAuthenticated': '',
    'bankType': '',
    'accountNumber': '',
    'depositor': '',
  });
  //정산 요청 메서드
  const requestSettlement = () => {
    if (!isLastSettlement) {
      setIsLastSettlement(true);
      return;
    }
    modalizeRef.current?.close();

    sendPayment(settlementCost.toString());
  };

  const setCost = (cost: number) => {
    setSettlementCost(cost);
    setIsVisibleCostEditPopup(false);
  };

  const editAccount = () => {
    close();
    navigation.navigate('Payment');
  };

  const close = () => {
    setIsLastSettlement(false);
    modalizeRef.current?.close();
  };

  useEffect(() => {
    getUserInfo().then(data => {
      setMyData(data);
    });
  }, []);

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={360} // 고정 높이 설정
      overlayStyle={styles.background}
      modalStyle={styles.container}
      withHandle={false} // 기본 핸들을 비활성화
      {...({ swipeToClose: true, swipeThreshold: 10 } as any)}>
      <View style={[styles.settlementContainer]}>
        <SVGButton
          iconName="CloseFill"
          onPress={close}
          buttonStyle={styles.settlementCloseBtn}
        />
        {!isLastSettlement ? (
          <View>
            <View style={[styles.settlementCostContainer, { marginTop: 50 }]}>
              <BasicText text="결제 금액" style={styles.settlementCostText} />
              <View style={styles.settlementCostTextContainer}>
                <BasicText style={styles.settlementCostText}>
                  {settlementCost.toLocaleString() + '원'}
                </BasicText>
                <TouchableOpacity
                  onPress={() => setIsVisibleCostEditPopup(true)}>
                  <BasicText
                    text="정산 금액 수정"
                    style={styles.settlementCostEditText}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.settlementCostContainer, { marginTop: 10 }]}>
              <BasicText text="정산 금액" style={styles.settlementCostText} />
              <BasicText style={styles.settlementCostText}>
                {Math.ceil(settlementCost / member.length).toLocaleString() + '원'}
              </BasicText>
            </View>
            <View style={styles.bankContainer}>
              <SVG width={26} height={26} style={styles.bankIcon} name={
                banks.find((bank: BankOption) => bank.name === myData.bankType)?.svg || 'Bank_KB'} />
              <BasicText style={styles.bankText}>
                {`${myData.bankType} ${myData.accountNumber}`}
              </BasicText>
            </View>
            <TouchableOpacity onPress={editAccount}>
              <BasicText text="정산 계좌 변경하기" style={styles.bankEdit} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <BasicText style={styles.settlementTime}>
              {moment.utc().format('YYYY년 MM월 DD일 (ddd) HH : mm')}
            </BasicText>
            <BasicText style={styles.settlementTitle} text="최종 확인" />
            <View style={styles.settlementLoactionContainer}>
              {
                titleRight && (
                  <SVG
                    style={styles.settlementLocationIcon}
                    width={16}
                    height={16}
                    name="LocationBlack"
                  />
                )
              }
              <BasicText
                style={styles.settlementLocationText}
                text={titleLeft}
              />
              {
                titleRight && (
                  <>
                    <SVG
                      style={styles.settlementLocationIcon}
                      width={14}
                      height={14}
                      name="RightArrow"
                    />
                    <BasicText
                      style={styles.settlementLocationText}
                      text={titleRight}
                    /></>
                )
              }
            </View>
            <View style={styles.settlementLastCostContainer}>
              <View style={styles.settlementLastCostBox}>
                <View style={styles.settlementLastTextContainer}>
                  <BasicText
                    style={styles.settlementLastText}
                    text="정산 인원"
                  />
                  <BasicText style={styles.settlementLastText}>
                    {member.length + '명'}
                  </BasicText>
                </View>
                <View style={styles.settlementLastTextContainer}>
                  <BasicText
                    style={styles.settlementLastText}
                    text="결제 금액"
                  />
                  <BasicText style={styles.settlementLastText}>
                    {settlementCost + '원'}
                  </BasicText>
                </View>
                <View style={styles.settlementLastTextContainer}>
                  <BasicText
                    style={styles.settlementLastText}
                    text="정산 금액"
                  />
                  <BasicText style={styles.settlementLastText}>
                    {Math.ceil(settlementCost / member.length) + '원'}
                  </BasicText>
                </View>
              </View>
              <View style={styles.settlementLastCostBox}>
                {member.map(e => {
                  return (
                    <View
                      key={e.memberId}
                      style={styles.settlementLastTextContainer}>
                      <BasicText
                        style={styles.settlementLastText}
                        text={e.memberName}
                      />
                      {e.memberName === myData.nickname ? (
                        <View style={styles.menuUserMe}>
                          <BasicText style={styles.menuUserMeText} text="나" />
                        </View>
                      ) : null}
                      <BasicText style={styles.settlementLastText}>
                        {Math.ceil(settlementCost / member.length) + '원'}
                      </BasicText>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
        <BasicButton
          text={isLastSettlement ? '정산 요청하기' : '다음'}
          onPress={requestSettlement}
          textStyle={styles.settlementBtnText}
          buttonStyle={styles.settlementBtn}
        />
      </View>
      <SettlementCostEditModal
        visible={isVisibleCostEditPopup}
        onConfirm={setCost}
        onCancel={() => setIsVisibleCostEditPopup(false)}
      />
    </Modalize>
  );
});

export default SettlementRequestPopup;
