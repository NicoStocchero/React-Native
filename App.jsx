import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleAddTask = () => {
    if (userInput.trim() !== "") {
      setTasks((tasks) => [
        ...tasks,
        { id: Math.random().toString(), text: userInput.trim() },
      ]);
      setUserInput("");
    } else {
      alert("Please enter a task");
    }
  };

  const deleteTask = (taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    setShowModal(false);
  };

  const handleDeleteTask = (task) => {
    setShowModal(true);
    setSelectedTask(task);
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.tasksContainer}>
      <Text style={styles.tasks}>{item.text}</Text>
      <Pressable
        onPress={() => handleDeleteTask(item)}
        accessibilityLabel="Delete task"
      >
        <Text style={styles.deleteTask}>X</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks App</Text>
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
      <View style={styles.tasksContainer}>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          style={{ width: "80%", flex: 1 }}
          contentContainerStyle={
            tasks.length === 0 ? { flexGrow: 1, justifyContent: "center" } : {}
          }
        />
        <Modal visible={showModal} animationType="slide">
          <Text style={styles.modalText}>
            Are you sure you want to delete this task?
          </Text>
          <View style={styles.modalContainer}>
            <Button
              title="Yes, delete"
              accessibilityLabel="Delete task"
              color="red"
              onPress={() => deleteTask(selectedTask.id)}
            />
            <Button
              title="Cancel"
              accessibilityLabel="Cancel"
              color="#C0C0C0"
              onPress={() => setShowModal(false)}
            />
          </View>
        </Modal>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tasksContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  tasks: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 18,
  },
  deleteTask: {
    color: "red",
    fontSize: 18,
    padding: 16,
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
