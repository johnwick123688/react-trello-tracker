import React, {useState} from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

// ant core
import { Card, Tooltip, Button, Popconfirm, Modal, Avatar } from "antd";

// ant icons
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// components
import SingleCard from "./SingleCard";
import AddModel from "./AddModel";

//context
import { useAppContext } from "../context/AppContext";

function TrelloList({ index, listId, title, cards }) {
  const [open, setOpen] = useState(false);
  const { deleteList } = useAppContext();
  const onCloseModal = () => {
    setOpen(false)
  }
  function handleViewDetail() {
    Modal.info({
      title: "Card Detail",
      content: (
        <>
          <div>
            <h4>Title</h4>
            <div>This is title</div>
          </div>
          <br />
          <div>
            <h4>Description</h4>
            <div>This is description</div>
          </div>
          <br />
          <div>
            <h4>Member</h4>
            <div>
              <Avatar.Group>
                <Tooltip title="Tony Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
                <Tooltip title="Phuong Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
              </Avatar.Group>
            </div>
          </div>
          <br />
          <div>
            <h4>Status</h4>
            <div>New</div>
          </div>
        </>
      ),
      onOk() {},
    });
  }
  return (
    <>
      <Draggable draggableId={String(listId)} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={String(listId)} type="CARD">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Card
                    title={title}
                    className="cardList"
                    extra={
                      <>
                        <Tooltip title="Add a card">
                          <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => setOpen(true)}
                          />
                        </Tooltip>

                        <Popconfirm
                          title="Delete the list"
                          description="Are you sure to delete this list?"
                          onConfirm={() => deleteList(listId)}
                          onCancel={() => {}}
                          okText="Yes"
                          cancelText="No"
                          className="ml-10"
                        >
                          <Tooltip title="Delete this list">
                            <Button shape="circle" icon={<DeleteOutlined />} />
                          </Tooltip>
                        </Popconfirm>
                      </>
                    }
                  >
                    {cards.map((card, cardIndex) => {
                      return (
                        <SingleCard
                          key={cardIndex}
                          index={cardIndex}
                          cardItem={card}
                          listId={listId}
                        />
                      );
                    })}
                  </Card>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
       <AddModel whichId={listId} onCloseModal={onCloseModal} open={open} isEdit={false}/>
    </>
  );
}

export default TrelloList;
