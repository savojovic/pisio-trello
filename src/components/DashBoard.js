import { Grid, Paper } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { apiVersion, appKey, baseURL, boardEndPoint, getToken, mineBoardsEndPoint } from '../constants/Constants';
import Loading from './Loading';
import PreviewCard from './PreviewCard';
import GenericAddButton from './GenericAddButton';
import { InviteContext } from './SessionContext';
const DashBoard = () => {
    let [boards, setBoards] = useState();
    const { isBoardOpen, setIsBoardOpen } = useContext(InviteContext);

    useEffect(() => {
        const linkToBoards = `${baseURL + apiVersion + mineBoardsEndPoint}?key=${appKey}&token=${getToken()}`
        console.log(linkToBoards)
        axios.get(linkToBoards)
            .then(res => setBoards(res.data));
    }, [])


    const handleClick = () => {
        var url = baseURL + apiVersion + boardEndPoint;
        let querry = `?key=${appKey}&token=${getToken()}&name=NewBoard`;
        axios.post(url + querry)
            .then(res => {
                var boardsCopy = boards;
                console.log("boardsCopy before")
                console.log(boardsCopy)
                boardsCopy.push(res.data);
                console.log(boardsCopy)

                console.log("boardsCopy after")
                setBoards([])
                setBoards(boardsCopy)
            })
    }
    const renderBoards = () => {
        return (
            <div style={{ margin: 40 }}>
                <Grid container spacing={2} style={{ paddingLeft: 20 }}>
                    {boards.map(board => (
                        <Grid item >
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 10 }} key={board.id} onClick={() => { localStorage.setItem('boardId', board.id) }}>
                                <PreviewCard boardId={board.id} text={board.name} link='/board' />
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div onClick={handleClick}>
                    <GenericAddButton />
                </div>
            </div>
        )
    }

    return (
        <div style={{ paddingLeft: 50, paddingRight: 50 }}>
            {setIsBoardOpen(false)}
            {boards ? renderBoards() : <Loading />}
        </div>
    )
}
export default DashBoard;
    // <Grid item xs={8}>
    //     <Item>xs=8</Item>
    // </Grid>
    // <Grid item xs={4}>
    //     <Item>xs=4</Item>
    // </Grid>
    // <Grid item xs={4}>
    //     <Item>xs=4</Item>
    // </Grid>
    // <Grid item xs={8}>
    //     <Item>xs=8</Item>
    // </Grid>