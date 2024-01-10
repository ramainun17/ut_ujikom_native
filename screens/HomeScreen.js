import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card, Title, Paragraph, Text } from "react-native-paper";
import axios from "axios";

const HomeScreen = ({ route }) => {
  const { userData } = route.params;
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const apiUrl = `https://smiling-ruby-gosling.cyclic.app/api/Order/getMobile/${userData.id}`;
        const response = await axios.get(apiUrl);
        const orders = response.data.data;
        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [userData.id]);

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Data User
      </Text>
      <Card style={styles.datauser}>
        <Card.Content>
          <Text variant="titleMedium">Nama: {userData.name}</Text>
          <Text variant="titleMedium">Email: {userData.email}</Text>
        </Card.Content>
      </Card>
      <View>
        <Text variant="headlineMedium" style={styles.title}>
          Data Pemesanan
        </Text>

        <FlatList
          data={orderData}
          keyExtractor={(item) => item.id_order.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOrderPress(item)}>
              <Card style={styles.cards}>
                <Card.Content>
                  <Title>Nomor Pemesanan: {item.id_order}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />

        {/* Modal untuk menampilkan informasi detail order */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <Card style={styles.modalCard}>
              <Card.Content>
                <Title>Order ID: {selectedOrder?.id_order}</Title>
                <Paragraph>
                  Tipe Kendaraan: {selectedOrder?.tipe_kendaraan}
                </Paragraph>
                <Paragraph>Merek: {selectedOrder?.seri_kendaraan}</Paragraph>
                <Paragraph>Nomor Mesin: {selectedOrder?.nomor_mesin}</Paragraph>
                <Paragraph>
                  Nomor Polisi: {selectedOrder?.nomor_polisi}
                </Paragraph>
                <Paragraph>
                  Tanggal Reservasi: {selectedOrder?.tgl_booking}
                </Paragraph>
                <Paragraph>Teknisi: {selectedOrder?.teknisi}</Paragraph>
                <Paragraph>Status: {selectedOrder?.status}</Paragraph>

                {selectedOrder?.status === "dikonfirmasi" && (
                  <Text style={styles.warningText}>
                    Silahkan lanjutkan untuk proses pembayaran di https://...
                  </Text>
                )}
                {selectedOrder?.status === "pending" && (
                  <Text style={styles.warningText}>
                    Silahkan tunggu konfirmasi dari admin.
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonclose}>Close Modal</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "black",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Warna latar belakang semi-transparan
    padding: 20,
  },
  modalCard: {
    backgroundColor: "white", // Warna latar belakang modal
  },
  datauser: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  cards: {
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 16, // Jarak antara tombol dan informasi order
    alignItems: "center",
  },
  buttonclose: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    color: "white",
  },
  warningText: {
    color: "red",
    marginTop: 10,
  },
});

export default HomeScreen;
