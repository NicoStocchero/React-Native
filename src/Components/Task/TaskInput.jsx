import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";

const TaskInput = ({ userInput, setUserInput, handleAddTask }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.userInput}
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
      />
      <Pressable
        onPress={handleAddTask}
        accessibilityLabel="Add task"
        style={styles.addTask}
      >
        <Text style={{ color: "white" }}>+</Text>
      </Pressable>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 12,
    padding: 10,
    width: "80%",
    borderRadius: 16,
  },
  addTask: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 16,
    height: 40,
    width: 40,
    alignItems: "center",
  },
});
