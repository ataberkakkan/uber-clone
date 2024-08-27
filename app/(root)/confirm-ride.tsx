import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import CustomButton from "@/components/CustomButton";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const router = useRouter();

  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a Driver">
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id)}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};
export default ConfirmRide;
