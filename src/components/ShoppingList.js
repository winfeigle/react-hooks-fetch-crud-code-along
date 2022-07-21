import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/items`)
      .then(res => res.json())
      .then(items => setItems(items))
  }, []);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem])
  }

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map(item => {
      if(item.id === updatedItem.id){
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  const handleDeleteItem = (deletedItem) => {
    const updatedItems = items.filter(item => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
