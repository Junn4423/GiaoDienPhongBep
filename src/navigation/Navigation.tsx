import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import HomeScreen from "../screens/Home"
import OrderScreen from "../screens/Order"
import OrderCompletedScreen from "../screens/OrderCompleted"
import AllOrderScreen from "../screens/AllOrder"
import CustomersScreen from "../screens/Customers"
import EmptyTableScreen from "../screens/EmptyTable"
import { Image, View, Text, StyleSheet } from "react-native"
import type { DrawerContentComponentProps } from "@react-navigation/drawer"

// Định nghĩa kiểu cho RootStackParamList
type RootStackParamList = {
  Home: undefined
  Order: undefined
  OrderCompleted: undefined
  AllOrders: undefined
  Customers: undefined
  EmptyTables: undefined
}

const Drawer = createDrawerNavigator<RootStackParamList>()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#5c6bc0",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerStyle: {
            backgroundColor: "#fff",
            width: 280,
          },
          drawerActiveTintColor: "#5c6bc0",
          drawerInactiveTintColor: "#333",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
            drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Order"
          component={OrderScreen}
          options={{
            title: "Tạo đơn hàng",
            drawerIcon: ({ color }) => <MaterialIcons name="add-shopping-cart" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="OrderCompleted"
          component={OrderCompletedScreen}
          options={{
            title: "Đơn đã hoàn thành",
            drawerIcon: ({ color }) => <MaterialIcons name="check-circle" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="AllOrders"
          component={AllOrderScreen}
          options={{
            title: "Tất cả đơn hàng",
            drawerIcon: ({ color }) => <MaterialIcons name="receipt" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Customers"
          component={CustomersScreen}
          options={{
            title: "Khách hàng",
            drawerIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="EmptyTables"
          component={EmptyTableScreen}
          options={{
            title: "Quản lý bàn",
            drawerIcon: ({ color }) => <MaterialIcons name="table-bar" size={24} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image source={require("../assets/Logo/logo.png")} style={styles.logo} />
        <Text style={styles.drawerTitle}>PMBH PhongBep</Text>
        <Text style={styles.drawerSubtitle}>Quản lý nhà hàng</Text>
      </View>
      {/* {props.children} */}
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: "#5c6bc0",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
  drawerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
})

export default Navigation

