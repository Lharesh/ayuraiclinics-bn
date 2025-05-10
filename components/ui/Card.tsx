import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, StyleProp } from 'react-native';
import { COLORS } from '@/constants/theme';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  subtitleStyle?: StyleProp<ViewStyle>;
  rightHeader?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
  headerStyle,
  bodyStyle,
  titleStyle,
  subtitleStyle,
  rightHeader,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  const hasHeader = title || subtitle || rightHeader;

  return (
    <CardComponent
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {hasHeader && (
        <View style={[styles.header, headerStyle]}>
          <View style={styles.headerContent}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
          </View>
          {rightHeader && <View>{rightHeader}</View>}
        </View>
      )}
      <View style={[styles.body, bodyStyle]}>{children}</View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral[900],
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.neutral[500],
    marginTop: 2,
  },
  body: {
    padding: 16,
  },
});