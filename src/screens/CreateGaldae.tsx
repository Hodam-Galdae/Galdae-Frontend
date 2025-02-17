// Chat.tsx 테스트
import React, {useState} from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import styles from '../styles/CreateGaldae.style';
import BasicText from '../components/BasicText';
import PositionBox from '../components/PostionBox';
import SVGButton from '../components/button/SVGButton';
import { theme } from '../styles/theme';
import BasicButton from '../components/button/BasicButton';
import SVG from '../components/SVG';

const CreateGaldae: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [selectedTimeDiscuss, setSelectedTimeDiscuss] = useState<number>(0);
  const [passengerNumber, setPassengerNumber] = useState<number>(1);
  const [selectedChannel, setSelectedChannel] = useState<boolean>(false);

  const passengerNumberHandler = (type: String) => {
    if(type === 'PLUS' && passengerNumber < 4){
      setPassengerNumber(passengerNumber + 1);
    }
    else if(type === 'MINUS' && passengerNumber > 1){
      setPassengerNumber(passengerNumber - 1);
    }
  };

  return (

    <ScrollView>
      <View style={styles.container}>
        <BasicText style={styles.title} text="목적지 설정"/>
        <View style={styles.positionBox}>
          <PositionBox title="학교" subTitle="중원도서관" isOrigin={true}/>
          <SVGButton
            iconName="Switch"
            buttonStyle={styles.switchBtn}
            SVGStyle={styles.switchIcon}
          />
          <PositionBox title="학교" subTitle="중원도서관" isOrigin={false}/>
        </View>

        {/* <SVGTextButton
            iconName="Position"
            text="내 주변 검색"
            onPress={()=>{}}
            enabledColors={{
              backgroundColor: 'transparent',
              textColor: theme.colors.black,
              borderColor: theme.colors.black,
            }}
            disabledColors={{
              backgroundColor: 'transparent',
              textColor: theme.colors.gray1,
              borderColor: theme.colors.gray1,
            }}
            buttonStyle={styles.buttonStyle}
            textStyle={[stylesheet.smallBorderBtnText]}
            SVGStyle={styles.positionIcon}
          /> */}
        <BasicText style={styles.title} text="출발 일시"/>

        <TouchableOpacity>
          <View style={styles.timeBox}>
            <BasicText text="출발일시 : 2025년 00일 00일 (0) 00 : 00" style={styles.timeText}/>
          </View>
        </TouchableOpacity>

        <BasicText style={styles.title} text="추가 정보 설정"/>
        <BasicText style={styles.subTitle} text="동승자 성별을 선택해주세요."/>
        <View style={styles.buttonWrapper}>
          <BasicButton
            text="성별 무관"
            onPress={() => setSelectedGender(0)}
            enabledColors={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderColor: '#000000',
            }}
            buttonStyle={selectedGender === 0 ? {...styles.additionalButton, backgroundColor: theme.colors.brandColor} : styles.additionalButton}
            textStyle={selectedGender === 0 ? {...styles.additionalButtonText, color: theme.colors.white} : styles.additionalButtonText}
          />
          <BasicButton
            text="여자"
            onPress={() => setSelectedGender(1)}
            enabledColors={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderColor: '#000000',
            }}
            buttonStyle={selectedGender === 1 ? {...styles.additionalButton, backgroundColor: theme.colors.brandColor} : styles.additionalButton}
            textStyle={selectedGender === 1 ? {...styles.additionalButtonText, color: theme.colors.white} : styles.additionalButtonText}
          />
          <BasicButton
            text="남자"
            onPress={() => setSelectedGender(2)}
            enabledColors={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderColor: '#000000',
            }}
            buttonStyle={selectedGender === 2 ? {...styles.additionalButton, backgroundColor: theme.colors.brandColor} : styles.additionalButton}
            textStyle={selectedGender === 2 ? {...styles.additionalButtonText, color: theme.colors.white} : styles.additionalButtonText}
          />
        </View>
        <BasicText style={styles.subTitle} text="시간 협의 가능 여부를 선택해주세요."/>
        <View style={styles.buttonWrapper}>
          <BasicButton
            text="가능"
            onPress={() => setSelectedTimeDiscuss(0)}
            enabledColors={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderColor: '#000000',
            }}
            buttonStyle={selectedTimeDiscuss === 0 ? {...styles.additionalButton, backgroundColor: theme.colors.brandColor} : styles.additionalButton}
            textStyle={selectedTimeDiscuss === 0 ? {...styles.additionalButtonText, color: theme.colors.white} : styles.additionalButtonText}
          />
          <BasicButton
            text="불가능"
            onPress={() => setSelectedTimeDiscuss(1)}
            enabledColors={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderColor: '#000000',
            }}
            buttonStyle={selectedTimeDiscuss === 1 ? {...styles.additionalButton, backgroundColor: theme.colors.brandColor} : styles.additionalButton}
            textStyle={selectedTimeDiscuss === 1 ? {...styles.additionalButtonText, color: theme.colors.white} : styles.additionalButtonText}
          />
        </View>
        <BasicText text="*최대 4명" style={styles.warnText}/>
        <View style={styles.personWrapper}>
          <View style={styles.personBox}>
            <BasicText text="탑승인원" style={styles.personText}/>
            <BasicText text="(본인포함)" style={styles.personSubText}/>
          </View>
          <View style={styles.personBox}>
            <SVGButton
              onPress={() => passengerNumberHandler('MINUS')}
              iconName="Minus"
              buttonStyle={styles.plusBtn}
              SVGStyle={styles.plusIcon}
            />
            <BasicText text={passengerNumber.toString()} style={styles.numberText}/>
            <SVGButton
              onPress={() => passengerNumberHandler('PLUS')}
              iconName="Plus"
              buttonStyle={styles.plusBtn}
              SVGStyle={styles.plusIcon}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => setSelectedChannel(!selectedChannel)}>
          <View style={selectedChannel ? {...styles.oftenBox, borderColor: theme.colors.brandColor} : styles.oftenBox}>
              <SVG name={selectedChannel ? 'CheckSelected' : 'Check'} width={18} height={18} style={styles.checkBtn}/>
              <BasicText text="자주가는 경로로 등록하기" style={selectedChannel ? {...styles.checkText, color: theme.colors.black} : styles.checkText}/>
          </View>
        </TouchableOpacity>
        <BasicButton
          text="생성하기"
          buttonStyle={styles.generateButton}
          textStyle={styles.generateText}
        />
      </View>
    </ScrollView>
  );
};

export default CreateGaldae;
