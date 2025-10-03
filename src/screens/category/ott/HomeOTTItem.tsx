import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import BasicText from '../../../components/BasicText';
import SVG from '../../../components/SVG';
import TextTag from '../../../components/tag/TextTag';
import { theme } from '../../../styles/theme';
import styles from '../../../styles/GaldaeItem.style';
// Type
import { GroupListItem } from '../../../types/groupTypes';

interface GaldaeItemProps {
    item: GroupListItem;
    onPress: () => void;
    searchKeyword?: string;
}

const OTTItem: React.FC<GaldaeItemProps> = ({ item, onPress, searchKeyword }) => {
    const renderHighlightedText = (text: string, keyword: string) => {
        if (!keyword) {return <Text style={styles.fromMainLocation}>{text}</Text>;}
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
        <TouchableOpacity onPress={onPress} key={item.id}>
            <View style={styles.borderedListBox}>
                <View>

                    <View style={styles.fromToContainer}>
                        {renderHighlightedText(item.titleLeft, searchKeyword ?? '')}
                    </View>

                    <View style={styles.departureTimeContainer}>
                        <BasicText text="1인 가격" style={styles.departureTimeTitle} />
                        <BasicText
                            text={item.price?.toLocaleString() + '원'}
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
                                text={`(${item.currentPerson}/${item.maximumPerson})`}
                                fontSize={theme.fontSize.size14}
                                color={theme.colors.blackV3}
                            />

                        </View>

                        <TextTag
                            text={item.type}
                            viewStyle={styles.timePossible}
                            textStyle={styles.timePossibleText}
                        />

                    </View>


                </View>

                <View style={styles.typeContainer}>
                    <TextTag
                        text={'구독'}
                        viewStyle={styles.typePossible}
                        textStyle={styles.typePossibleText}
                    />
                </View>

            </View>
        </TouchableOpacity>
    );
};

export default OTTItem;
