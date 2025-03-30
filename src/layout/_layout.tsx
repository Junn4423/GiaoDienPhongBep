import type React from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import { TouchableOpacity, Text } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import type { DrawerNavigationProp } from "@react-navigation/drawer"

// Định nghĩa kiểu cho navigation
type RootStackParamList = {
  Home: undefined
  Order: undefined
  EmptyTables: undefined
  AllOrders: undefined
}

type NavigationProp = DrawerNavigationProp<RootStackParamList>

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>{children}</View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <MaterialIcon name="home" size={24} color="#333" />
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Order")}>
          <MaterialIcon name="receipt" size={24} color="#333" />
          <Text style={styles.navText}>Đơn hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("EmptyTables")}>
          <MaterialIcon name="table-bar" size={24} color="#333" />
          <Text style={styles.navText}>Bàn trống</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("AllOrders")}>
          <MaterialIcon name="restaurant" size={24} color="#333" />
          <Text style={styles.navText}>Đang phục vụ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#333",
  },
})

export default Layout

