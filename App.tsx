import { SafeAreaView, StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "./src/screens/Home"
import OrderScreen from "./src/screens/Order"
import OrderCompletedScreen from "./src/screens/OrderCompleted"
import AllOrderScreen from "./src/screens/AllOrder"
import CustomersScreen from "./src/screens/Customers"
import EmptyTableScreen from "./src/screens/EmptyTable"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#5c6bc0" />
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
            drawerActiveTintColor: "#5c6bc0",
            drawerInactiveTintColor: "#333",
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Trang chủ",
              drawerIcon: ({ color }) => <MaterialIcon name="home" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Order"
            component={OrderScreen}
            options={{
              title: "Tạo đơn hàng",
              drawerIcon: ({ color }) => <MaterialIcon name="add-shopping-cart" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="OrderCompleted"
            component={OrderCompletedScreen}
            options={{
              title: "Đơn đã hoàn thành",
              drawerIcon: ({ color }) => <MaterialIcon name="check-circle" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="AllOrders"
            component={AllOrderScreen}
            options={{
              title: "Tất cả đơn hàng",
              drawerIcon: ({ color }) => <MaterialIcon name="receipt" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Customers"
            component={CustomersScreen}
            options={{
              title: "Khách hàng",
              drawerIcon: ({ color }) => <MaterialIcon name="people" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="EmptyTables"
            component={EmptyTableScreen}
            options={{
              title: "Quản lý bàn",
              drawerIcon: ({ color }) => <MaterialIcon name="table-bar" size={24} color={color} />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App

