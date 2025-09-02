import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../../../components/BasicText';
import SVG from '../../../components/SVG';
import TextTag from '../../../components/tag/TextTag';
import { theme } from '../../../styles/theme';
import styles from '../../../styles/GaldaeItem.style';
// Type
import { OTTItemType } from '../../../types/getTypes';

interface GaldaeItemProps {
    item: OTTItemType;
    onPress: () => void;
    onLongPress?: () => void;
}

const OTTItem: React.FC<GaldaeItemProps> = ({ item, onPress, onLongPress }) => {


    return (
        <TouchableOpacity onPress={onPress} onLongPress={item.isWriter ? onLongPress : undefined} delayLongPress={100}>
            <View style={styles.borderedListBox}>
                <View>

                    <View style={styles.fromToContainer}>
                        <BasicText text={item.postService} style={ styles.fromMainLocation} />
                    </View>

                    <View style={styles.departureTimeContainer}>
                        <BasicText text="1인 가격" style={ styles.departureTimeTitle} />
                        <BasicText
                            text={item.price.toLocaleString() + '원'}
                            style={ styles.departureTime}

                        />
                    </View>

                    <View style={styles.passengerTimeContainer}>
                        {/* 승객 수 아이콘 */}
                        <View style={styles.passengerContainer}>
                            <View style={styles.fromToLine}>
                                <SVG name={ 'person_icon'} />
                            </View>
                            <BasicText
                                text={`(${item.personCount}/${item.totalPersonCount})`}
                                fontSize={theme.fontSize.size14}
                                color={  theme.colors.blackV3}
                            />

                        </View>

                        <TextTag
                            text={item.postType }
                            viewStyle={ styles.timePossible}
                            textStyle={ styles.timePossibleText}
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
