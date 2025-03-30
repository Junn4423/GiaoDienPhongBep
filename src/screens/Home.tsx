"use client"

import type React from "react"
import { useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  DrawerLayoutAndroid,
  Image,
  SafeAreaView,
} from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import Layout from "../layout/_layout"
interface QuickAccessItemProps {
  id: string
  title: string
  icon: string
}

interface FoodItem {
  name: string
  quantity: number
  price: number
}

interface OrderItemProps {
  id: string
  table: string
  customer: string
  time: string
  items: FoodItem[]
  total: number
}

const quickAccessData: QuickAccessItemProps[] = [
  { id: "1", title: "Đơn hàng", icon: "receipt" },
  { id: "2", title: "Đơn đã hoàn thành", icon: "check-circle" },
  { id: "3", title: "Tất cả đơn hàng", icon: "list" },
  { id: "4", title: "Khách hàng", icon: "people" },
  { id: "5", title: "Bàn trống", icon: "table-bar" },
  { id: "6", title: "Bàn đang phục vụ", icon: "restaurant" },
]

const recentOrders: OrderItemProps[] = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  table: `Bàn T0${i + 1}`,
  customer: `Khách ${i + 1}`,
  time: `16:4${i}`,
  items: [
    { name: "Phở Bò", quantity: 2, price: 75000 },
    { name: "Nước Chanh", quantity: 2, price: 25000 },
  ],
  total: 185000,
}))

const QuickAccessItem: React.FC<{ item: QuickAccessItemProps }> = ({ item }) => (
  <TouchableOpacity style={styles.quickAccessItem}>
    <MaterialIcon name={item.icon} size={30} color={"#333"} />
    <Text style={styles.quickAccessText}>{item.title}</Text>
  </TouchableOpacity>
)

const OrderItem: React.FC<{ item: OrderItemProps }> = ({ item }) => (
  <View style={styles.orderCard}>
    <Text style={styles.tableLabel}>
      <MaterialIcon name="table-bar" size={18} /> {item.table}
    </Text>
    <Text style={styles.customer}>
      <MaterialIcon name="person" size={18} /> {item.customer}
    </Text>
    <Text style={styles.time}>
      <MaterialIcon name="access-time" size={18} /> {item.time}
    </Text>
    <View style={styles.foodList}>
      {item.items.map((food: FoodItem, index: number) => (
        <Text key={index}>
          {food.quantity}x {food.name} - {food.price} đ
        </Text>
      ))}
    </View>
    <Text style={styles.totalPrice}>{item.total} đ</Text>
  </View>
)

const HomeScreen: React.FC = () => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null)

  const openDrawer = () => {
    drawerRef.current?.openDrawer()
  }

  // const renderNavigationView = () => (
  //   <View style={styles.drawerContainer}>
  //     <Image source={require("../assets/Logo/logo.png")} style={styles.logo} />
  //     <Text style={styles.drawerTitle}>PMBH PhongBep</Text>
  //     {quickAccessData.map((item: QuickAccessItemProps) => (
  //       <TouchableOpacity key={item.id} style={styles.drawerItem}>
  //         <MaterialIcon name={item.icon} size={20} /> <Text>{item.title}</Text>
  //       </TouchableOpacity>
  //     ))}
  //   </View>
  // )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={250}
        drawerPosition="left"
        // renderNavigationView={renderNavigationView}
      > */}
        <Layout>
          <View style={styles.container}>
            <View style={styles.header}>
              {/* <TouchableOpacity onPress={openDrawer} style={styles.menuIcon}>
                <MaterialIcon name="menu" size={30} color={"#333"} />
              </TouchableOpacity> */}
              <View style={styles.revenueContainer}>
                <Text style={styles.label}>Doanh thu hôm nay</Text>
                <Text style={styles.revenue}>4.250.000đ</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
            <FlatList
              data={quickAccessData}
              numColumns={3}
              keyExtractor={(item: QuickAccessItemProps) => item.id}
              renderItem={({ item }: { item: QuickAccessItemProps }) => <QuickAccessItem item={item} />}
            />

            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <View style={styles.recentOrdersContainer}>
              <FlatList
                data={recentOrders}
                keyExtractor={(item: OrderItemProps) => item.id}
                renderItem={({ item }: { item: OrderItemProps }) => <OrderItem item={item} />}
              />
            </View>
          </View>
        </Layout>
      {/* </DrawerLayoutAndroid> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  menuIcon: { padding: 10 },
  revenueContainer: { backgroundColor: "white", padding: 16, borderRadius: 8 },
  label: { fontSize: 14, color: "#666" },
  revenue: { fontSize: 20, fontWeight: "bold", color: "#000" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: { alignItems: "center" },
  recentOrdersContainer: { height: "50%" },

  quickAccessItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 2,
  },
  quickAccessText: { marginTop: 5, fontSize: 14, fontWeight: "bold", color: "#333" },

  orderCard: { backgroundColor: "#fff", padding: 16, marginVertical: 8, borderRadius: 8, elevation: 2 },
  tableLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  customer: { fontSize: 14, color: "#666" },
  time: { fontSize: 14, color: "#999" },
  foodList: { marginTop: 8 },
  totalPrice: { fontSize: 16, fontWeight: "bold", marginTop: 8, color: "#d9534f" },

  drawerContainer: { flex: 1, padding: 16, backgroundColor: "#fff" },
  drawerTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  drawerItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  logo: { width: 100, height: 50, alignSelf: "center", marginBottom: 16 },
})

export default HomeScreen

