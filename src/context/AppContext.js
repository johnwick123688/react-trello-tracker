import React from "react";

// mock data
import data from "../data";

export const AppContext = React.createContext();
const initialValues = {
  title: "",
  description: "",
  member: [],
  status: "",
};
export const AppProvider = ({ children }) => {
  const [trello, setTrello] = React.useState(data);
  const [formValues, setFormValues] = React.useState(initialValues);
  function onDragList(result) {
    const { source, destination } = result;
    const columns = [...trello.columns];
    const listSpliced = columns.splice(source.index, 1)[0];
    columns.splice(destination.index, 0, listSpliced);
    setTrello((prevState) => ({
      ...prevState,
      columns,
    }));
  }
  function onDragCard(result) {
    const { source, destination } = result;
    const sourceCards = [...trello.lists[source.droppableId].cards];
    const destinationCards = [...trello.lists[destination.droppableId].cards];
    const sourceCard = sourceCards.splice(source.index, 1)[0];
    if (source.droppableId === destination.droppableId) {
      sourceCards.splice(destination.index, 0, sourceCard);
      setTrello((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [source.droppableId]: {
            ...prevState.lists[source.droppableId],
            cards: sourceCards,
          },
        },
      }));
    } else {
      destinationCards.splice(destination.index, 0, sourceCard);
      setTrello((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [source.droppableId]: {
            ...prevState.lists[source.droppableId],
            cards: sourceCards,
          },
          [destination.droppableId]: {
            ...prevState.lists[destination.droppableId],
            cards: destinationCards,
          },
        },
      }));
    }
  }
  function addAndEditCard(values, whichId, isEdit) {
    const { title, description, member, status } = values;
    setFormValues({
      ...formValues,
      title,
      description,
      member,
      status,
    });
    let memberData = [];
    member.map((item, index) =>
      memberData.push({
        id: `member-${index + 1}`,
        name: item,
      })
    );
    if (isEdit) {
      setTrello((prevState) => ({
        ...prevState,
        cards: {
          ...prevState.cards,
          [whichId]: {
            ...prevState.cards[whichId],

            title,
            description,
            member: memberData,
            status,
          },
        },
      }));
    } else {
      const nextId = Object.keys(trello.cards).length + 1;
      const nextCardId = `card-${nextId}`;

      setTrello((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [whichId]: {
            ...prevState.lists[whichId],
            cards: [...prevState.lists[whichId].cards, nextCardId],
          },
        },
        cards: {
          ...prevState.cards,
          [nextCardId]: {
            id: nextCardId,
            title,
            description,
            member: memberData,
            status,
          },
        },
      }));
    }
  }
  function deleteCard(cardId, listId) {
    const deletedCardInList = [...trello.lists[listId].cards];
    deletedCardInList.splice(deletedCardInList.indexOf(cardId), 1);
    //console.log(deletedCardInList)
    delete trello.cards[cardId];
    const cards = trello.cards;
    setTrello((prevState) => ({
      ...prevState,
      lists: {
        ...prevState.lists,
        [listId]: {
          ...prevState.lists[listId],
          cards: deletedCardInList,
        },
      },
      cards,
    }));
  }
  function deleteList(listId) {
    const columns = [...trello.columns];
    columns.splice(columns.indexOf(listId), 1);
    trello.lists[listId].cards.map(
      (el) => delete trello.lists[listId].cards[el]
    );
    const cards = trello.cards;
    delete trello.lists[listId];
    const lists = trello.lists;
    setTrello((prevState) => ({
      ...prevState,
      columns,
      lists,
      cards,
    }));
  }
  function addList() {
    const nextListId = `lists-${trello.columns.length +1}`;
    const columns = [...trello.columns, nextListId];
    const lists = {
        ...trello.lists,
        [nextListId]:{
            id: [nextListId],
            title:[nextListId],
            cards:[],
        }
    }
    setTrello((prevState) => ({
        ...prevState,
        columns,
        lists
    }))
  }
  return (
    <AppContext.Provider
      value={{
        trello,
        onDragList,
        onDragCard,
        formValues,
        addAndEditCard,
        deleteCard,
        deleteList,
        addList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
