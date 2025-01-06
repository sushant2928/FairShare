import AddMemberModal from "@/components/ui/AddMemberModal";
import Button from "@/components/ui/Button";
import SimplifiedTransactionsModal from "@/components/ui/SimplifiedTransactionsModal";
import useGroup from "@/hooks/useGroup";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const Members = () => {
  const { groupId } = useLocalSearchParams();
  const [members, setMembers] = useState([]);
  const { getGroupMembers } = useGroup();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showSimplifiedTransactionsModal, setShowSimplifiedTransactionsModal] =
    useState(false);
  const [minimizedTransactions, setMinimizedTransactions] = useState([]);
  const fetchMembers = () => {
    getGroupMembers(groupId as string).then((res) => {
      setMembers(res?.members);
      setMinimizedTransactions(res?.transactions);
    });
  };

  useEffect(() => {
    fetchMembers();
  }, [groupId]);

  const Item = ({ item }) => {
    return (
      <View className="flex flex-row items-center justify-between px-4 py-3 rounded-lg border my-2 shadow-sm bg-white">
        <Text className="text-lg font-semibold">{item?.user?.name}</Text>
        <View className="flex flex-row items-center gap-4">
          <Text className="text-gray-500">
            {`${
              item.balance > 0
                ? `gets ₹ ${item.balance}`
                : `owes ₹${item.balance * -1}`
            }`}{" "}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="p-4 flex h-full">
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={fetchMembers} refreshing={false} />
        }
        data={members || []}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View className="content-end">
        <Button
          title="Simplify Transactions"
          onPress={() => {
            setShowSimplifiedTransactionsModal(true);
          }}
        />
        <Button
          type="text"
          textColor="text-green-500"
          title="Add Member"
          onPress={() => {
            setShowAddMemberModal(true);
          }}
        />
        <AddMemberModal
          visible={showAddMemberModal}
          onClose={() => {
            setShowAddMemberModal(false);
          }}
          groupId={groupId}
        />
        <SimplifiedTransactionsModal
          visible={showSimplifiedTransactionsModal}
          data={minimizedTransactions}
          onClose={() => {
            setShowSimplifiedTransactionsModal(false);
          }}
        />
      </View>
    </View>
  );
};

export default Members;
