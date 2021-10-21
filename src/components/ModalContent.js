import { Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { actionsComments, apiVersion, appKey, baseURL, cardsEndpoint, getToken } from "../constants/Constants";

const ModalContent = (props) => {
    const { cardId, cards, setCards } = props;

    const [desc, setDesc] = useState();
    const [comments, setComments] = useState([]);

    const saveDescription = (props) => {
        if (props.code === 'Enter') {
            axios.put(baseURL + apiVersion + cardsEndpoint + cardId +
                `/?key=${appKey}&token=${getToken()}&desc=${props.target.value}`)
                .then(res => {
                    setDesc(props.target.value)
                })
        }
    }
    useEffect(() => {
        axios.get(baseURL + apiVersion + cardsEndpoint + cardId +
            `?key=${appKey}&token=${getToken()}`)
            .then(res => setDesc(res.data[0].desc))
        axios.get(baseURL + apiVersion + cardsEndpoint + cardId +
            `/comments?key=${appKey}&token=${getToken()}`)
            .then(res => setComments(res.data))
    }, [])

    const addComment = (props) => {
        if (props.code === 'Enter') {
            // console.log(baseURL + apiVersion + cardsEndpoint + cardId + actionsComments +
            //     `?text=${props.target.value}&token=${getToken()}&key=${appKey}`)
            axios.post(baseURL + apiVersion + cardsEndpoint + cardId + actionsComments +
                `?text=${props.target.value}&token=${getToken()}&key=${appKey}`)
                .then(res => {
                    comments.push({ username: localStorage.getItem('username'), text: props.target.value });
                    const cpy = comments;
                    setComments([]);
                    setComments(cpy);
                })
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' style={{ fontWeight: 900, marginBottom: 10 }}>
                Description
            </Typography>
            <TextField
                style={{ width: '90%' }}
                id="filled-basic"
                label="Add a more detailed description..."
                onKeyDown={saveDescription}
                variant="outlined" />
            <Card style={{
                overflow: "hidden",
                minHeight: "40px",
                width: '90%',
                height: 50,
                marginTop: 10
            }} sx={{ bgcolor: '#F0F0F0' }} >
                <Typography style={{ marginLeft: 10, marginTop: 8 }}>
                    {desc}
                </Typography>
            </Card>
            <Typography variant='h6' style={{ marginTop: 10, fontWeight: 900, marginBottom: 10 }}>
                Comments
            </Typography>
            <TextField
                style={{ width: '90%' }}
                id="outlined-basic"
                label="Write a comment"
                variant="outlined"
                onKeyDown={addComment} />
            {comments ? comments.map(comment => (
                <Card style={{
                    overflow: "hidden",
                    minHeight: "40px",
                    width: '90%',
                    marginTop: 10
                }} sx={{ bgcolor: '#F0F0F0' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography style={{ fontWeight: 800, marginLeft: 10, marginTop: 8 }}>
                            {comment.username}
                        </Typography>
                        <Typography style={{ marginLeft: 10, marginTop: 8 }}>
                            {comment.text}

                        </Typography>

                    </div>
                </Card>
            )) : ""}
        </div>
    )
}

export default ModalContent;