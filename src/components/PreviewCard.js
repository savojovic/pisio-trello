import { Card, CardActionArea, CardContent, TextareaAutosize, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';
import { apiVersion, appKey, baseURL, boardEndPoint, boardsPoint, getToken } from '../constants/Constants';


const PreviewCard = (props) => {
    const { boardId, link } = props;
    let [isEditFormOpen, setIsEditFormOpen] = useState();
    let [text, setText] = useState(props.text);

    const handleChange = (props) => {
        const newName = props.target.value;
        axios.put(baseURL + apiVersion + boardsPoint + boardId + `?token=${getToken()}&key=${appKey}&name=${newName}`)
            .then(res => {
                if (res.status == "200") {
                    setText(newName);
                    setIsEditFormOpen(false);
                }
            })
    }

    const renderPreviewCard = () => {
        return (
            <Card
                style={styles.editBtn}
                sx={{ maxWidth: 345 }}>
                <CardActionArea
                    style={{ borderRadius: 3, width: 180 }}
                    href={link}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <EditIcon style={{ margin: 5 }} onClick={() => setIsEditFormOpen(true)} />
            </Card>
        )
    }
    const renderEditList = () => {
        return (
            <TextareaAutosize

                autoFocus
                //onChange={(props) => handleChange(props)}
                onBlur={(props) => handleChange(props)}
                defaultValue={text}
                style={{
                    resize: "none",
                    width: "100%",
                    outline: "none",
                    border: "2px solid black",
                    overflow: "hidden",
                    borderRadius: 3,
                    height: 72.41,
                    backgroundColor: 'white',
                    height: 72.41,
                    width: 208,
                    borderRadius: 3
                }}
            />
        )
        //TODO: renderuj ime liste
    }
    return (
        <>
            {isEditFormOpen ? renderEditList() : renderPreviewCard()}
        </>
    )
}
const styles = {
    editBtn: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        backgroundColor: 'rgb(235, 236, 240)'
    },
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}
export default PreviewCard;