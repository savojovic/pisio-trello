import { Card, CardActionArea, CardContent, TextareaAutosize, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from "react";
import ModalContent from "./ModalContent";
import { apiVersion, appKey, baseURL, cardsEndpoint, getToken } from "../constants/Constants";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const TrelloCard = (props) => {
    const { cards, setCards, listId, cardId, text, desc } = props;
    let [cardText, setCardText] = useState(text);
    let [isEditFormOpen, setIsEditFormOpen] = useState(false);
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [isPromptOpen, setIsPromptOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const deleteCard = () => {
        axios.delete(baseURL + apiVersion + cardsEndpoint + cardId + `?key=${appKey}&token=${getToken()}`)
            .then(res => {
                if (res.status == 200) {
                    cards.splice(cards.indexOf(cards.find(card => card.id == cardId)), 1)
                    var cpy = cards;
                    setCards([])
                    setCards(cpy)
                }
            })
        setIsPromptOpen(false);
    }
    const renderCard = () => {
        return (
            <div>
                <Card style={styles.editBtn} sx={{ minWidth: 275, marginTop: 1 }}>
                    <div style={{ width: 275 }} onClick={openModal}>
                        <CardContent>
                            <Typography variant="body2">
                                {cardText}
                            </Typography>
                        </CardContent>
                    </div>
                    <div style={{ marginLeft: 50 }}>
                        <EditIcon onClick={openEditForm} />
                        <DeleteIcon onClick={() => setIsPromptOpen(true)} />
                    </div>
                </Card>
            </div >
        )
    }
    const openEditForm = () => {
        setIsEditFormOpen(true);
    }
    const closeEditForm = (props) => {
        // console.log(props)
        if (props.key === 'Enter') {
            setCardText(props.target.value)
            axios.put(baseURL + apiVersion + cardsEndpoint + cardId +
                `/?key=${appKey}&token=${getToken()}&name=${props.target.value}&idList=${listId}`)
            setIsEditFormOpen(false);
        } else if (props.key === 'Escape' || props.type === 'blur') {
            setIsEditFormOpen(false)
        }
    }
    const renderEditCard = () => {
        return (
            <div >
                <Card style={{
                    overflow: "hidden",
                    padding: "6px 8px 2px",
                    minHeight: "40px",
                    minWidth: 259,
                    marginTop: 8
                }}>
                    <TextareaAutosize
                        autoFocus
                        onBlur={closeEditForm}
                        onKeyDown={closeEditForm}
                        defaultValue={cardText}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            border: "none",
                            overflow: "hidden"
                        }}
                    />
                </Card>
            </div>
        )
    }

    const renderModal = () => {
        return (
            <div>
                <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.modalStyle}>
                        <ModalContent cardId={cardId} cards={cards} setCards={setCards} desc={desc} />
                    </Box>
                </Modal>
            </div>
        )
    }
    const openPrompt = () => {
        return (
            <Dialog
                open={isPromptOpen}
                onClose={() => console.log("close")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deleting a card"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete the '${cardText}' card?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setIsPromptOpen(false) }} autoFocus>No</Button>
                    <Button onClick={deleteCard} >Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }
    return (
        <>
            {isEditFormOpen ? renderEditCard() : renderCard()}
            {isModalOpen ? renderModal() : ""}
            {isPromptOpen ? openPrompt() : ""}
            {console.log(cards)}
        </>
    )
}
const styles = {
    editBtn: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        cursor: "pointer"
    },
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        height: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}
export default TrelloCard;