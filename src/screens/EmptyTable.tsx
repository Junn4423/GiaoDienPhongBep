"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions } from "react-native"
import Layout from "../layout/_layout"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

interface TableItem {
  id: string
  name: string
  capacity: number
  status: "empty" | "occupied" | "reserved"
  occupiedSince?: string
  customer?: string
  orderCount?: number
}

const EmptyTableScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null)

  // Sample tables data
  const tablesData: TableItem[] = Array.from({ length: 20 }, (_, i) => {
    const status = i % 3 === 0 ? "empty" : i % 3 === 1 ? "occupied" : "reserved"
    return {
      id: `T${(i + 1).toString().padStart(2, "0")}`,
      name: `Bàn ${i + 1}`,
      capacity: Math.floor(Math.random() * 6) + 2,
      status,
      ...(status !== "empty" && {
        occupiedSince: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
        customer: `Khách ${i + 1}`,
        orderCount: Math.floor(Math.random() * 5) + 1,
      }),
    }
  })

  const filteredTables = tablesData.filter(
    (table) =>
      (table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || table.status === statusFilter),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "empty":
        return "#4caf50"
      case "occupied":
        return "#f44336"
      case "reserved":
        return "#ff9800"
      default:
        return "#999"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "empty":
        return "check-circle"
      case "occupied":
        return "people"
      case "reserved":
        return "event-busy"
      default:
        return "help"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "empty":
        return "Trống"
      case "occupied":
        return "Đang phục vụ"
      case "reserved":
        return "Đã đặt trước"
      default:
        return "Không xác định"
    }
  }

  const renderTableItem = ({ item }: { item: TableItem }) => (
    <TouchableOpacity
      style={[styles.tableCard, selectedTable?.id === item.id && styles.selectedTableCard]}
      onPress={() => setSelectedTable(item)}
    >
      <View style={styles.tableHeader}>
        <View style={styles.tableIdContainer}>
          <Text style={styles.tableId}>{item.id}</Text>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]}>
            {item.status === "empty" && <MaterialIcon name="check-circle" size={14} color="#fff" />}
            {item.status === "occupied" && <MaterialIcon name="people" size={14} color="#fff" />}
            {item.status === "reserved" && <MaterialIcon name="event-busy" size={14} color="#fff" />}
          </View>
        </View>
        <Text style={styles.tableName}>{item.name}</Text>
      </View>

      <View style={styles.tableInfo}>
        <View style={styles.infoRow}>
          <MaterialIcon name="people" size={14} color="#666" />
          <Text style={styles.infoText}>{item.capacity} người</Text>
        </View>

        {item.status !== "empty" && (
          <>
            <View style={styles.infoRow}>
              <MaterialIcon name="access-time" size={14} color="#666" />
              <Text style={styles.infoText}>{item.occupiedSince}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcon name="person" size={14} color="#666" />
              <Text style={styles.infoText}>{item.customer}</Text>
            </View>
            {item.status === "occupied" && (
              <View style={styles.infoRow}>
                <MaterialIcon name="receipt" size={14} color="#666" />
                <Text style={styles.infoText}>{item.orderCount} đơn</Text>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Quản lý bàn</Text>

        <View style={styles.searchBar}>
          <MaterialIcon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bàn..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabItem, statusFilter === "all" && styles.activeTabItem]}
            onPress={() => setStatusFilter("all")}
          >
            <Text style={[styles.tabText, statusFilter === "all" && styles.activeTabText]}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, statusFilter === "empty" && styles.activeTabItemGreen]}
            onPress={() => setStatusFilter("empty")}
          >
            <Text style={[styles.tabText, statusFilter === "empty" && styles.activeTabText]}>Trống</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, statusFilter === "occupied" && styles.activeTabItemRed]}
            onPress={() => setStatusFilter("occupied")}
          >
            <Text style={[styles.tabText, statusFilter === "occupied" && styles.activeTabText]}>Phục vụ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, statusFilter === "reserved" && styles.activeTabItemOrange]}
            onPress={() => setStatusFilter("reserved")}
          >
            <Text style={[styles.tabText, statusFilter === "reserved" && styles.activeTabText]}>Đặt trước</Text>
          </TouchableOpacity>
        </View>

        {selectedTable ? (
          <View style={styles.content}>
            <View style={styles.tableList}>
              <FlatList
                data={filteredTables}
                renderItem={renderTableItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.tableRow}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.tableDetails}>
              <View style={styles.tableDetailsHeader}>
                <Text style={styles.tableDetailsId}>{selectedTable.id}</Text>
                <View style={[styles.tableDetailsBadge, { backgroundColor: getStatusColor(selectedTable.status) }]}>
                  <Text style={styles.tableDetailsBadgeText}>{getStatusText(selectedTable.status)}</Text>
                </View>
              </View>

              <View style={styles.tableDetailsInfo}>
                <View style={styles.detailRow}>
                  <MaterialIcon name="people" size={20} color="#666" />
                  <Text style={styles.detailText}>Sức chứa: {selectedTable.capacity} người</Text>
                </View>

                {selectedTable.status !== "empty" && (
                  <>
                    <View style={styles.detailRow}>
                      <MaterialIcon name="access-time" size={20} color="#666" />
                      <Text style={styles.detailText}>Thời gian: {selectedTable.occupiedSince}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <MaterialIcon name="person" size={20} color="#666" />
                      <Text style={styles.detailText}>Khách hàng: {selectedTable.customer}</Text>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.actionButtons}>
                {selectedTable.status === "empty" && (
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcon name="add-shopping-cart" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Tạo đơn hàng</Text>
                  </TouchableOpacity>
                )}

                {selectedTable.status === "occupied" && (
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#f44336" }]}>
                    <MaterialIcon name="payment" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Thanh toán</Text>
                  </TouchableOpacity>
                )}

                {selectedTable.status === "reserved" && (
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcon name="check-circle" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Xác nhận đến</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.tableListFullWidth}>
            <FlatList
              data={filteredTables}
              renderItem={renderTableItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.tableRow}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </Layout>
  )
}

const { width } = Dimensions.get("window")
const cardWidth = (width - 48) / 2

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
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
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
  activeTabItemGreen: {
    backgroundColor: "#4caf50",
  },
  activeTabItemRed: {
    backgroundColor: "#f44336",
  },
  activeTabItemOrange: {
    backgroundColor: "#ff9800",
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
    flexDirection: "column",
  },
  tableList: {
    flex: 1,
    marginBottom: 16,
  },
  tableListFullWidth: {
    flex: 1,
  },
  tableRow: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tableCard: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
  },
  selectedTableCard: {
    borderColor: "#5c6bc0",
    borderWidth: 2,
  },
  tableHeader: {
    marginBottom: 8,
  },
  tableIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  tableId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tableName: {
    fontSize: 12,
    color: "#666",
  },
  tableInfo: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  tableDetails: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tableDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tableDetailsId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tableDetailsBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tableDetailsBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  tableDetailsInfo: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5c6bc0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
})

export default EmptyTableScreen

