import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { apiVersion, appKey, baseURL, cardsEndpoint, getToken, listPoint } from "../constants/Constants";
import AddCardButton from "./AddCardButton";
import { calculateNewPos, comparator } from "./Board";
import Loading from "./Loading";
import TrelloCard from "./TrelloCard";




const TrelloList = (listNamee, listId, lists, setLists) => {
    var [cards, setCards] = useState([]);
    let [listTitle, setListTitle] = useState(listNamee);
    let [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
    var [newCardName, setNewCardName] = useState();

    useEffect(async () => {
        const getCardsLink = baseURL + apiVersion + listPoint + listId + '/' + cardsEndpoint + `?key=${appKey}&token=${getToken()}`;

        axios.get(getCardsLink)
            .then(res => {
                var cardsForThisList;
                cardsForThisList = res.data;
                cardsForThisList.sort(comparator);
                cards = cardsForThisList
                setCards(cardsForThisList);
            })
    }, [])

    useEffect(() => {
        if (newCardName) {
            var pos = calculateNewPos(cards[cards.length - 1], null);
            axios.post(baseURL + apiVersion + cardsEndpoint + `?pos=${pos}&name=${newCardName}&idList=${listId}&token=${getToken()}&key=${appKey}`)
                .then(res => {
                    var cardsCpy = cards;
                    cardsCpy.push(res.data);
                    // console.log(cardsCpy)

                    cardsCpy.sort(comparator);
                    // console.log(cardsCpy)
                    setCards([])
                    setCards(cardsCpy);
                })
        }
    }, [newCardName])
    const handleCloseTitleForm = (props) => {
        if (props.key === 'Enter') {
            const newName = props.target.value;
            setIsEditTitleOpen(false);
            setListTitle(newName)

            console.log(listId)
            lists.find(list => list.id == listId).name = newName;
            console.log(lists.find(list => list.id == listId).name)
            const cpy = lists;
            axios.put(baseURL + apiVersion + listPoint + listId + `?key=${appKey}&token=${getToken()}&name=${newName}`);
        } else if (props.type === "blur") {
            setIsEditTitleOpen(false)
        }
    }
    const editTitleForm = () => {
        return (
            <TextareaAutosize
                autoFocus
                onBlur={handleCloseTitleForm}
                onKeyPress={handleCloseTitleForm}
                defaultValue={listTitle}
                style={{
                    resize: "none",
                    width: "100%",
                    outline: "none",
                    border: "none",
                    overflow: "hidden"
                }}
            />
        )
    }
    const renderCards = () => {
        return (
            <div style={styles.container}>
                <h4 onClick={() => setIsEditTitleOpen(true)}>{isEditTitleOpen ? editTitleForm() : listTitle}</h4>
                <Droppable key={listId} droppableId={String(listId)} type="CARD" >
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={String(card.id)} index={index}>
                                        {
                                            provided => (
                                                <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps} key={card.id}>

                                                    <TrelloCard
                                                        cards={cards}
                                                        setCards={setCards}
                                                        listId={listId}
                                                        cardId={card.id}
                                                        text={card.name}
                                                        desc={card.desc} />
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
                <AddCardButton setNewCardName={setNewCardName} />
            </div>
        )
    }

    return {
        listId,
        cards,
        setCards,
        render: (
            <div>
                {cards ? renderCards() : <Loading />}

            </div>
        )
    }
}
const styles = {
    container: {
        backgroundColor: "#ebecf0",
        borderRadius: 3,
        width: 272,
        padding: 8,
        marginRight: 8
    }
}

export default TrelloList;
export const CardsContext = createContext(null);