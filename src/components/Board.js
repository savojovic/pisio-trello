import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiVersion, appKey, baseURL, cardsEndpoint, boardsPoint, getToken, index, listPoint, listsEndPoint } from "../constants/Constants";
import TrelloList, { CardsContext } from "./TrelloList";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Loading from "./Loading";
import GenericAddButton from './GenericAddButton';
import { InviteContext } from "./SessionContext";



const Board = () => {
    let [lists, setLists] = useState(null);
    const { isBoardOpen, setIsBoardOpen } = useContext(InviteContext);

    const getListsLink =
        baseURL + apiVersion + boardsPoint + localStorage.getItem('boardId') + '/' + listsEndPoint +
        `?key=${appKey}&token=${getToken()}`;

    var [cards, setCards] = useState([]);

    const renderList = (props) => {
        var listToAdd = cards.find(card => card.listId == props.listId);
        if (!listToAdd) {
            cards.push(props);
        } else {
            listToAdd.cards = props.cards
        }
        // else if (props.cards.length == 0) {
        //     listToAdd.cards = props.cards;
        // } else if (listToAdd.cards[0].pos == 'NaN') {
        //     listToAdd.cards = props.cards
        // } else {
        //     console.log(listToAdd)
        // }
        return props.render;
    }


    const downloadLists = async () => {
        const listsLocal = (await axios.get(getListsLink)).data
        listsLocal.sort(comparator);
        setLists(listsLocal);
    }
    useEffect(() => {
        downloadLists();
    }, [])

    const reorderInTheSameList = (props) => {
        console.log(props)
        var listOnWhichDragHappened = cards.find(card => card.listId == props.destination.droppableId);

        var draggingCard = listOnWhichDragHappened.cards.splice(props.source.index, 1)[0]
        listOnWhichDragHappened.cards.splice(props.destination.index, 0, draggingCard)
        draggingCard.pos = calculateNewPos(listOnWhichDragHappened.cards[props.destination.index - 1],
            listOnWhichDragHappened.cards[props.destination.index + 1])
        listOnWhichDragHappened.cards.sort(comparator);

        axios.put(baseURL + apiVersion + cardsEndpoint + draggingCard.id +
            `?pos=${draggingCard.pos}&token=${getToken()}&key=${appKey}`);
    }
    const reorderCrossList = (props) => {
        var sourceList = cards.find(card => card.listId == props.source.droppableId);
        var destinationList = cards.find(card => card.listId == props.destination.droppableId);
        var draggingCard = sourceList.cards.splice(props.source.index, 1)[0];
        var destinationCards = destinationList.cards;
        console.log(draggingCard)
        destinationCards.splice(props.destination.index, 0, draggingCard);
        draggingCard.pos = calculateNewPos(destinationCards[props.destination.index - 1], destinationCards[props.destination.index + 1])
        destinationCards.sort(comparator);
        axios.put(baseURL + apiVersion + cardsEndpoint + draggingCard.id +
            `?idList=${destinationList.listId}&pos=${draggingCard.pos}&token=${getToken()}&key=${appKey}`);
        // console.log(destinationList)
    }
    const handleEndDrag = (props) => {
        if (props.type === "LIST") {//reordering lists
            var { source, destination } = props;

            let draggedList = lists.splice(source.index, 1)[0];
            lists.splice(destination.index, 0, draggedList);
            draggedList.pos = calculateNewPos(lists[destination.index - 1], lists[destination.index + 1]);

            axios.put(baseURL + apiVersion + listPoint + draggedList.id +
                `?token=${getToken()}&key=${appKey}&pos=${draggedList.pos}`);
        } else {//reordering cards
            if (!props.destination)
                return;
            else if (props.destination.droppableId == props.source.droppableId) { //in the same list
                reorderInTheSameList(props);
            } else {
                reorderCrossList(props);
            }
        }
    }
    const handleAddList = () => {
        var pos;
        if (lists.length == 0) {
            pos = 1000;
        } else {
            pos = calculateNewPos(lists[lists.length - 1], null);
        }
        const posQuery = pos ? `pos=${pos}` : '';

        axios.post(baseURL + apiVersion + listPoint + `?idBoard=${localStorage.getItem('boardId')}&${posQuery}&name=NewList&key=${appKey}&token=${getToken()}`)
            .then((res) => {
                let newList = res.data;
                let updatedLists = lists;
                updatedLists.push(newList);
                setLists([]);
                setLists(updatedLists);
            })
    }

    const renderLists = () => {
        return (
            <DragDropContext onDragEnd={handleEndDrag}>
                <Droppable direction="horizontal" droppableId={"dropable"} type="LIST" >
                    {
                        provided => (
                            <div style={styles.horizontal} ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    lists.map((list, index) => (
                                        <Draggable key={list.id} draggableId={String(list.id)} index={index}>
                                            {
                                                provided => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                                                        {
                                                            renderList(TrelloList(list.name, list.id, lists, setLists))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </Draggable>))
                                }
                                {provided.placeholder}
                                <div onClick={handleAddList}>
                                    <GenericAddButton isList={true} />
                                </div>
                            </div>
                        )
                    }
                </ Droppable>
            </DragDropContext >
        )
    }

    return (
        <div style={styles.horizontal}>
            {setIsBoardOpen(true)}
            {lists ? renderLists() : <Loading />}
        </div>

    )
}
const styles = {
    horizontal: {
        display: "flex",
        flexDirection: "row"
    }
}
export const calculateNewPos = (listBefore, listAfter) => {
    var pos;
    if (listBefore) {
        if (listAfter) {
            pos = (listBefore.pos + listAfter.pos) / 2;
        } else {
            pos = listBefore.pos + 1000;
        }
    } else if (listAfter) {
        pos = listAfter.pos - 5;
    } else {
        pos = 1000;
    }
    return pos;
}
export const comparator = (a, b) => {
    if (a.pos > b.pos) {
        return 1;
    } else if (a.pos < b.pos) {
        return -1;
    } else {
        return 0;
    }
}
export default Board;