"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions } from "react-native"
import Layout from "../layout/_layout"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

interface OrderItem {
  id: string
  table: string
  customer: string
  time: string
  date: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  paymentMethod: string
}

const OrderCompletedScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDate, setFilterDate] = useState("today")
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

  // Sample completed orders data
  const completedOrders: OrderItem[] = Array.from({ length: 15 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    table: `Bàn T0${(i % 10) + 1}`,
    customer: `Khách ${i + 1}`,
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
    date: "15/08/2023",
    items: [
      { name: "Phở Bò", quantity: Math.floor(Math.random() * 3) + 1, price: 75000 },
      { name: "Nước Chanh", quantity: Math.floor(Math.random() * 3) + 1, price: 25000 },
      {
        name: i % 3 === 0 ? "Bánh Flan" : "Chè Thái",
        quantity: Math.floor(Math.random() * 2) + 1,
        price: i % 3 === 0 ? 30000 : 35000,
      },
    ],
    total: Math.floor(Math.random() * 500000) + 100000,
    paymentMethod: Math.random() > 0.3 ? "Tiền mặt" : Math.random() > 0.5 ? "Thẻ" : "Momo",
  }))

  const filteredOrders = completedOrders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.table.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterDate === "all" || order.date === "15/08/2023"),
  )

  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <TouchableOpacity
      style={[styles.orderCard, selectedOrder?.id === item.id && styles.selectedOrderCard]}
      onPress={() => setSelectedOrder(item)}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <View style={styles.orderBadge}>
          <MaterialIcon name="check-circle" size={16} color="#fff" />
          <Text style={styles.orderBadgeText}>Hoàn thành</Text>
        </View>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.orderInfoItem}>
          <MaterialIcon name="table-bar" size={16} color="#666" />
          <Text style={styles.orderInfoText}>{item.table}</Text>
        </View>
        <View style={styles.orderInfoItem}>
          <MaterialIcon name="person" size={16} color="#666" />
          <Text style={styles.orderInfoText}>{item.customer}</Text>
        </View>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.orderInfoItem}>
          <MaterialIcon name="access-time" size={16} color="#666" />
          <Text style={styles.orderInfoText}>{item.time}</Text>
        </View>
        <View style={styles.orderInfoItem}>
          <MaterialIcon name="calendar-today" size={16} color="#666" />
          <Text style={styles.orderInfoText}>{item.date}</Text>
        </View>
      </View>

      <View style={styles.orderTotal}>
        <Text style={styles.orderTotalLabel}>Tổng cộng:</Text>
        <Text style={styles.orderTotalAmount}>{item.total.toLocaleString()}đ</Text>
      </View>

      <View style={styles.paymentMethod}>
        <MaterialIcon
          name={
            item.paymentMethod === "Tiền mặt" ? "payments" : item.paymentMethod === "Thẻ" ? "credit-card" : "smartphone"
          }
          size={16}
          color="#666"
        />
        <Text style={styles.paymentMethodText}>{item.paymentMethod}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Đơn hàng đã hoàn thành</Text>

        <View style={styles.searchBar}>
          <MaterialIcon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm đơn hàng..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabItem, filterDate === "today" && styles.activeTabItem]}
            onPress={() => setFilterDate("today")}
          >
            <Text style={[styles.tabText, filterDate === "today" && styles.activeTabText]}>Hôm nay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, filterDate === "week" && styles.activeTabItem]}
            onPress={() => setFilterDate("week")}
          >
            <Text style={[styles.tabText, filterDate === "week" && styles.activeTabText]}>Tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, filterDate === "month" && styles.activeTabItem]}
            onPress={() => setFilterDate("month")}
          >
            <Text style={[styles.tabText, filterDate === "month" && styles.activeTabText]}>Tháng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, filterDate === "all" && styles.activeTabItem]}
            onPress={() => setFilterDate("all")}
          >
            <Text style={[styles.tabText, filterDate === "all" && styles.activeTabText]}>Tất cả</Text>
          </TouchableOpacity>
        </View>

        {selectedOrder ? (
          <View style={styles.content}>
            <View style={styles.ordersList}>
              <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.orderDetailsHeader}>
                <Text style={styles.orderDetailsTitle}>Chi tiết đơn hàng</Text>
                <Text style={styles.orderDetailsId}>{selectedOrder.id}</Text>
              </View>

              <View style={styles.orderDetailsInfo}>
                <View style={styles.orderDetailsInfoRow}>
                  <View style={styles.orderDetailsInfoItem}>
                    <Text style={styles.orderDetailsInfoLabel}>Bàn:</Text>
                    <Text style={styles.orderDetailsInfoValue}>{selectedOrder.table}</Text>
                  </View>
                  <View style={styles.orderDetailsInfoItem}>
                    <Text style={styles.orderDetailsInfoLabel}>Khách hàng:</Text>
                    <Text style={styles.orderDetailsInfoValue}>{selectedOrder.customer}</Text>
                  </View>
                </View>

                <View style={styles.orderDetailsInfoRow}>
                  <View style={styles.orderDetailsInfoItem}>
                    <Text style={styles.orderDetailsInfoLabel}>Thời gian:</Text>
                    <Text style={styles.orderDetailsInfoValue}>{selectedOrder.time}</Text>
                  </View>
                  <View style={styles.orderDetailsInfoItem}>
                    <Text style={styles.orderDetailsInfoLabel}>Ngày:</Text>
                    <Text style={styles.orderDetailsInfoValue}>{selectedOrder.date}</Text>
                  </View>
                </View>

                <View style={styles.orderDetailsInfoRow}>
                  <View style={styles.orderDetailsInfoItem}>
                    <Text style={styles.orderDetailsInfoLabel}>Phương thức thanh toán:</Text>
                    <Text style={styles.orderDetailsInfoValue}>{selectedOrder.paymentMethod}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.orderItemsHeaderText}>Các món đã đặt</Text>

              <View style={styles.orderItemsTable}>
                <View style={styles.orderItemsTableHeader}>
                  <Text style={[styles.orderItemsTableHeaderText, { flex: 3 }]}>Món</Text>
                  <Text style={[styles.orderItemsTableHeaderText, { flex: 1, textAlign: "center" }]}>SL</Text>
                  <Text style={[styles.orderItemsTableHeaderText, { flex: 2, textAlign: "right" }]}>Đơn giá</Text>
                  <Text style={[styles.orderItemsTableHeaderText, { flex: 2, textAlign: "right" }]}>Thành tiền</Text>
                </View>

                {selectedOrder.items.map((item, index) => (
                  <View key={index} style={styles.orderItemsTableRow}>
                    <Text style={[styles.orderItemsTableCell, { flex: 3 }]}>{item.name}</Text>
                    <Text style={[styles.orderItemsTableCell, { flex: 1, textAlign: "center" }]}>{item.quantity}</Text>
                    <Text style={[styles.orderItemsTableCell, { flex: 2, textAlign: "right" }]}>
                      {item.price.toLocaleString()}đ
                    </Text>
                    <Text style={[styles.orderItemsTableCell, { flex: 2, textAlign: "right" }]}>
                      {(item.price * item.quantity).toLocaleString()}đ
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.orderDetailsSummary}>
                <View style={styles.orderDetailsSummaryRow}>
                  <Text style={styles.orderDetailsSummaryLabel}>Tổng cộng:</Text>
                  <Text style={styles.orderDetailsSummaryValue}>{selectedOrder.total.toLocaleString()}đ</Text>
                </View>
              </View>

              <View style={styles.orderDetailsActions}>
                <TouchableOpacity style={styles.orderDetailsActionButton}>
                  <MaterialIcon name="print" size={20} color="#fff" />
                  <Text style={styles.orderDetailsActionButtonText}>In hóa đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.orderDetailsActionButton, styles.orderDetailsActionButtonSecondary]}>
                  <MaterialIcon name="receipt-long" size={20} color="#5c6bc0" />
                  <Text style={styles.orderDetailsActionButtonTextSecondary}>Xuất PDF</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.orderListContainer}>
            <FlatList
              data={filteredOrders}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.ordersList}
            />
          </View>
        )}
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
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
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
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabItem: {
    backgroundColor: "#5c6bc0",
  },
  tabText: {
    fontSize: 12,
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orderListContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  ordersList: {
    paddingBottom: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedOrderCard: {
    borderColor: "#5c6bc0",
    borderWidth: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  orderBadgeText: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 2,
  },
  orderInfo: {
    flexDirection: "row",
    marginBottom: 4,
  },
  orderInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  orderInfoText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 12,
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  orderTotalLabel: {
    fontSize: 12,
    color: "#666",
  },
  orderTotalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5c6bc0",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  paymentMethodText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 12,
  },
  orderDetails: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  orderDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDetailsId: {
    fontSize: 14,
    color: "#5c6bc0",
    fontWeight: "bold",
  },
  orderDetailsInfo: {
    marginBottom: 16,
  },
  orderDetailsInfoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  orderDetailsInfoItem: {
    flex: 1,
  },
  orderDetailsInfoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  orderDetailsInfoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  orderDetailsStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderDetailsStatusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  orderItemsHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  orderItemsTable: {
    marginBottom: 16,
  },
  orderItemsTableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  orderItemsTableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  orderItemsTableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderItemsTableCell: {
    fontSize: 12,
    color: "#333",
  },
  orderDetailsSummary: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  orderDetailsSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderDetailsSummaryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderDetailsSummaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5c6bc0",
  },
  orderDetailsActions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  orderDetailsActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5c6bc0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  orderDetailsActionButtonSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#5c6bc0",
    flex: 1,
    marginLeft: 8,
  },
  orderDetailsActionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 12,
  },
  orderDetailsActionButtonTextSecondary: {
    color: "#5c6bc0",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 12,
  },
})

export default OrderCompletedScreen

