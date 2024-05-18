//MedicineManager .js

import React, { useState } from 'react';
import MedicineForm from './MedicineForm';
import MedicineList from './MedicineList';

const MedicineManager = () => {
    const [medicineItems, setMedicineItems] = useState([
        {
            id: 1,
            medicine: 'Paracetamol',
            description: 'Fever relief',
            price: 5.99,
            quantity: 100,
        },
        {
            id: 2,
            medicine: 'Dolo',
            description: 'Pain reliever',
            price: 6.99,
            quantity: 50,
        },
        {
            id: 3,
            medicine: 'Chastan Cold',
            description: 'Cold and flu medicine',
            price: 7.99,
            quantity: 10,
        },
        // Add the dummy item
        {
            id: 4,
            medicine: 'Dummy Medicine',
            description: 'This is a dummy medicine',
            price: 9.99,
            quantity: 20,
        },
    ]);

    const addMedicineHandler = (newMedicine) => {
        const updatedNewMedicine = {
            ...newMedicine,
            quantity: newMedicine.quantity || 0,
        };
        setMedicineItems((prevMedicineItems) => [
            ...prevMedicineItems,
            {
                id: prevMedicineItems.length + 1,
                ...updatedNewMedicine,
            },
        ]);

    };

    const addToCartHandler = (medicineId) => {
        setMedicineItems((prevMedicineItems) =>
            prevMedicineItems.map((medicine) =>
                medicine.id === medicineId
                    ? {
                        ...medicine,
                        quantity: Math.max((medicine.quantity) - 1, 0),
                    }
                    : medicine
            )
        );
    };


    return (
        <div>
            <MedicineForm onAddMedicine={addMedicineHandler} />
            
            <MedicineList medicineItems={medicineItems} onAddToCart={addToCartHandler} />
        </div>
    );
};

export default MedicineManager;
