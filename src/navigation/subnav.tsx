import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface SubNavProps {
  isOpen: boolean;
  closeSubnav: () => void;
}

const SubNav: React.FC<SubNavProps> = ({ isOpen, closeSubnav }) => {
  const slideAnim = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity onPress={closeSubnav} style={styles.closeButton}>
        <MaterialIcon name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Sub Navigation</Text>
      {/* Các mục menu có thể thêm vào đây */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#333',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SubNav;
