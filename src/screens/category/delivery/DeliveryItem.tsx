import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import BasicText from '../../../components/BasicText';
import SVG from '../../../components/SVG';
import TextTag from '../../../components/tag/TextTag';
//import moment from 'moment';
import { theme } from '../../../styles/theme';
import styles from '../../../styles/DeliveryItem.style';
// Type
import { OrderListItem   } from '../../../types/orderTypes';

interface DeliveryItemProps {
    item: OrderListItem;
    onPress: () => void;
    searchKeyword: string;
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ item, onPress, searchKeyword }) => {
const renderHighlightedText = (text: string, keyword: string) => {
        if (!keyword) return <Text style={styles.fromMainLocation}>{text}</Text>;
        const parts = text.split(new RegExp(`(${keyword})`, 'gi')); // 키워드 기준으로 split
        return (
            <Text style={styles.fromMainLocation}>
                {parts.map((part, index) =>
                    part.toLowerCase() === keyword.toLowerCase() ? (
                        <Text key={index} style={{ color: theme.colors.blue }}>
                            {part}
                        </Text>
                    ) : (
                        <Text key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    };

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.borderedListBox}>
                <View>

                    <View style={styles.fromToContainer}>
                        {/* 출발지 정보 */}
                        <View style={ styles.fromContainer}>
                            {renderHighlightedText(item.restaurantName, searchKeyword)}
                        </View>

                        <SVG name={'arrow_forward'} />
                        {/* 도착지 정보 */}
                        <View style={styles.toContainer}>
                            <BasicText text={item.orderLocation} style={styles.fromMainLocation} />
                        </View>

                    </View>

                    <View style={styles.departureTimeContainer}>
                        <BasicText text="주문 시간" style={styles.departureTimeTitle} />
                        <BasicText
                            text={item.orderAt}
                            style={styles.departureTime}

                        />
                    </View>

                    <View style={styles.passengerTimeContainer}>
                        {/* 승객 수 아이콘 */}
                        <View style={styles.passengerContainer}>
                            <View style={styles.fromToLine}>
                                <SVG name={'person_icon'} />
                            </View>
                            <BasicText
                                text={`(${item.currentPersonCount}/${item.maximumPersonCount})`}
                                fontSize={theme.fontSize.size14}
                                color={theme.colors.blackV3}
                            />

                        </View>

                        <TextTag
                            text={item.isTimeNegotiable ? '시간협의가능' : '시간협의불가'}
                            viewStyle={item.isTimeNegotiable ? styles.timePossible : styles.timeNotPossible}
                            textStyle={item.isTimeNegotiable ? styles.timePossibleText : styles.timeNotPossibleText}

                        />
                    </View>


                </View>

                <View style={styles.typeContainer}>
                    <TextTag
                        text={'배달'}
                        viewStyle={styles.typePossible}
                        textStyle={styles.typePossibleText}
                    />
                </View>

            </View>
        </TouchableOpacity>
    );
};

export default DeliveryItem;
