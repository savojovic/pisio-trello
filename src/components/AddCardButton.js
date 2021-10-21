import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Card, TextareaAutosize } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce/lib';


const AddCardButton = (props) => {

    let [formOpen, setFormOpen] = useState(false);
    var { setNewCardName } = props;


    const closeForm = (props) => {
        if (props.code === 'Enter') {
            var value = String(props.target.value);
            setNewCardName(value);
            props.target.value = null;
            setFormOpen(false)
        } else if (props.code === 'Escape') {
            setFormOpen(false);
            setNewCardName(null);
        }
    }

    useEffect(() => {
        setNewCardName(null)
    }, [])

    const openForm = () => {
        setFormOpen(true);
    }

    const renderInputForm = () => {
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
                        placeholder="Enter a title for this card..."
                        autoFocus
                        onKeyDown={closeForm}
                        onBlur={() => setFormOpen(false)}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            border: "none",
                            overflow: "hidden"
                        }}
                    />
                </Card>
                {/* <div style={styles.btnGroupContainer}>
                    <Button
                        onMouseDown={handleAddCard}
                        variant="contained"
                        style={{ color: "white", backgroundColor: "#0079bf" }}>Add card</Button>
                    <CloseIcon style={{ marginLeft: 8, cursor: "pointer" }} />
                </div> */}
            </div>
        )
    }
    const renderAddCardButton = () => {
        return (
            <div
                style={styles.AddBtnContainer}
                onClick={openForm}
            >
                <AddIcon />
                <p>Add a card</p>
            </div>
        )
    }

    return (
        <div>
            {formOpen ? renderInputForm() : renderAddCardButton()}
        </div>
    )

}
const styles = {
    AddBtnContainer: {
        display: "flex",
        flexDiretion: "row",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10,
        marginTop: 2
    },
    btnGroupContainer: {
        display: "flex",
        flexDiretion: "row",
        alignItems: "center",
        marginTop: 8
    }
}
export default AddCardButton;
// opacity: '0.5',
// color: 'inherit',
// backgrounColor: "inherit"