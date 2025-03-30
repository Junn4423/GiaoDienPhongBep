"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from "react-native"
import Layout from "../layout/_layout"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  image: any
}

interface OrderItem extends MenuItem {
  quantity: number
  note?: string
}

const Order: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState("T01")
  const [customerName, setCustomerName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [cartExpanded, setCartExpanded] = useState(true)

  // Sample menu data
  const menuItems: MenuItem[] = [
    { id: "1", name: "Phở Bò", price: 75000, category: "main", image: require("../assets/Logo/logo.png") },
    { id: "2", name: "Bún Chả", price: 65000, category: "main", image: require("../assets/Logo/logo.png") },
    { id: "3", name: "Cơm Rang", price: 55000, category: "main", image: require("../assets/Logo/logo.png") },
    { id: "4", name: "Nước Chanh", price: 25000, category: "drinks", image: require("../assets/Logo/logo.png") },
    { id: "5", name: "Trà Đá", price: 10000, category: "drinks", image: require("../assets/Logo/logo.png") },
    { id: "6", name: "Chè Thái", price: 35000, category: "dessert", image: require("../assets/Logo/logo.png") },
    { id: "7", name: "Bánh Flan", price: 30000, category: "dessert", image: require("../assets/Logo/logo.png") },
    { id: "8", name: "Gỏi Cuốn", price: 45000, category: "appetizer", image: require("../assets/Logo/logo.png") },
  ]

  const tables = Array.from({ length: 10 }, (_, i) => `T0${i + 1}`)
  const categories = [
    { id: "all", name: "Tất cả", icon: "restaurant-menu" },
    { id: "main", name: "Chính", icon: "dinner-dining" },
    { id: "appetizer", name: "Khai vị", icon: "tapas" },
    { id: "drinks", name: "Đồ uống", icon: "local-bar" },
    { id: "dessert", name: "Tráng miệng", icon: "icecream" },
  ]

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Giới hạn chỉ hiển thị 3 món ăn
  const limitedItems = filteredItems.slice(0, 3)

  const addToOrder = (item: MenuItem) => {
    const existingItemIndex = orderItems.findIndex((orderItem) => orderItem.id === item.id)

    if (existingItemIndex !== -1) {
      const updatedItems = [...orderItems]
      updatedItems[existingItemIndex].quantity += 1
      setOrderItems(updatedItems)
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (itemId: string) => {
    const existingItemIndex = orderItems.findIndex((item) => item.id === itemId)

    if (existingItemIndex !== -1) {
      const updatedItems = [...orderItems]
      if (updatedItems[existingItemIndex].quantity > 1) {
        updatedItems[existingItemIndex].quantity -= 1
      } else {
        updatedItems.splice(existingItemIndex, 1)
      }
      setOrderItems(updatedItems)
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => addToOrder(item)}>
      <Image source={item.image} style={styles.menuItemImage} />
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>{item.price.toLocaleString()}đ</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addToOrder(item)}>
        <MaterialIcon name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemName}>{item.name}</Text>
        <Text style={styles.orderItemPrice}>{item.price.toLocaleString()}đ</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => removeFromOrder(item.id)}>
          <MaterialIcon name="remove" size={20} color="#d9534f" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => addToOrder(item)}>
          <MaterialIcon name="add" size={20} color="#5cb85c" />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Tạo đơn hàng mới</Text>

        <View style={styles.tableSelection}>
          <Text style={styles.sectionLabel}>Chọn bàn:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tableList}>
              {tables.map((table) => (
                <TouchableOpacity
                  key={table}
                  style={[styles.tableItem, selectedTable === table && styles.selectedTable]}
                  onPress={() => setSelectedTable(table)}
                >
                  <Text style={[styles.tableText, selectedTable === table && styles.selectedTableText]}>{table}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.sectionLabel}>Thông tin khách hàng:</Text>
          <TextInput
            style={styles.customerInput}
            placeholder="Tên khách hàng"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        <View style={styles.searchBar}>
          <MaterialIcon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm món ăn..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.tabItem, selectedCategory === category.id && styles.activeTabItem]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <MaterialIcon name={category.icon} size={16} color={selectedCategory === category.id ? "#fff" : "#333"} />
              <Text style={[styles.tabText, selectedCategory === category.id && styles.activeTabText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuListContainer}>
          {limitedItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => addToOrder(item)}>
              <Image source={item.image} style={styles.menuItemImage} />
              <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>{item.price.toLocaleString()}đ</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => addToOrder(item)}>
                <MaterialIcon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          {filteredItems.length > 3 && (
            <TouchableOpacity style={styles.moreItemsButton}>
              <Text style={styles.moreItemsText}>Xem thêm {filteredItems.length - 3} món...</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.orderSection}>
          <View style={styles.orderHeader}>
            <Text style={styles.sectionLabel}>Đơn hàng ({orderItems.length} món)</Text>
            {orderItems.length > 0 && (
              <TouchableOpacity style={styles.collapseButton} onPress={() => setCartExpanded(!cartExpanded)}>
                <MaterialIcon name={cartExpanded ? "expand-less" : "expand-more"} size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {orderItems.length > 0 && cartExpanded ? (
            <View style={styles.orderListContainer}>
              <FlatList
                data={orderItems}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                style={styles.orderList}
                scrollEnabled={false}
                nestedScrollEnabled={true}
              />
            </View>
          ) : orderItems.length === 0 ? (
            <View style={styles.emptyOrder}>
              <MaterialIcon name="shopping-cart" size={24} color="#ddd" />
              <Text style={styles.emptyOrderText}>Chưa có món ăn nào được chọn</Text>
            </View>
          ) : null}

          <View style={styles.orderSummary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalAmount}>{calculateTotal().toLocaleString()}đ</Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, (!selectedTable || orderItems.length === 0) && styles.disabledButton]}
              disabled={!selectedTable || orderItems.length === 0}
            >
              <MaterialIcon name="check-circle" size={20} color="#fff" />
              <Text style={styles.confirmButtonText}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  tableSelection: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tableList: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  tableItem: {
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedTable: {
    backgroundColor: "#5c6bc0",
    borderColor: "#5c6bc0",
  },
  tableText: {
    fontWeight: "bold",
    color: "#333",
  },
  selectedTableText: {
    color: "#fff",
  },
  customerInfo: {
    marginBottom: 8,
  },
  customerInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
    height: 36,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  activeTabItem: {
    backgroundColor: "#5c6bc0",
  },
  tabText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 4,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuListContainer: {
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuItemImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  menuItemDetails: {
    flex: 1,
    marginLeft: 8,
  },
  menuItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  menuItemPrice: {
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#5c6bc0",
    borderRadius: 18,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  moreItemsButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  moreItemsText: {
    color: "#5c6bc0",
    fontSize: 12,
    fontWeight: "bold",
  },
  orderSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  collapseButton: {
    padding: 4,
  },
  orderListContainer: {
    maxHeight: 80,
  },
  orderList: {
    maxHeight: 80,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  orderItemPrice: {
    fontSize: 10,
    color: "#666",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  emptyOrder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginBottom: 8,
  },
  emptyOrderText: {
    marginTop: 4,
    color: "#999",
    textAlign: "center",
    fontSize: 12,
  },
  orderSummary: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5c6bc0",
  },
  confirmButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5c6bc0",
    borderRadius: 8,
    paddingVertical: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
})

export default Order

