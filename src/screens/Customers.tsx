"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions } from "react-native"
import Layout from "../layout/_layout"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

interface CustomerItem {
  id: string
  name: string
  phone: string
  email: string
  visits: number
  totalSpent: number
  lastVisit: string
  avatar: string
  favorite: boolean
}

const CustomersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null)

  // Sample customers data
  const customersData: CustomerItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: `CUS-${1000 + i}`,
    name: `Khách hàng ${i + 1}`,
    phone: `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0")}`,
    email: `customer${i + 1}@example.com`,
    visits: Math.floor(Math.random() * 20) + 1,
    totalSpent: (Math.floor(Math.random() * 50) + 1) * 100000,
    lastVisit: "15/08/2023",
    avatar: "",
    favorite: i % 5 === 0,
  }))

  const filteredCustomers = customersData.filter(
    (customer) =>
      (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterType === "all" ||
        (filterType === "favorite" && customer.favorite) ||
        (filterType === "regular" && customer.visits >= 5) ||
        (filterType === "new" && customer.visits < 5)),
  )

  const renderCustomerItem = ({ item }: { item: CustomerItem }) => (
    <TouchableOpacity
      style={[styles.customerCard, selectedCustomer?.id === item.id && styles.selectedCustomerCard]}
      onPress={() => setSelectedCustomer(item)}
    >
      <View style={styles.customerHeader}>
        <View style={styles.customerAvatar}>
          <Text style={styles.customerAvatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerPhone}>{item.phone}</Text>
        </View>
        {item.favorite && <MaterialIcon name="star" size={20} color="#ffc107" style={styles.favoriteIcon} />}
      </View>

      <View style={styles.customerStats}>
        <View style={styles.customerStat}>
          <Text style={styles.customerStatLabel}>Lượt ghé</Text>
          <Text style={styles.customerStatValue}>{item.visits}</Text>
        </View>
        <View style={styles.customerStat}>
          <Text style={styles.customerStatLabel}>Tổng chi tiêu</Text>
          <Text style={styles.customerStatValue}>{item.totalSpent.toLocaleString()}đ</Text>
        </View>
        <View style={styles.customerStat}>
          <Text style={styles.customerStatLabel}>Lần cuối</Text>
          <Text style={styles.customerStatValue}>{item.lastVisit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Khách hàng</Text>

        <View style={styles.searchBar}>
          <MaterialIcon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm khách hàng..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabItem, filterType === "all" && styles.activeTabItem]}
            onPress={() => setFilterType("all")}
          >
            <Text style={[styles.tabText, filterType === "all" && styles.activeTabText]}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, filterType === "favorite" && styles.activeTabItem]}
            onPress={() => setFilterType("favorite")}
          >
            <Text style={[styles.tabText, filterType === "favorite" && styles.activeTabText]}>Yêu thích</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, filterType === "regular" && styles.activeTabItem]}
            onPress={() => setFilterType("regular")}
          >
            <Text style={[styles.tabText, filterType === "regular" && styles.activeTabText]}>Quen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, filterType === "new" && styles.activeTabItem]}
            onPress={() => setFilterType("new")}
          >
            <Text style={[styles.tabText, filterType === "new" && styles.activeTabText]}>Mới</Text>
          </TouchableOpacity>
        </View>

        {selectedCustomer ? (
          <View style={styles.content}>
            <View style={styles.customersList}>
              <FlatList
                data={filteredCustomers}
                renderItem={renderCustomerItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.customerDetails}>
              <View style={styles.customerDetailsHeader}>
                <View style={styles.customerDetailsAvatar}>
                  <Text style={styles.customerDetailsAvatarText}>{selectedCustomer.name.charAt(0)}</Text>
                </View>
                <View style={styles.customerDetailsHeaderInfo}>
                  <View style={styles.customerDetailsNameRow}>
                    <Text style={styles.customerDetailsName}>{selectedCustomer.name}</Text>
                    <TouchableOpacity style={styles.favoriteButton}>
                      <MaterialIcon
                        name={selectedCustomer.favorite ? "star" : "star-outline"}
                        size={24}
                        color={selectedCustomer.favorite ? "#ffc107" : "#999"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.customerDetailsId}>{selectedCustomer.id}</Text>
                </View>
              </View>

              <View style={styles.customerDetailsContent}>
                <View style={styles.customerDetailsSection}>
                  <Text style={styles.customerDetailsSectionTitle}>Thông tin liên hệ</Text>
                  <View style={styles.customerDetailsInfo}>
                    <View style={styles.customerDetailsInfoItem}>
                      <MaterialIcon name="phone" size={20} color="#666" />
                      <Text style={styles.customerDetailsInfoText}>{selectedCustomer.phone}</Text>
                    </View>
                    <View style={styles.customerDetailsInfoItem}>
                      <MaterialIcon name="email" size={20} color="#666" />
                      <Text style={styles.customerDetailsInfoText}>{selectedCustomer.email}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.customerDetailsSection}>
                  <Text style={styles.customerDetailsSectionTitle}>Thống kê</Text>
                  <View style={styles.customerDetailsStats}>
                    <View style={styles.customerDetailsStatsItem}>
                      <Text style={styles.customerDetailsStatsValue}>{selectedCustomer.visits}</Text>
                      <Text style={styles.customerDetailsStatsLabel}>Lượt ghé</Text>
                    </View>
                    <View style={styles.customerDetailsStatsItem}>
                      <Text style={styles.customerDetailsStatsValue}>
                        {selectedCustomer.totalSpent.toLocaleString()}đ
                      </Text>
                      <Text style={styles.customerDetailsStatsLabel}>Tổng chi tiêu</Text>
                    </View>
                    <View style={styles.customerDetailsStatsItem}>
                      <Text style={styles.customerDetailsStatsValue}>{selectedCustomer.lastVisit}</Text>
                      <Text style={styles.customerDetailsStatsLabel}>Lần cuối</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.customerDetailsSection}>
                  <Text style={styles.customerDetailsSectionTitle}>Lịch sử đơn hàng</Text>
                  <View style={styles.orderHistory}>
                    {Array.from({ length: 3 }, (_, i) => (
                      <View key={i} style={styles.orderHistoryItem}>
                        <View style={styles.orderHistoryItemHeader}>
                          <Text style={styles.orderHistoryItemId}>ORD-{1000 + i}</Text>
                          <Text style={styles.orderHistoryItemDate}>15/08/2023</Text>
                        </View>
                        <View style={styles.orderHistoryItemContent}>
                          <Text style={styles.orderHistoryItemText}>
                            {Math.floor(Math.random() * 3) + 1}x Phở Bò, {Math.floor(Math.random() * 3) + 1}x Nước Chanh
                          </Text>
                        </View>
                        <View style={styles.orderHistoryItemFooter}>
                          <Text style={styles.orderHistoryItemTotal}>
                            {(Math.floor(Math.random() * 5) + 1) * 100000}đ
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.customerDetailsActions}>
                <TouchableOpacity style={styles.customerDetailsActionButton}>
                  <MaterialIcon name="edit" size={20} color="#fff" />
                  <Text style={styles.customerDetailsActionButtonText}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.customerDetailsActionButton, styles.customerDetailsActionButtonSecondary]}
                >
                  <MaterialIcon name="receipt" size={20} color="#5c6bc0" />
                  <Text style={styles.customerDetailsActionButtonTextSecondary}>Tạo đơn hàng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.customerListFullWidth}>
            <FlatList
              data={filteredCustomers}
              renderItem={renderCustomerItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.addButton}>
              <MaterialIcon name="add" size={24} color="#fff" />
            </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  customersList: {
    flex: 1,
    marginBottom: 16,
  },
  customerListFullWidth: {
    flex: 1,
    position: "relative",
  },
  customerCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedCustomerCard: {
    borderColor: "#5c6bc0",
    borderWidth: 2,
  },
  customerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  customerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5c6bc0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  customerAvatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  customerPhone: {
    fontSize: 12,
    color: "#666",
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  customerStats: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  customerStat: {
    flex: 1,
    alignItems: "center",
  },
  customerStatLabel: {
    fontSize: 10,
    color: "#999",
    marginBottom: 2,
  },
  customerStatValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#5c6bc0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  customerDetails: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  customerDetailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  customerDetailsAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5c6bc0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  customerDetailsAvatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  customerDetailsHeaderInfo: {
    flex: 1,
  },
  customerDetailsNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  customerDetailsName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  },
  customerDetailsId: {
    fontSize: 12,
    color: "#999",
  },
  customerDetailsContent: {
    marginBottom: 16,
  },
  customerDetailsSection: {
    marginBottom: 16,
  },
  customerDetailsSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  customerDetailsInfo: {
    marginBottom: 8,
  },
  customerDetailsInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  customerDetailsInfoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  customerDetailsStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerDetailsStatsItem: {
    alignItems: "center",
    flex: 1,
  },
  customerDetailsStatsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5c6bc0",
    marginBottom: 4,
  },
  customerDetailsStatsLabel: {
    fontSize: 12,
    color: "#666",
  },
  orderHistory: {
    marginTop: 8,
  },
  orderHistoryItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  orderHistoryItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderHistoryItemId: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  orderHistoryItemDate: {
    fontSize: 12,
    color: "#666",
  },
  orderHistoryItemContent: {
    marginBottom: 8,
  },
  orderHistoryItemText: {
    fontSize: 12,
    color: "#333",
  },
  orderHistoryItemFooter: {
    alignItems: "flex-end",
  },
  orderHistoryItemTotal: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#5c6bc0",
  },
  customerDetailsActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerDetailsActionButton: {
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
  customerDetailsActionButtonSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#5c6bc0",
    flex: 1,
    marginLeft: 8,
  },
  customerDetailsActionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 12,
  },
  customerDetailsActionButtonTextSecondary: {
    color: "#5c6bc0",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 12,
  },
})

export default CustomersScreen

