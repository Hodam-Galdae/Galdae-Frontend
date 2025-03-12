import React from 'react';
import {View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import styles from '../styles/TermsDetail.style';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import BasicText from '../components/BasicText';

type RootStackParamList = {
  SignUp: {data: string};
  TermsDetail: undefined;
};

type TermsDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TermsDetail'
>;

const TermsDetail: React.FC = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'SignUp'>>();
  const navigation = useNavigation<TermsDetailNavigationProp>();

  const agreeDetailTexts = [
    '[필수] 만 17세 이상입니다.',
    '[필수] 서비스 이용약관 동의',
    '[필수] 위치정보 수집 및 이용 동의',
    '[필수] 개인정보 수집 및 이용 동의',
  ];

  const title = ['서비스 이용약관 동의', '위치정보 수집 및 이용 동의'];
  const sub = [
    '제 1 조 (목적) 본 서비스의 약관은 동일한 출도착지에서 택시 같이 타고 가기(동승,카풀) 서비스를 이용하려는 승객 회원(이하 “그룹 생성자”, “동승자”이라합니다)이 ㈜호담(이하 “회사”라 합니다)가 제공하는 갈대(GALDAE) 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무, 조건, 절차 및 기타 각종 필요 사항의 규정함을 목적으로 합니다. 제 2 조 (용어의 정의)본 약관에서 사용하는 용어의 정의는 다음과 같습니다. ① 서비스: 갈대(GALDAE) 애플리케이션을 통해 제공되는 “같이타고 가기(합승,카풀)” 서비스와 관련된 모든 콘텐츠 일체를 의미합니다. ② 같이타고 가기(동승,카풀) : 택시 및 공유 차량 등을 다른 승객과 함께 타는 것을 의미합니다. ③ 그룹 : 서비스에서 승객(이용자)끼리 같이타고 가기(동승,카풀) 서비스 이용을 위해 앱 내 제공된 위치 대소분류를 바탕으로 출발지, 목적지, 인상착의, 짐 정보 등을 입력하여 등록한 경로를 의미합니다. ④ 그룹 생성자 : 자신이 이동할 예정인 노선을 앱 내에서 제공받은 정보를 바탕으로 설정하고 택시의 동승을 위해 동승자를 구하는 그룹(방)을 만드는 서비스 이용자를 의미합니다. ⑤ 동승자 : 앱 내에서 생성된 그룹의 정보와 노선을 확인하여 해당 그룹에 동승을 신청하는 이용자를 의미합니다. ⑥ 요청 금액 : 같이타고 가기 노선(동승,카풀)을 등록한 그룹 생성자가 자신의 노선에서 발생하는 택시요금에 대하여 동승자에게 분담을 요청하는 금액을 의미합니다. ⑦ 발생한 금액에 대해 “그룹 생성자”와 “동승자” 사이의 원활한 정산을 위해 각 개인이 부담해야 할 금액에 대한 고지는 해당 앱에서 제공하나 별도의 결제 기능이나 포인트로 환산하는 시스템은 존재하지 않습니다. ⑧ ㈜호담(이하 “회사”라 합니다)이 제공하는 택시 같이 타고 가기(동승,카풀) 서비스인 갈대(GALDAE) 애플리케이션은 “그룹 생성자”와 “동승자” 간의 노선 등록과 그룹 생성을 통한 매칭과 채팅으로 선택한 장소에서 만남이 이루어지는 과정까지만 연결하는 중개 플랫폼을 운영하는 중개자의 역할이며 동승,카풀로 발생하는 금액에 대한 결제와 정산에 관한 사항과 책임은 일체 이용자에게 귀속됩니다. 제 3 조 (약관의 명시와 개정)회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 회사의 초기 서비스 화면 또는 기타의 방법으로 회원에게 공지함으로써 효력이 발생하며, 이 약관에 동의하고 회원 가입을 한 회원은 약관에 동의한 시점부터 동의한 약관의 효력에 적용을 받고, 약관의 변경이 있을 경우 변경된 약관에서 정한 적용일자부터 변경된 약관의 적용을 받습니다. 2. 회사는 약관 개정이 필요하다고 인정되는 경우, 본 약관을 변경할 수 있습니다. 약관을 개정할 경우에는 적용일자와 개정 사유를 명시하여 적용일 7일 이전부터 시행일 이후 일정 기간 동안 현행 약관과 함께 회사의 서비스 초기화면 또는 기타의 방법으로 안내합니다. 단, 변경된 약관의 내용이 회원의 권리 및 의무에 불리하거나 중대한 영향을 미치는 내용을 개정하는 경우에는 회원의 합리적인 판단 및 확인이 가능한 시간을 고려하여 시행일로부터 최소 30일 이전 서비스 초기 화면 또는 기타의 방법으로 안내합니다. 3. 회사가 개정 약관을 안내하면서 회원에게 30일 기간 내에 의사 표시를 하지 않으면 의사 표시가 표명된 것으로 본다는 뜻을 명확하게 안내하였음에도 회원이 명시적으로 거부의 의사 표시를 하지 아니하거나 개정 약관 시행일 이후에도 서비스를 계속 이용하는 경우에는 개정 약관에 동의한 것으로 간주합니다. 4. 회사가 전 항에 따라 회원에게 개정 약관을 명확하게 공지 또는 통지하면서 ‘개정 약관 적용일자까지 거부 의사를 표시하지 아니할 경우 약관의 변경에 동의한 것으로 간주한다’는 뜻을 명확하게 공지 또는 통지하였음에도 불구하고, 회원이 명시적으로 거부의 의사표시를 하지 않은 경우 개정 약관에 동의한 것으로 봅니다. 5. 회원은 수시로 홈페이지 또는 서비스 초기 화면을 확인하여 약관의 변경에 대한 확인할 주의 의무가 있습니다. 서비스 이용 약관에 동의한 회원이 약관의 변경으로 인하여 발생한 피해 및 회원이 과실로 개정된 약관의 내용을 알지 못해 발생하는 피해는 회사에서 책임지지 않습니다. 6. 회원은 약관의 변경에 대해 이의가 있거나 동의하지 않을 경우 거부할 권리가 있으며, 이 경우 서비스 이용을 중단하고 이용 계약을 해지(회원 탈퇴)할 수 있습니다. 제 4 조 (개인정보 보호의무)회사는 관계법령이 정하는 바에 따라 회원 등록정보를 포함한 회원의 개인 정보를 보호하기 위해 노력합니다. 회원의 개인 정보 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보 취급방침이 적용됩니다. 단, 회사의 공식 사이트 이외에 링크된 사이트에서는 회사의 개인정보 취급방침이 적용되지 않을 수 있습니다. 2. 회사는 회원의 귀책사유로 인해 노출된 회원의 개인 및 계정 정보를 비롯한 모든 정보에 대해서는 일체의 책임을 지지 않습니다. 3. 회사는 서비스를 통하여 만남과 택시 호출이 이루어진 경우 택시 같이 타고 가기(동승,카풀) 서비스 당사자 간 원활한 의사소통 및 배차, 상담 등 거래 이행을 위하여 관련된 정보를 필요한 범위 내에서 이용자들에게 제공할 수 있습니다. 제 5 조 (개인정보의 변경, 회원의 의무)',
  ];

  const check = () => {
    if (params.data === agreeDetailTexts[0]) {
      //임시
      return 0;
    } else if (params.data === agreeDetailTexts[1]) {
      return 0;
    } else if (params.data === agreeDetailTexts[2]) {
      return 1;
    } else if (params.data === agreeDetailTexts[3]) {
      //임시
      return 1;
    } else {
      return 0;
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={<BasicText style={styles.headerText} text="약관 상세보기" />}
        leftButton={
          <SVGButton
            onPress={() => navigation.goBack()}
            iconName="LeftArrow"
            buttonStyle={{width: 30, height: 30}}
          />
        }
      />
      <BasicText text={title[check()]} style={styles.title} />
      <BasicText text={sub[check()]} style={styles.sub} />
    </View>
  );
};

export default TermsDetail;
