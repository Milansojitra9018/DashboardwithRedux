import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addData, editData, deleteData } from './reducer';

function DetailsScreen() {
  const [showModal, setShowModal] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const submittedData = useSelector((state) => state.submittedData);

  const handleAddButtonClick = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditClick = (index) => {
    const selectedItem = submittedData[index];
    setSelectedItem(selectedItem);
    setInput1(selectedItem.name);
    setInput2(selectedItem.email);
    setShowModal(true);
  };

  const handleSubmit = () => {
    setSubmitted(true);

    if (selectedItem) {
      // Update item
      dispatch(editData(submittedData.indexOf(selectedItem), { name: input1, email: input2 }));
    } else {
      // Add new item
      dispatch(addData({ name: input1, email: input2 }));
    }
    setInput1('');
    setInput2('');
    setInput3('');
    setShowModal(false);
  };

  const handleDelete = (index) => {
    dispatch(deleteData(index));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.submittedFieldContainer}>
        <Text style={styles.submittedFieldText}>{index + 1}</Text>
        <Text style={styles.submittedFieldText}>{item.name}</Text>
        <Text style={styles.submittedFieldText}>{item.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditClick(index)}>
          <Text style={styles.buttonText1}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
          <Text style={styles.buttonText1}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Dashboard</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddButtonClick}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>{selectedItem ? 'Edit Details' : 'Add Details'}</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter Name"
            value={input1}
            onChangeText={setInput1} />
          <TextInput
            style={styles.modalInput}
            placeholder="Enter Email"
            value={input2}
            onChangeText={setInput2} />
          <TextInput
            style={styles.modalInput}
            placeholder="Enter Password"
            value={input3}
            onChangeText={setInput3}/>
          <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>{selectedItem ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {submitted && (
        <View style={styles.submittedContainer}>
          <FlatList
            data={submittedData}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
    backgroundColor: 'skyblue',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    padding: 5,
    fontSize: 40,
    color: 'black',
    paddingTop: 5,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#841584',
    width: '16%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    margin: 20,
  },
  buttonText: {
    fontSize: 40,
    alignSelf: 'center',
    color: 'white',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderColor: 'green',
    borderWidth: 3,
    width: 300,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 15,
    color: 'black',
  },
  modalSubmitButton: {
    backgroundColor: 'darkgreen',
    width: '40%',
    alignItems: 'center',
    padding: 12,
    marginVertical: 20,
    borderRadius: 15,
    borderColor: 'lightgreen',
    borderWidth: 3,
  },
  modalCloseButton: {
    backgroundColor: 'darkred',
    width: '40%',
    alignItems: 'center',
    padding: 12,
    marginVertical: 10,
    borderRadius: 15,
  },
  modalButtonText: {
    fontSize: 15,
    color: 'white',
  },
  submittedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  submittedHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  submittedFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  submittedFieldText: {
    marginRight: 10,
  },
  editButton: {
    backgroundColor: 'darkblue',
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'darkred',
    padding: 8,
    borderRadius: 10,
    width: '30%',
  },
  buttonText1: {
    color: 'white',
  },
});
export default DetailsScreen;
