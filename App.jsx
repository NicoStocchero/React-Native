import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Modal, Pressable } from "react-native";
import { useState } from "react";
import TaskInput from "./src/Components/Task/TaskInput";
import TasksList from "./src/Components/Task/TaskList";
import DeleteModal from "./src/Components/Task/DeleteModal";

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
      <TaskInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleAddTask={handleAddTask}
      />
      <TasksList tasksListDown={tasks} renderTaskItemUp={renderTaskItem} />
      <View style={styles.tasksContainer}>
        <DeleteModal
          modalVisibleDown={showModal}
          taskSelectedDown={selectedTask}
          handleDeleteTaskUp={() => deleteTask(selectedTask.id)}
          setModalVisibleUp={setShowModal}
        />
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
});
